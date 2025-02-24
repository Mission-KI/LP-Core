import json
import typing
from logging import getLogger
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import IO, Any
from zipfile import BadZipFile, ZipFile

from apps.search.views import _find_resource_id
from extended_dataset_profile import CURRENT_SCHEMA, SchemaVersion, schema_versions
from pydantic import ValidationError as PydanticValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError

from .config import UploadConfig
from .elastic_edp import ElasticDBWrapper
from .s3_edp_storage import S3EDPStorage

logger = getLogger(__name__)


def edp_dict_to_model(edp_dict: dict):
    version_str = edp_dict.get("schema_version", "v0")
    if version_str not in SchemaVersion:
        raise DRFValidationError("Unknown EDP schema version")
    schema_version = SchemaVersion(version_str)
    try:
        edp_model = typing.cast(CURRENT_SCHEMA, schema_versions[schema_version].model_validate(edp_dict))
    except PydanticValidationError as e:
        raise DRFValidationError(str(e))
    return edp_model


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
        edp_file, resource_files = self._split_edp_json_and_additional_files(edp_dir)
        # Upload JSON to Elastic Search with document id edp_id

        edp_model = edp_model_from_file(edp_file)

        hits = _find_resource_id(
            edp_model.assetId,
            edp_model.dataSpace.name,
            edp_model.version,
        )
        self._elastic.upload(edp_model, edp_id)
        if hits.data is not None and len(hits.data) != 0:
            self._s3.delete(edp_id)
        # Upload all other files to S3 using upload key edp_id/filename
        self._s3.upload(resource_files, edp_dir, edp_id)
        return edp_model

    def _split_edp_json_and_additional_files(self, edp_dir: Path) -> tuple[Path, list[Path]]:
        dir_contents = edp_dir.rglob("**/*")
        all_paths = [f for f in dir_contents if f.is_file()]
        json_paths = [f for f in all_paths if f.suffix == ".json" and f.parent == edp_dir]
        resource_paths = [f for f in all_paths if f.suffix != ".json"]
        if len(json_paths) != 1:
            raise DRFValidationError(f"Expected exactly one EDP file, but found: {json_paths}")
        return json_paths[0], resource_paths
