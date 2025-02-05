import json
from logging import getLogger
from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile

import boto3
from elasticsearch import Elasticsearch
from pydantic import HttpUrl
from pydantic.dataclasses import dataclass

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
        self.config = config

        self.elastic_client = Elasticsearch(
            hosts=config.elastic_url,
            api_key=config.elastic_apikey,
            request_timeout=config.elastic_timeout,
        )

        s3 = boto3.resource(
            "s3",
            aws_access_key_id=config.s3_access_key_id,
            aws_secret_access_key=config.s3_secret_access_key,
        )
        self.s3_bucket = s3.Bucket(config.s3_bucket_name)

    def upload_edp_zip(self, edp_zip: Path, edp_id: str):
        with (
            ZipFile(edp_zip, "r") as zip_file,
            TemporaryDirectory() as temp_dir,
        ):
            temp_path = Path(temp_dir)
            logger.info("Unzipping '%s'...", edp_zip)
            zip_file.extractall(temp_path)
            self.upload_edp_directory(temp_path, edp_id)

    def upload_edp_directory(self, edp_dir: Path, edp_id: str):
        logger.info("Uploading EDP directory '%s'...", edp_dir)
        # Find EDP JSON file and additional resources
        edp_file, resource_files = self._find_files(edp_dir)
        # Upload JSON to Elastic Search with document id edp_id
        self._upload_to_elastic(edp_file, edp_id)
        # Upload all other files to S3 using upload key edp_id/filename
        self._upload_to_s3(resource_files, edp_dir, edp_id)

    def _find_files(self, edp_dir: Path) -> tuple[Path, list[Path]]:
        dir_contents = edp_dir.rglob("**/*")
        all_paths = [f for f in dir_contents if f.is_file()]
        json_paths = [f for f in all_paths if f.suffix == ".json" and f.parent == edp_dir]
        resource_paths = [f for f in all_paths if f.suffix != ".json"]
        if len(json_paths) != 1:
            raise RuntimeError(f"Expected exactly one EDP file, but found: {json_paths}")
        return json_paths[0], resource_paths

    def _upload_to_elastic(self, edp_file: Path, edp_id: str):
        logger.info("Uploading EDP file '%s' with ID '%s' to Elastic Search...", edp_file, edp_id)

        with edp_file.open("r") as json_file:
            # TODO(kb) validate against schema
            edp = json.load(json_file)

        self.elastic_client.index(
            index=self.config.elastic_index,
            id=edp_id,
            document=edp,
        )

        full_download_url = HttpUrl(f"{self.config.elastic_url}/{self.config.elastic_index}/_doc/{edp_id}")
        logger.info("Uploaded EDP to Elastic Search: %s", full_download_url)

    def _upload_to_s3(self, resource_files: list[Path], edp_dir: Path, edp_id: str):
        if len(resource_files) == 0:
            return

        logger.info("Uploading %d resource files to S3...", len(resource_files))

        for resource_file in resource_files:
            resource_file_relative = resource_file.relative_to(edp_dir)
            upload_key = f"{edp_id}/{resource_file_relative}"
            self.s3_bucket.upload_file(resource_file, upload_key)
            full_download_url = HttpUrl(f"https://{self.s3_bucket.name}.s3.amazonaws.com/{upload_key}")
            logger.info("Uploaded '%s' to S3: %s", resource_file_relative, full_download_url)
