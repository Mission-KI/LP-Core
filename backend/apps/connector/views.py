import typing
from logging import getLogger

from apps.monitoring.models import EventLog
from apps.monitoring.utils import create_log
from common.edpuploader import EdpUploader, UploadConfig
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils.datastructures import MultiValueDict
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from pydantic import HttpUrl
from rest_framework import status
from rest_framework.exceptions import APIException, UnsupportedMediaType
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.parsers import MultiPartParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import ResourceStatus

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


class EDPViewSet(ViewSet):
    parser_classes = [MultiPartParser]

    @swagger_auto_schema(operation_summary="create EDP resource")
    def create(self, request: Request):
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
            create_log(request.get_full_path(), f"EDP resource create failed: {message}", EventLog.STATUS_FAIL)
            raise APIException(message)

    @swagger_auto_schema(
        operation_summary="upload a EDP ZIP file",
        manual_parameters=[
            openapi.Parameter(
                "id",
                openapi.IN_PATH,
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_UUID,
                description="Resource ID",
            ),
            openapi.Parameter(
                name="file",
                in_=openapi.IN_FORM,
                description="ZIP file containing an EDP with it's json file + images.",
                type=openapi.TYPE_FILE,
                required=True,
            ),
        ],
    )
    def upload(self, request: Request, id: str):
        resource = get_object_or_404(ResourceStatus, pk=id)
        try:
            zip_file = self._file_from_request(request)
            uploader = _create_uploader()
            edp = uploader.upload_edp_zip(zip_file, edp_id=id)
            resource.status = "uploaded"
            resource.save()
            create_log(request.get_full_path(), f"EDP {id} upload done", EventLog.STATUS_SUCCESS, metadata={"id": id})
            return Response(
                {
                    "message": "EDP uploaded successfully",
                    "edp": edp.model_dump(mode="json"),
                    "id": id,
                },
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType, APIException) as e:
            create_log(request.get_full_path(), f"EDP upload failed: {e}", EventLog.STATUS_FAIL, metadata={"id": id})
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(
                request.get_full_path(), f"EDP upload failed: {message}", EventLog.STATUS_FAIL, metadata={"id": id}
            )
            raise APIException(message)

    @swagger_auto_schema(
        operation_summary="delete an EDP by resource id",
        manual_parameters=[
            openapi.Parameter(
                "id",
                openapi.IN_PATH,
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_UUID,
                description="Resource ID",
            )
        ],
    )
    def delete(self, request: Request, id: str):
        resource = get_object_or_404(ResourceStatus, pk=id)

        try:
            uploader = _create_uploader()
            uploader.delete_edp(id)

            resource.delete()
            create_log(request.get_full_path(), "EDP delete done", EventLog.STATUS_SUCCESS, metadata={"id": id})

            return Response(
                {"message": "EDP deleted successfully", "id": id},
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType, APIException) as e:
            create_log(request.get_full_path(), f"EDP delete failed: {e}", EventLog.STATUS_FAIL, metadata={"id": id})
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(
                request.get_full_path(), f"EDP delete failed: {message}", EventLog.STATUS_FAIL, metadata={"id": id}
            )
            raise APIException(message)

    def _file_from_request(self, request: Request):
        files = typing.cast(MultiValueDict, request.FILES)
        if "file" not in files:
            raise DRFValidationError("No file uploaded.")

        input_file = files["file"]

        logger.info(f"Received {input_file.name}")

        if not input_file.name.endswith(".zip"):
            raise DRFValidationError("Only ZIP files are accepted.")

        return input_file
