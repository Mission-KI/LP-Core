import io
from logging import getLogger
from pathlib import Path
from tempfile import TemporaryDirectory

from apps.monitoring.models import EventLog
from apps.monitoring.utils.logging import create_log
from django.conf import settings
from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from extended_dataset_profile import CURRENT_SCHEMA
from pydantic import HttpUrl
from rest_framework import parsers, status, views
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException, PermissionDenied, UnsupportedMediaType
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

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
        if not request.user.is_superuser and request.user.dataspace.name != edp_dataspace:
            raise PermissionDenied(f"User not allowed to upload to dataspace {edp_dataspace}")
        uploader.upload_edp_directory(edp_model, edp_id=id, edp_dir=edp_dir)
    create_log(request.get_full_path(), "EDP upload done", EventLog.STATUS_SUCCESS, metadata={"id": id})
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


class RawZipUploadView(views.APIView):
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
    )
    def put(self, request: Request, id: str, file_name: str):
        if not request.user.is_connector_user:
            create_log(
                request.get_full_path(), "Resource ID raw upload failed: Permission denied", EventLog.STATUS_FAIL
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
            create_log(
                request.get_full_path(),
                f"EDP upload failed: {e}",
                EventLog.STATUS_FAIL,
                metadata={"id": id},
            )
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(
                request.get_full_path(), f"EDP upload failed: {message}", EventLog.STATUS_FAIL, metadata={"id": id}
            )
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EDPViewSet(ViewSet):
    parser_classes = [MultiPartParser, FormParser]

    @extend_schema(summary="create EDP resource")
    def create(self, request: Request):
        if not request.user.is_connector_user:
            create_log(request.get_full_path(), "Resource ID create failed: Permission denied", EventLog.STATUS_FAIL)
            return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        try:
            resource = ResourceStatus.objects.create()
            create_log(
                request.get_full_path(),
                "EDP resource created",
                EventLog.STATUS_SUCCESS,
                metadata={"id": str(resource.id)},
            )
            return Response({"id": resource.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(
                request.get_full_path(),
                f"EDP resource create failed: {message}",
                EventLog.STATUS_FAIL,
            )
            raise APIException(message)

    @extend_schema(
        summary="upload a EDP ZIP file",
        request=MultipartFormDataUploadSerializer,
        parameters=[
            OpenApiParameter(
                "id",
                location=OpenApiParameter.PATH,
                type=OpenApiTypes.UUID,
                description="Resource ID",
            )
        ],
        responses={200: OpenApiTypes.OBJECT},
    )
    def upload(self, request: Request, id: str):
        if not request.user.is_connector_user:
            create_log(
                request.get_full_path(),
                "EDP upload failed: Permission denied",
                EventLog.STATUS_FAIL,
                metadata={"id": id},
            )
            return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        resource = get_object_or_404(ResourceStatus, pk=id)
        try:
            zip_file = self._file_from_request(request)
            result = _do_upload(request, id, zip_file)
            resource.status = "uploaded"
            resource.save()
            return result
        except APIException as e:
            create_log(
                request.get_full_path(),
                f"EDP upload failed: {e}",
                EventLog.STATUS_FAIL,
                metadata={"id": id},
            )
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(
                request.get_full_path(),
                f"EDP upload failed: {message}",
                EventLog.STATUS_FAIL,
                metadata={"id": id},
            )
            raise APIException(message)

    @extend_schema(
        summary="delete an EDP by resource id",
        parameters=[
            OpenApiParameter(
                "id",
                location=OpenApiParameter.PATH,
                type=OpenApiTypes.UUID,
                description="Resource ID",
            )
        ],
    )
    def delete(self, request: Request, id: str):
        if not request.user.is_connector_user:
            create_log(
                request.get_full_path(),
                "EDP delete failed: Permission denied",
                EventLog.STATUS_FAIL,
                metadata={"id": id},
            )
            return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        resource = get_object_or_404(ResourceStatus, pk=id)

        try:
            uploader = _create_uploader()
            uploader.delete_edp(id)

            resource.delete()
            create_log(
                request.get_full_path(),
                "EDP delete done",
                EventLog.STATUS_SUCCESS,
                metadata={"id": id},
            )

            return Response(
                {"message": "EDP deleted successfully", "id": id},
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType, APIException) as e:
            create_log(
                request.get_full_path(),
                f"EDP delete failed: {e}",
                EventLog.STATUS_FAIL,
                metadata={"id": id},
            )
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(
                request.get_full_path(),
                f"EDP delete failed: {message}",
                EventLog.STATUS_FAIL,
                metadata={"id": id},
            )
            raise APIException(message)

    def _file_from_request(self, request: Request):
        serializer = MultipartFormDataUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        input_file = serializer.validated_data.get("file")

        logger.info(f"Received {input_file.name}")

        return input_file


@extend_schema(methods=["GET"], summary="get the current JSON schema of an EDP")
@api_view(["GET"])
def get_schema(request: Request):
    if not request.user.is_connector_user:
        create_log(request.get_full_path(), "EDP schema failed: Permission denied", EventLog.STATUS_FAIL)
        return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    schema = CURRENT_SCHEMA.model_json_schema()
    return Response(schema, status=status.HTTP_200_OK)
