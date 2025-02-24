from logging import getLogger
from pathlib import Path

import boto3
from boto3.exceptions import Boto3Error, S3UploadFailedError
from pydantic import HttpUrl
from rest_framework.exceptions import APIException

from .config import S3Config

logger = getLogger(__name__)


class S3EDPStorage:
    def __init__(self, config: S3Config):
        self._client = boto3.resource(
            "s3",
            aws_access_key_id=config.s3_access_key_id,
            aws_secret_access_key=config.s3_secret_access_key,
        )
        self._bucket = self._client.Bucket(config.s3_bucket_name)

    def upload(self, resource_files: list[Path], edp_dir: Path, edp_id: str):
        if len(resource_files) == 0:
            return

        logger.info("Uploading %d resource files to S3...", len(resource_files))

        for resource_file in resource_files:
            resource_file_relative = resource_file.relative_to(edp_dir)
            upload_key = f"{edp_id}/{resource_file_relative}"
            try:
                self._bucket.upload_file(resource_file, upload_key)
            except S3UploadFailedError as e:
                logger.error(e)
                raise APIException(f"Unable to upload edp {edp_id} to S3: {e}")
            full_download_url = HttpUrl(f"https://{self._bucket.name}.s3.amazonaws.com/{upload_key}")
            logger.info("Uploaded '%s' to S3: %s", resource_file_relative, full_download_url)

    def delete(self, edp_id: str):
        logger.info("Deleting EDP %s resource files from S3...", edp_id)

        try:
            self._bucket.objects.filter(Prefix=f"{edp_id}/").delete()
        except Boto3Error as e:
            logger.error(e)
            raise APIException(f"Unable to delete edp {edp_id} to S3: {e}")
        # except ClientError:
        full_download_url = HttpUrl(f"https://{self._bucket.name}.s3.amazonaws.com/{edp_id}")
        logger.info("Deleted '%s' from S3: %s", edp_id, full_download_url)
