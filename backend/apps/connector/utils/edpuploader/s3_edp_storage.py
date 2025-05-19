from logging import getLogger
from pathlib import Path

import boto3
from boto3.exceptions import Boto3Error
from botocore.exceptions import ClientError
from django.conf import settings
from pydantic import HttpUrl
from rest_framework.exceptions import APIException

from .config import S3Config

logger = getLogger(__name__)


class S3EDPStorage:
    @staticmethod
    def create_config():
        if not settings.S3_BUCKET_NAME:
            raise APIException(detail="Missing S3 configuration")
        return S3Config(
            s3_access_key_id=settings.S3_ACCESS_KEY_ID,
            s3_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
            s3_bucket_name=settings.S3_BUCKET_NAME,
            s3_endpoint_url=settings.S3_ENDPOINT_URL,
        )

    def __init__(self, config: S3Config):
        self._client = boto3.resource(
            "s3",
            aws_access_key_id=config.s3_access_key_id,
            aws_secret_access_key=config.s3_secret_access_key,
            endpoint_url=config.s3_endpoint_url,
        )
        self._bucket = self._client.Bucket(config.s3_bucket_name)

    def upload(self, edp_dir: Path, edp_id: str):
        logger.info("%s: Uploading resource files to S3...", edp_id)
        for resource_file in edp_dir.rglob("*"):
            if not resource_file.is_file():
                continue
            resource_file_relative = resource_file.relative_to(edp_dir)
            upload_key = f"{edp_id}/{resource_file_relative}"
            try:
                response = self._bucket.upload_file(str(resource_file), upload_key)
                logger.info(f"S3 upload response: {response}")
            except (ClientError, Boto3Error) as e:
                logger.error(e)
                raise APIException(f"Unable to upload edp {edp_id} to S3: {e}")
            full_download_url = HttpUrl(f"https://{self._bucket.name}.s3.amazonaws.com/{upload_key}")
            logger.info("Uploaded '%s' to S3: %s", resource_file_relative, full_download_url)

    def delete(self, edp_id: str):
        logger.info("Deleting EDP %s resource files from S3...", edp_id)

        try:
            result = self._bucket.objects.filter(Prefix=f"{edp_id}/").delete()
            if isinstance(result, list) and len(result) == 1 and "Deleted" in result[0]:
                num_deleted = len(result[0]["Deleted"])
                full_download_url = HttpUrl(f"https://{self._bucket.name}.s3.amazonaws.com/{edp_id}")
                logger.info("Deleted '%s' from S3: %s (num items: %d)", edp_id, full_download_url, num_deleted)
            else:
                logger.warning("Got unexpected response from S3 storage %s", result)
        except (ClientError, Boto3Error) as e:
            logger.error(e)
            raise APIException(f"Unable to delete edp {edp_id} from S3: {e}")
