import io
import json
from logging import getLogger
from pathlib import Path
from tempfile import TemporaryDirectory

from apps.monitoring.models import EventLog
from apps.monitoring.utils.logging import create_log
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from extended_dataset_profile import CURRENT_SCHEMA
from pydantic import HttpUrl
from rest_framework import parsers, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import APIException, PermissionDenied, UnsupportedMediaType
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ResourceStatus
from .serializers import MultipartFormDataUploadSerializer
from .utils.edpuploader import EdpUploader, UploadConfig

logger = getLogger(__name__)


def _create_uploader():
    if settings.ELASTICSEARCH_URL is None:
        raise APIException(detail="Missing elastic configuration")
    url_data = HttpUrl(settings.ELASTICSEARCH_URL)
    host_url = f"{url_data.scheme}://{url_data.host}"
    if url_data.path is None or url_data.path.count("/") != 1:
        raise APIException("Invalid elasticsearch url configured")
    elastic_index = url_data.path[1:]
    config = UploadConfig(
        s3_access_key_id=settings.S3_ACCESS_KEY_ID,
        s3_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
        s3_bucket_name=settings.S3_BUCKET_NAME,
        elastic_url=host_url,
        elastic_apikey=settings.ELASTICSEARCH_API_KEY,
        elastic_index=elastic_index,
    )

    return EdpUploader(config)


def _do_upload(request: Request, id: str, zip_file):
    uploader = _create_uploader()
    with TemporaryDirectory() as temp_dir:
        edp_dir = Path(temp_dir)
        edp_model = uploader.extract_edp_zip(edp_dir, zip_file)
        edp_dataspace = edp_model.assetRefs[0].dataSpace.name
        if not request.user.is_superuser and (
            request.user.dataspace is None or request.user.dataspace.name != edp_dataspace
        ):
            raise PermissionDenied(f"User not allowed to upload to dataspace {edp_dataspace}")
        uploader.upload_edp_directory(edp_model, edp_id=id, edp_dir=edp_dir)
    create_log(request, "EDP upload done", EventLog.STATUS_SUCCESS, {"id": id}, EventLog.TYPE_UPLOAD)
    return Response(
        {"message": "EDP uploaded successfully", "edp": edp_model.model_dump(mode="json"), "id": id},
        status=status.HTTP_200_OK,
    )


class RawZipParser(parsers.BaseParser):
    media_type = "application/zip"

    def parse(self, stream, media_type=None, parser_context=None):
        if media_type != self.media_type:
            raise UnsupportedMediaType(media_type)
        return stream.read()


class RawZipUploadView(APIView):
    parser_classes = [RawZipParser]

    @extend_schema(
        request={
            "application/zip": OpenApiTypes.BINARY,
        },
        responses={
            200: {
                "type": "object",
                "properties": {
                    "message": {"type": "string"},
                    "files": {"type": "array", "items": {"type": "string"}},
                },
            },
            400: {"type": "object", "properties": {"error": {"type": "string"}}},
            500: {"type": "object", "properties": {"error": {"type": "string"}}},
        },
        summary="Upload a raw zip file.",
        operation_id="raw_zip_upload",
    )
    def put(self, request: Request, id: str, file_name: str):
        if not request.user.is_connector_user:
            create_log(
                request,
                "Resource ID raw upload failed: Permission denied",
                EventLog.STATUS_FAIL,
                {"id": id},
                EventLog.TYPE_UPLOAD,
            )
            return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        resource = get_object_or_404(ResourceStatus, pk=id)
        try:
            file_io = io.BytesIO(request.data)
            result = _do_upload(request, id, file_io)
            resource.status = "uploaded"
            resource.save()
            return result
        except APIException as e:
            create_log(request, f"EDP upload failed: {e}", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_UPLOAD)
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(request, f"EDP upload failed: {message}", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_UPLOAD)
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(summary="create EDP resource", request=None, responses={201: OpenApiTypes.OBJECT})
@api_view(["POST"])
def create_resource_id(request: Request):
    if not request.user.is_connector_user:
        create_log(request, "Resource ID create failed: Permission denied", EventLog.STATUS_FAIL, EventLog.TYPE_UPLOAD)
        return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    try:
        resource = ResourceStatus.objects.create()
        create_log(
            request, "EDP resource created", EventLog.STATUS_SUCCESS, {"id": str(resource.id)}, EventLog.TYPE_UPLOAD
        )
        return Response({"id": resource.id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        message = f"An unknown error occurred ({type(e)}): {str(e)}"
        create_log(request, f"EDP resource create failed: {message}", EventLog.STATUS_FAIL, EventLog.TYPE_UPLOAD)
        raise APIException(message)


class EDPUploadDeleteView(APIView):
    parser_classes = [MultiPartParser]
    serializer_classes = [MultipartFormDataUploadSerializer]

    @extend_schema(
        summary="Upload an EDP by resource id",
        request={"multipart/form-data": MultipartFormDataUploadSerializer},
        parameters=[
            OpenApiParameter("id", location=OpenApiParameter.PATH, type=OpenApiTypes.UUID, description="Resource ID")
        ],
        responses={200: OpenApiTypes.OBJECT},
    )
    def put(self, request: Request, id: str):
        if not request.user.is_connector_user:
            create_log(
                request, "EDP upload failed: Permission denied", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_UPLOAD
            )
            return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        resource = get_object_or_404(ResourceStatus, pk=id)
        try:
            serializer = MultipartFormDataUploadSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            zip_file = serializer.validated_data.get("file")
            logger.info(f"Received {zip_file.name}")

            result = _do_upload(request, id, zip_file)
            resource.status = "uploaded"
            resource.save()
            return result
        except APIException as e:
            create_log(request, f"EDP upload failed: {e}", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_UPLOAD)
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(request, f"EDP upload failed: {message}", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_UPLOAD)
            raise APIException(message)

    @extend_schema(
        summary="Delete an EDP by resource id",
        request=None,
        parameters=[
            OpenApiParameter("id", location=OpenApiParameter.PATH, type=OpenApiTypes.UUID, description="Resource ID")
        ],
        responses={200: OpenApiTypes.OBJECT},
    )
    def delete(self, request: Request, id: str):
        if not request.user.is_connector_user:
            create_log(
                request, "EDP delete failed: Permission denied", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_DELETE
            )
            return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        resource = get_object_or_404(ResourceStatus, pk=id)

        try:
            uploader = _create_uploader()
            uploader.delete_edp(id)

            resource.delete()
            create_log(request, "EDP delete done", EventLog.STATUS_SUCCESS, {"id": id}, EventLog.TYPE_DELETE)

            return Response(
                {"message": "EDP deleted successfully", "id": id},
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType, APIException) as e:
            create_log(request, f"EDP delete failed: {e}", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_DELETE)
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(request, f"EDP delete failed: {message}", EventLog.STATUS_FAIL, {"id": id}, EventLog.TYPE_DELETE)
            raise APIException(message)


@extend_schema(
    summary="Download the current JSON schema of an EDP",
    methods=["GET"],
    request=None,
    responses={status.HTTP_200_OK: OpenApiTypes.OBJECT},
)
@api_view(["GET"])
@permission_classes([AllowAny])
@authentication_classes([])
def get_schema(request: Request):
    schema = CURRENT_SCHEMA.model_json_schema()
    schema_json = json.dumps(schema, indent=4)

    response = HttpResponse(schema_json, content_type="application/json")
    response["Content-Disposition"] = 'attachment; filename="schema.json"'

    return response
