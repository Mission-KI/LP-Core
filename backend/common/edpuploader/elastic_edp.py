from logging import getLogger

from elasticsearch import AuthenticationException, Elasticsearch, NotFoundError
from pydantic import BaseModel, HttpUrl
from rest_framework.exceptions import APIException, NotFound

from .config import ElasticConfig

logger = getLogger(__name__)


class ElasticDBWrapper:
    def __init__(self, config: ElasticConfig):
        self._config = config
        self._elastic_client = Elasticsearch(
            hosts=config.elastic_url,
            api_key=config.elastic_apikey,
            request_timeout=config.elastic_timeout,
        )

    def upload(self, edp: BaseModel, edp_id: str):
        logger.info("Uploading EDP with ID '%s' to Elastic Search...", edp_id)
        try:
            self._elastic_client.index(
                index=self._config.elastic_index,
                id=edp_id,
                document=edp.model_dump(mode="json"),
            )
        except AuthenticationException:
            raise APIException("Unable to authenticate to Elastic Search")

        full_download_url = HttpUrl(f"{self._config.elastic_url}/{self._config.elastic_index}/_doc/{edp_id}")
        logger.info("Uploaded EDP to Elastic Search: %s", full_download_url)

    def delete(self, edp_id: str):
        logger.info("Deleting EDP with ID '%s' to Elastic Search...", edp_id)
        try:
            self._elastic_client.delete(
                index=self._config.elastic_index,
                id=edp_id,
            )
        except NotFoundError:
            raise NotFound(f"Unable to delete EDP {edp_id} from Elastic Search")
        except AuthenticationException:
            raise APIException("Unable to authenticate to Elastic Search")

        full_download_url = HttpUrl(f"{self._config.elastic_url}/{self._config.elastic_index}/_doc/{edp_id}")
        logger.info("Deleted EDP from Elastic Search: %s", full_download_url)
