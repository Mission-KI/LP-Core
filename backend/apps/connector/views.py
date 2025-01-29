import json
import zipfile
from logging import getLogger

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
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
            raise ValidationError({"detail": "Only ZIP files are accepted."})

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
                    json_content = json.load(json_file)

                return Response(
                    {
                        "message": "JSON file processed successfully",
                        "json_content": json_content,
                    },
                    status=status.HTTP_200_OK,
                )

        except zipfile.BadZipFile:
            raise ValidationError({"detail": "Uploaded file is not a valid ZIP archive."})
        except Exception as e:
            return Response(
                {"detail": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
