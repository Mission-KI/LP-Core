import json
from logging import getLogger
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import IO, Any
from zipfile import BadZipFile, ZipFile

import boto3
from elasticsearch import AuthenticationException, Elasticsearch
from extended_dataset_profile import SchemaVersion, schema_versions
from pydantic import HttpUrl
from pydantic import ValidationError as PydanticValidationError
from pydantic.dataclasses import dataclass
from rest_framework.exceptions import APIException
from rest_framework.exceptions import ValidationError as DRFValidationError

logger = getLogger(__name__)


@dataclass(frozen=True)
class UploadConfig:
    s3_access_key_id: str
    s3_secret_access_key: str
    s3_bucket_name: str
    elastic_url: str
    elastic_index: str
    elastic_apikey: str
    elastic_timeout: float = 10


class EdpUploader:
    def __init__(self, config: UploadConfig):
        self._config = config

        self._elastic_client = Elasticsearch(
            hosts=config.elastic_url,
            api_key=config.elastic_apikey,
            request_timeout=config.elastic_timeout,
        )

        self._s3 = boto3.resource(
            "s3",
            aws_access_key_id=config.s3_access_key_id,
            aws_secret_access_key=config.s3_secret_access_key,
        )
        self._s3_bucket = self._s3.Bucket(config.s3_bucket_name)

    def upload_edp_zip(self, edp_zip: Path | IO[Any], edp_id: str):
        try:
            with (
                ZipFile(edp_zip, "r") as zip_file,
                TemporaryDirectory() as temp_dir,
            ):
                temp_path = Path(temp_dir)
                logger.info("Unzipping '%s'...", edp_zip)
                zip_file.extractall(temp_path)
                return self.upload_edp_directory(temp_path, edp_id)
        except BadZipFile:
            raise DRFValidationError("Uploaded file is not a valid ZIP archive.")

    def upload_edp_directory(self, edp_dir: Path, edp_id: str):
        logger.info("Uploading EDP directory '%s'...", edp_dir)
        # Find EDP JSON file and additional resources-
        edp_file, resource_files = self._find_files(edp_dir)
        # Upload JSON to Elastic Search with document id edp_id
        edp_model = self._upload_to_elastic(edp_file, edp_id)
        # Upload all other files to S3 using upload key edp_id/filename
        self._upload_to_s3(resource_files, edp_dir, edp_id)
        return edp_model

    def _find_files(self, edp_dir: Path) -> tuple[Path, list[Path]]:
        dir_contents = edp_dir.rglob("**/*")
        all_paths = [f for f in dir_contents if f.is_file()]
        json_paths = [f for f in all_paths if f.suffix == ".json" and f.parent == edp_dir]
        resource_paths = [f for f in all_paths if f.suffix != ".json"]
        if len(json_paths) != 1:
            raise DRFValidationError(f"Expected exactly one EDP file, but found: {json_paths}")
        return json_paths[0], resource_paths

    def _upload_to_elastic(self, edp_file: Path, edp_id: str):
        logger.info("Uploading EDP file '%s' with ID '%s' to Elastic Search...", edp_file, edp_id)

        with edp_file.open("r") as json_file:
            edp_dict: dict = json.load(json_file)

        edp_model = self._open_edp_file_and_validate(edp_dict)
        try:
            self._elastic_client.index(
                index=self._config.elastic_index,
                id=edp_id,
                document=edp_dict,
            )
        except AuthenticationException:
            raise APIException("Unable to authenticate to Elastic Search")

        full_download_url = HttpUrl(f"{self._config.elastic_url}/{self._config.elastic_index}/_doc/{edp_id}")
        logger.info("Uploaded EDP to Elastic Search: %s", full_download_url)

        return edp_model

    def _open_edp_file_and_validate(self, edp_dict: dict):
        version_str = edp_dict.get("schema_version", "v0")
        if version_str not in SchemaVersion:
            raise DRFValidationError("Unknown EDP schema version")
        schema_version = SchemaVersion(version_str)
        try:
            edp_model = schema_versions[schema_version].model_validate(edp_dict)
        except PydanticValidationError as e:
            raise DRFValidationError(str(e))
        return edp_model

    def _upload_to_s3(self, resource_files: list[Path], edp_dir: Path, edp_id: str):
        if len(resource_files) == 0:
            return

        logger.info("Uploading %d resource files to S3...", len(resource_files))

        for resource_file in resource_files:
            resource_file_relative = resource_file.relative_to(edp_dir)
            upload_key = f"{edp_id}/{resource_file_relative}"
            # self._s3_bucket.upload_file(resource_file, upload_key)
            full_download_url = HttpUrl(f"https://{self._s3_bucket.name}.s3.amazonaws.com/{upload_key}")
            logger.info("Uploaded '%s' to S3: %s", resource_file_relative, full_download_url)
