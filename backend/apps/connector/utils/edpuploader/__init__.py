import dataclasses
from logging import getLogger
from pathlib import Path
from typing import IO, Any
from zipfile import BadZipFile, ZipFile

from apps.search.views import _find_resource_id
from extended_dataset_profile import CURRENT_SCHEMA, schema_versions
from pydantic import ValidationError as PydanticValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError

from .config import UploadConfig
from .elastic_edp import ElasticDBWrapper
from .s3_edp_storage import S3EDPStorage
from .version_evaluate import VersionEvaluate

logger = getLogger(__name__)


def edp_json_to_model(edp_file_content: str | bytes):
    try:
        version_model = VersionEvaluate.model_validate_json(edp_file_content)
    except PydanticValidationError as e:
        raise DRFValidationError(f"Cannot read schemaVersion from EDP: {e}")
    version = version_model.schemaVersion
    major_version = version.major
    if major_version not in schema_versions:
        raise DRFValidationError(
            f"Unknown EDP major schema version {major_version} (available: {list(schema_versions.keys())}) "
        )
    try:
        return schema_versions[major_version].model_validate_json(edp_file_content)
    except PydanticValidationError as e:
        raise DRFValidationError(str(e))


def edp_model_from_file(edp_file: Path):
    edp_model = edp_json_to_model(edp_file.read_bytes())
    return edp_model


class EdpUploader:
    @staticmethod
    def create_config():
        elastic_config = ElasticDBWrapper.create_config()
        s3_config = S3EDPStorage.create_config()
        return UploadConfig(**dataclasses.asdict(elastic_config), **dataclasses.asdict(s3_config))

    def __init__(self, config: UploadConfig | None = None):
        if config is None:
            config = self.create_config()
        self._elastic = ElasticDBWrapper(config=config)
        self._s3 = S3EDPStorage(config)

    def delete_edp(self, edp_id: str):
        self._s3.delete(edp_id)
        self._elastic.delete(edp_id)

    def extract_edp_zip(self, temp_dir: Path, edp_zip: Path | IO[Any]):
        try:
            with ZipFile(edp_zip, "r") as zip_file:
                logger.info("Unzipping '%s'...", edp_zip)
                zip_file.extractall(temp_dir)
                edp_file, resource_files = self._split_edp_json_and_additional_files(temp_dir)
                return edp_model_from_file(edp_file)
        except BadZipFile:
            raise DRFValidationError("Uploaded file is not a valid ZIP archive.")

    def upload_edp_directory(self, edp_model: CURRENT_SCHEMA, edp_dir: Path, edp_id: str):
        logger.info("Uploading EDP directory '%s'...", edp_dir)

        found_existing_asset = self.validate_edp_upload(edp_id, edp_model)

        self._elastic.upload(edp_model, edp_id)

        if found_existing_asset:
            logger.info("%s: Deleting existing EDP from S3 for update...", edp_id)
            self._s3.delete(edp_id)

        self._s3.upload(edp_dir, edp_id)

    def validate_edp_upload(self, edp_id, edp_model):
        # Loop through all asset references to check for an existing assetId
        all_hits = []
        for asset_ref in edp_model.assetRefs:
            hits = _find_resource_id(asset_ref.assetId, asset_ref.dataSpace.name, edp_model.assetSha256Hash)
            if len(hits) > 0 and edp_id not in hits:
                raise DRFValidationError(
                    f"Asset ID {asset_ref.assetId} already exists in the data space {asset_ref.dataSpace.name}: {', '.join(hits)}"
                )
            all_hits.extend(hits)

        return len(all_hits) > 0

    def get_schema_for_edp(self, edp_id: str):
        schema_version = self._elastic.get_edp_schema_version(edp_id)
        return self._elastic.get_schema(schema_version)

    def _split_edp_json_and_additional_files(self, edp_dir: Path) -> tuple[Path, list[Path]]:
        dir_contents = edp_dir.rglob("*")
        all_paths = [f for f in dir_contents if f.is_file()]
        json_paths = [f for f in all_paths if f.suffix == ".json" and f.parent == edp_dir]
        resource_paths = [f for f in all_paths if f.suffix != ".json"]
        if len(json_paths) != 1:
            raise DRFValidationError(f"Expected exactly one EDP file, but found: {json_paths}")
        return json_paths[0], resource_paths
