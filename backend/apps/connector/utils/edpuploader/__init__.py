import json
from logging import getLogger
from pathlib import Path
from typing import IO, Any
from zipfile import BadZipFile, ZipFile

from apps.search.views import _find_resource_id
from extended_dataset_profile import CURRENT_SCHEMA, schema_versions
from packaging.version import InvalidVersion, Version
from pydantic import ValidationError as PydanticValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError

from .config import UploadConfig
from .elastic_edp import ElasticDBWrapper
from .s3_edp_storage import S3EDPStorage

logger = getLogger(__name__)


def edp_dict_to_model(edp_dict: dict):
    version_str = edp_dict.get("schemaVersion", "0.0.0+dirty")
    try:
        major_version = Version(version_str).major
    except InvalidVersion:
        raise DRFValidationError(
            f"Invalid EDP schema version '{version_str}' (available: {list(schema_versions.keys())}) "
        )
    if major_version not in schema_versions:
        raise DRFValidationError(
            f"Unknown EDP major schema version {major_version} (available: {list(schema_versions.keys())}) "
        )
    try:
        return schema_versions[major_version].model_validate(edp_dict)
    except PydanticValidationError as e:
        raise DRFValidationError(str(e))


def edp_model_from_file(edp_file):
    with edp_file.open("r") as json_file:
        edp_dict: dict = json.load(json_file)

    edp_model = edp_dict_to_model(edp_dict)
    return edp_model


class EdpUploader:
    def __init__(self, config: UploadConfig):
        self._config = config
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
            hits = _find_resource_id(asset_ref.assetId, asset_ref.dataSpace.name)
            if len(hits) > 0 and edp_id not in hits:
                raise DRFValidationError(
                    f"Asset ID {asset_ref.assetId} already exists in the data space {asset_ref.dataSpace.name}: {', '.join(hits)}"
                )
            all_hits.extend(hits)

        return len(all_hits) > 0

    def _split_edp_json_and_additional_files(self, edp_dir: Path) -> tuple[Path, list[Path]]:
        dir_contents = edp_dir.rglob("*")
        all_paths = [f for f in dir_contents if f.is_file()]
        json_paths = [f for f in all_paths if f.suffix == ".json" and f.parent == edp_dir]
        resource_paths = [f for f in all_paths if f.suffix != ".json"]
        if len(json_paths) != 1:
            raise DRFValidationError(f"Expected exactly one EDP file, but found: {json_paths}")
        return json_paths[0], resource_paths
