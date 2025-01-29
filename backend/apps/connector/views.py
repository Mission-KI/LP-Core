import zipfile
from logging import getLogger

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from extended_dataset_profile import schema_versions
from pydantic import ValidationError as PydanticValidationError
from rest_framework import status
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

logger = getLogger(__name__)


class EDPView(APIView):
    parser_classes = [MultiPartParser]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                name="file",
                in_=openapi.IN_FORM,
                description="Upload a ZIP file containing an EDP with it's json file + images.",
                type=openapi.TYPE_FILE,
                required=True,
            )
        ],
        responses={
            200: openapi.Response(description="JSON file processed successfully"),
            400: openapi.Response(description="Invalid input or file type"),
            500: openapi.Response(description="Server error"),
        },
    )
    def post(self, request, *args, **kwargs):
        if "file" not in request.FILES:
            return Response({"detail": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES["file"]

        logger.info(f"Received {file.name}")

        if not file.name.endswith(".zip"):
            raise DRFValidationError({"detail": "Only ZIP files are accepted."})

        try:
            with zipfile.ZipFile(file, "r") as z:
                json_filename = None
                for file_name in z.namelist():
                    if file_name.endswith(".json"):
                        json_filename = file_name
                        break

                if not json_filename:
                    return Response(
                        {"detail": "No JSON file found in the ZIP archive."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                logger.info(f"found JSON file {json_filename}")

                with z.open(json_filename) as json_file:
                    for schema in schema_versions.values():
                        try:
                            json_content = schema.model_validate_json(json_file.read())
                            return Response(
                                {
                                    "message": "JSON file processed successfully",
                                    "json_content": json_content.model_dump(),
                                },
                                status=status.HTTP_200_OK,
                            )
                        except PydanticValidationError as e:
                            raise DRFValidationError({"detail": str(e)})
                return DRFValidationError(
                    {
                        "detail": "JSON not matching any known EDP JSON schema. Supported versions:"
                        f" {', '.join([v.value for v in schema_versions.keys()])}"
                    },
                )

        except zipfile.BadZipFile:
            raise DRFValidationError({"detail": "Uploaded file is not a valid ZIP archive."})
        except DRFValidationError as e:
            raise e
        except Exception as e:
            return Response(
                {"detail": f"An unknown error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
