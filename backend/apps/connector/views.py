import typing
from logging import getLogger
from uuid import uuid4

from apps.monitoring.models import EventLog
from apps.monitoring.utils import create_log
from common.edpuploader import EdpUploader, UploadConfig
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
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

logger = getLogger(__name__)


_FILE_PARAM = openapi.Parameter(
    name="file",
    in_=openapi.IN_FORM,
    description="ZIP file containing an EDP with it's json file + images.",
    type=openapi.TYPE_FILE,
    required=True,
)


class EDPViewSet(ViewSet):
    parser_classes = [MultiPartParser]

    @swagger_auto_schema(operation_summary="upload an EDP zip file", manual_parameters=[_FILE_PARAM])
    def create(self, request: Request):
        try:
            edp, edp_id = self._edp_from_request(request)
            create_log(request.get_full_path(), "EDP upload done", EventLog.STATUS_SUCCESS)
            return Response(
                {
                    "message": "EDP uploaded successfully",
                    "edp": edp.model_dump(mode="json"),
                    "id": edp_id,
                },
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType, APIException) as e:
            create_log(request.get_full_path(), f"EDP upload failed: {e}", EventLog.STATUS_FAIL)
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(request.get_full_path(), f"EDP upload failed: {message}", EventLog.STATUS_FAIL)
            raise APIException(message)

    @swagger_auto_schema(operation_summary="update an EDP zip file", manual_parameters=[_FILE_PARAM])
    def update(self, request: Request, id: int | None):
        try:
            # TODO(KB) check if `id` exists, see: https://ai-bites.atlassian.net/browse/DSE-710
            edp, edp_id = self._edp_from_request(request)
            create_log(request.get_full_path(), "EDP update done", EventLog.STATUS_SUCCESS)
            return Response(
                {
                    "message": f"EDP {id} updated successfully",
                    "edp": edp.model_dump(mode="json"),
                    "id": edp_id,
                },
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType, APIException) as e:
            create_log(request.get_full_path(), f"EDP update failed: {e}", EventLog.STATUS_FAIL)
            raise e
        except Exception as e:
            message = f"An unknown error occurred ({type(e)}): {str(e)}"
            create_log(request.get_full_path(), f"EDP update failed: {message}", EventLog.STATUS_FAIL)
            raise APIException(message)

    @swagger_auto_schema(operation_summary="delete an EDP zip file")
    def delete(self, request: Request, id: int | None):
        create_log(request.get_full_path(), "EDP delete done", EventLog.STATUS_SUCCESS)
        return Response(
            {"message": f"EDP {id} deleted successfully"},
            status=status.HTTP_200_OK,
        )

    def _edp_from_request(self, request: Request):
        zip_file = self._file_from_request(request)
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

        uploader = EdpUploader(config)
        edp_id = str(uuid4())
        return uploader.upload_edp_zip(zip_file, edp_id=edp_id), edp_id

    def _file_from_request(self, request: Request) -> InMemoryUploadedFile:
        files = typing.cast(MultiValueDict, request.FILES)
        if "file" not in files:
            raise DRFValidationError("No file uploaded.")

        input_file = files["file"]

        logger.info(f"Received {input_file.name}")

        if not input_file.name.endswith(".zip"):
            raise DRFValidationError("Only ZIP files are accepted.")

        return input_file
