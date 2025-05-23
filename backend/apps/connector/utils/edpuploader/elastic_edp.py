from logging import getLogger

from django.conf import settings
from elastic_transport import TlsError
from elasticsearch import AuthenticationException, ConflictError, Elasticsearch, NotFoundError
from extended_dataset_profile import CURRENT_SCHEMA, Version, __version__
from extended_dataset_profile.models.base import ExtendedDatasetProfileBase
from pydantic import HttpUrl
from rest_framework.exceptions import APIException

from .config import ElasticConfig
from .version_evaluate import VersionEvaluate

logger = getLogger(__name__)


class ElasticDBWrapper:
    SCHEMA_ADDED_TO_DB = False

    @staticmethod
    def create_config():
        if not settings.ELASTICSEARCH_URL:
            raise APIException(detail="Missing elastic configuration")
        url_data = HttpUrl(settings.ELASTICSEARCH_URL)
        host_url = f"{url_data.scheme}://{url_data.host}"
        if url_data.path is None or url_data.path.count("/") != 1:
            raise APIException("Invalid elasticsearch url configured")
        elastic_index = url_data.path[1:]

        return ElasticConfig(
            elastic_url=host_url,
            elastic_apikey=settings.ELASTICSEARCH_API_KEY,
            elastic_index=elastic_index,
            elastic_schema_index=f"{elastic_index}-schema",
            elastic_timeout=10,
        )

    def __init__(self, config: ElasticConfig):
        self._config = config
        self._elastic_client = Elasticsearch(
            hosts=config.elastic_url,
            api_key=config.elastic_apikey,
            request_timeout=config.elastic_timeout,
        )
        self.index_current_schema()

    def index_current_schema(self):
        if ElasticDBWrapper.SCHEMA_ADDED_TO_DB:
            return
        logger.info("Indexing current schema to Elastic Search...")
        try:
            self._elastic_client.index(
                index=self._config.elastic_schema_index,
                id=str(__version__),
                document={"schema": CURRENT_SCHEMA.model_json_schema(by_alias=True)},
                op_type="create",
            )
            ElasticDBWrapper.SCHEMA_ADDED_TO_DB = True
        except ConflictError:
            logger.info("Schema version %s already added to Elastic Search.", __version__)
            ElasticDBWrapper.SCHEMA_ADDED_TO_DB = True
        except (AuthenticationException, TlsError) as e:
            logger.warning("Could not add schema to Elastic Search: %s", e)

    def get_schema(self, schema_version: Version):
        logger.info("Getting schema version %s from Elastic Search", schema_version)
        try:
            response = self._elastic_client.get(index=self._config.elastic_schema_index, id=str(schema_version))
            return response["_source"]["schema"]
        except NotFoundError:
            raise APIException(f"Schema version {schema_version} not found in Elastic Search")
        except AuthenticationException:
            raise APIException("Unable to authenticate to Elastic Search")

    def get_edp_schema_version(self, edp_id: str):
        logger.info("Getting EDP with ID '%s' from Elastic Search", edp_id)
        try:
            response = self._elastic_client.get(index=self._config.elastic_index, id=edp_id)
            base_edp = VersionEvaluate.model_validate(response["_source"])
            return base_edp.schemaVersion
        except NotFoundError:
            raise APIException(f"EDP with ID {edp_id} not found in Elastic Search")
        except AuthenticationException:
            raise APIException("Unable to authenticate to Elastic Search")

    def upload(self, edp: ExtendedDatasetProfileBase, edp_id: str):
        logger.info("Uploading EDP with ID '%s' to Elastic Search...", edp_id)
        try:
            self._elastic_client.index(
                index=self._config.elastic_index,
                id=edp_id,
                document=edp.model_dump(mode="json", by_alias=True),
            )
        except AuthenticationException:
            raise APIException("Unable to authenticate to Elastic Search")

        full_download_url = HttpUrl(f"{self._config.elastic_url}/{self._config.elastic_index}/_doc/{edp_id}")
        logger.info("Uploaded EDP to Elastic Search: %s", full_download_url)

    def delete(self, edp_id: str):
        logger.info("Deleting EDP with ID '%s' to Elastic Search", edp_id)
        try:
            self._elastic_client.delete(index=self._config.elastic_index, id=edp_id)
        except NotFoundError:
            logger.warning(f"No EDP with id {edp_id} found for deletion")
            return
        except AuthenticationException:
            raise APIException("Unable to authenticate to Elastic Search")

        full_download_url = HttpUrl(f"{self._config.elastic_url}/{self._config.elastic_index}/_doc/{edp_id}")
        logger.info(f"Deleted EDP {edp_id} from Elastic Search: %s", full_download_url)
