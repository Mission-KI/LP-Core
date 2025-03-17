from unittest.mock import MagicMock, patch

import pytest
from django.conf import settings
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIClient


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def search_url():
    return reverse("search")


@pytest.fixture
def find_url():
    return lambda uuid: reverse("find", args=[uuid])


@pytest.fixture
def count_url():
    return reverse("count")


@pytest.fixture
def find_resource_id_url():
    return reverse("find_resource_id")


@pytest.fixture
def mock_auth_headers():
    return {
        "Content-Type": "application/json",
        "Authorization": f"ApiKey {settings.ELASTICSEARCH_API_KEY}",
    }


@patch("requests.request")
def test_search_success(mock_request, client, search_url, mock_auth_headers):
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {"hits": {"total": 42, "hits": []}}

    response = client.post(search_url, {"query": {"match_all": {}}}, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"hits": {"total": 42, "hits": []}}


@patch("requests.request")
def test_search_missing_query(mock_request, client, search_url):
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {"hits": {"total": 0, "hits": []}}

    response = client.post(search_url, {}, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"hits": {"total": 0, "hits": []}}
    mock_request.assert_called()


@patch("requests.request")
def test_search_elasticsearch_failure(mock_request, client, search_url):
    mock_request.return_value.status_code = 500
    mock_request.return_value.text = "Internal Server Error"

    response = client.post(search_url, {"query": {"match_all": {}}}, format="json")

    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert response.data == {"error": "Internal Server Error"}


@patch("requests.request")
def test_find_success(mock_request, client, find_url, mock_auth_headers):
    uuid = "12345"
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {
        "_id": uuid,
        "_source": {"name": "Test Document"},
    }

    response = client.get(find_url(uuid))

    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"_id": uuid, "_source": {"name": "Test Document"}}


@patch("requests.request")
def test_find_not_found(mock_request, client, find_url):
    uuid = "12345"
    mock_request.return_value.status_code = 404
    mock_request.return_value.text = "Not Found"

    response = client.get(find_url(uuid))

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.data == {"error": "Not Found"}


@patch("requests.request")
def test_find_elasticsearch_failure(mock_request, client, find_url):
    uuid = "12345"
    mock_request.return_value.status_code = 500
    mock_request.return_value.text = "Internal Server Error"

    response = client.get(find_url(uuid))

    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert response.data == {"error": "Internal Server Error"}


@patch("requests.request")
def test_count_success(mock_request, client, count_url, mock_auth_headers):
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {"count": 100}

    response = client.get(count_url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"count": 100}


@patch("requests.request")
def test_count_elasticsearch_failure(mock_request, client, count_url):
    mock_request.return_value.status_code = 500
    mock_request.return_value.text = "Internal Server Error"

    response = client.get(count_url)

    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert response.data == {"error": "Internal Server Error"}


@patch("requests.request")
def test_find_resource_id_successful(mock_request, client: APIClient, find_resource_id_url: str):
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {"hits": {"total": 1, "hits": [{"_id": "dummy-resource-id"}]}}

    response = client.post(
        find_resource_id_url,
        data={"assetId": "asset-id", "dataSpaceName": "dPName"},
        format="json",
    )
    assert response.status_code == status.HTTP_200_OK, response.data
    assert response.data == ["dummy-resource-id"]
    mock_request.assert_called_once()
    assert mock_request.call_args[0][0] == "POST"
    assert mock_request.call_args[0][1] == f"{settings.ELASTICSEARCH_URL}/_search"
    assert mock_request.call_args[1] == {
        "json": {
            "query": {
                "bool": {
                    "must": [
                        {"term": {"assetRefs.0.assetId.keyword": {"value": "asset-id"}}},
                        {"term": {"assetRefs.0.dataSpace.name.keyword": {"value": "dPName"}}},
                    ]
                }
            }
        },
        "headers": {"Content-Type": "application/json", "Authorization": "ApiKey dummy"},
        "timeout": 10,
    }


@patch("requests.request")
def test_find_resource_id_not_found(mock_request: MagicMock, client: APIClient, find_resource_id_url: str):
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {"hits": {"total": 0, "hits": []}}

    response = client.post(
        find_resource_id_url,
        data={"assetId": "asset-id", "dataSpaceName": "dPName"},
        format="json",
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.data == {"detail": ErrorDetail(string="Resource not found", code="not_found")}
    mock_request.assert_called_once()


@patch("requests.request")
def test_find_resource_id_not_found_multiple(mock_request: MagicMock, client: APIClient, find_resource_id_url: str):
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {"hits": {"total": 2, "hits": [{"_id": "first"}, {"_id": "second"}]}}

    response = client.post(
        find_resource_id_url,
        data={"assetId": "asset-id", "dataSpaceName": "dPName"},
        format="json",
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.data == {"detail": ErrorDetail(string="Resource not found", code="not_found")}
    mock_request.assert_called_once()


@patch("requests.request")
def test_find_resource_id_api_exception(mock_request: MagicMock, client: APIClient, find_resource_id_url: str):
    mock_request.return_value.status_code = 200
    mock_request.return_value.json.return_value = {}

    response = client.post(
        find_resource_id_url,
        data={"assetId": "asset-id", "dataSpaceName": "dPName"},
        format="json",
    )
    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert response.data == {"detail": ErrorDetail(string="Invalid response from Elasticsearch", code="error")}
    mock_request.assert_called_once()


@patch("requests.request")
def test_find_resource_id_elastic_api_exception(mock_request: MagicMock, client: APIClient, find_resource_id_url: str):
    mock_request.return_value.status_code = 404
    mock_request.return_value.text = "Not Found"

    response = client.post(
        find_resource_id_url,
        data={"assetId": "asset-id", "dataSpaceName": "dPName"},
        format="json",
    )
    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert response.data == {
        "detail": ErrorDetail(string="Failed to query Elasticsearch: {'error': 'Not Found'}", code="error")
    }
    mock_request.assert_called_once()
