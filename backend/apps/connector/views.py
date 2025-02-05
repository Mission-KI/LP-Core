import typing
from logging import getLogger
from zipfile import BadZipFile, ZipFile

from django.utils.datastructures import MultiValueDict
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from extended_dataset_profile import schema_versions
from pydantic import ValidationError as PydanticValidationError
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
            json_file_bytes = self._edp_bytes_from_request(request)
            edp = self._try_to_apply_edp_schema(json_file_bytes)
            # TODO(KB) return generated id
            return Response(
                {
                    "message": "JSON file processed successfully",
                    "json_content": edp.model_dump(mode="json"),
                },
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType):
            raise
        except Exception as e:
            raise APIException(f"An unknown error occurred ({type(e)}): {str(e)}")

    @swagger_auto_schema(operation_summary="update an EDP zip file", manual_parameters=[_FILE_PARAM])
    def update(self, request: Request, id: int | None):
        try:
            # TODO(KB) check if `id` exists, see: https://ai-bites.atlassian.net/browse/DSE-710
            json_file_bytes = self._edp_bytes_from_request(request)
            edp = self._try_to_apply_edp_schema(json_file_bytes)
            return Response(
                {
                    "message": f"EDP {id} updated successfully",
                    "json_content": edp.model_dump(mode="json"),
                },
                status=status.HTTP_200_OK,
            )
        except (DRFValidationError, UnsupportedMediaType):
            raise
        except Exception as e:
            raise APIException(f"An unknown error occurred: {str(e)}")

    @swagger_auto_schema(operation_summary="delete an EDP zip file")
    def delete(self, request: Request, id: int | None):
        return Response(
            {"message": f"EDP {id} deleted successfully"},
            status=status.HTTP_200_OK,
        )

    def _edp_bytes_from_request(self, request: Request):
        try:
            with self._zip_file_from_request(request) as zip_file:
                json_file_bytes = self._edp_from_request(zip_file)
            return json_file_bytes
        except BadZipFile:
            raise DRFValidationError({"detail": "Uploaded file is not a valid ZIP archive."})

    def _edp_from_request(self, zip_file: ZipFile):
        json_files = [file_name for file_name in zip_file.namelist() if file_name.endswith(".json")]

        if len(json_files) == 0:
            raise DRFValidationError({"detail": "No JSON file found in the ZIP archive."})

        if len(json_files) > 1:
            raise DRFValidationError({"detail": "Multiple JSON files found in the ZIP archive. Expected one."})

        json_filename = json_files[0]
        logger.info(f"found JSON file {json_filename}")

        with zip_file.open(json_filename) as json_file:
            return json_file.read()

    def _try_to_apply_edp_schema(self, json_file_bytes: bytes):
        for schema in schema_versions.values():
            try:
                return schema.model_validate_json(json_file_bytes)
            except PydanticValidationError as e:
                raise DRFValidationError({"detail": str(e)})

        raise DRFValidationError(
            "JSON not matching any known EDP JSON schema. Supported versions:"
            f" {', '.join([v.value for v in schema_versions.keys()])}"
        )

    def _zip_file_from_request(self, request: Request):
        files = typing.cast(MultiValueDict, request.FILES)
        if "file" not in files:
            raise DRFValidationError({"detail": "No file uploaded."})

        input_file = files["file"]

        logger.info(f"Received {input_file.name}")

        if not input_file.name.endswith(".zip"):
            raise DRFValidationError({"detail": "Only ZIP files are accepted."})

        return ZipFile(input_file, "r")
