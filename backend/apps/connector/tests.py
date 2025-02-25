import uuid
from datetime import datetime
from io import BytesIO, StringIO
from typing import Any, Dict, List
from unittest.mock import Mock
from zipfile import ZipFile

import requests
from common.edpuploader.s3_edp_storage import S3EDPStorage
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.test import override_settings
from django.urls import reverse
from elasticsearch import Elasticsearch
from extended_dataset_profile import SchemaVersion
from extended_dataset_profile.models.v0.edp import (
    DataSpace,
    ExtendedDatasetProfile,
    License,
    Publisher,
)
from pytest import MonkeyPatch, fixture
from requests import Response as RequestResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APIClient

# from apps.monitoring.utils import create_log


@fixture()
def settings():
    with override_settings(
        ELASTICSEARCH_URL="https://fake-server.beebucket.de/edp-data",
        ELASTICSEARCH_API_KEY="dummy",
        S3_ACCESS_KEY_ID="dummy-key-id",
        S3_SECRET_ACCESS_KEY="dummy-key",
        S3_BUCKET_NAME="dummy-bucket",
    ) as s:
        yield s


@fixture
def client(settings):
    return APIClient()


def edp_base_url():
    return reverse("edp-base")


def edp_detail_url(id: str):
    return reverse("edp-detail", kwargs={"id": id})


@fixture
def not_a_zip():
    with StringIO("fake data") as f:
        yield f


def create_zip(file_list: Dict[str, str]):
    zip_buf = BytesIO()
    with ZipFile(zip_buf, "w") as zip_file:
        for file_name, content in file_list.items():
            zip_file.writestr(file_name, data=content)
    zip_buf.seek(0)
    return InMemoryUploadedFile(
        zip_buf,
        name="test_file.zip",
        content_type="application/zip",
        field_name=None,
        size=None,
        charset=None,
    )


@fixture
def mini_edp():
    return ExtendedDatasetProfile(
        schema_version=SchemaVersion.V0,
        volume=4307,
        dataTypes=set(),
        assetId="did:op:ACce67694eD2848dd683c651Dab7Af823b7dd123",
        name="Sample asset",
        url="https://portal.pontus-x.eu/asset/did:op:ACce67694eD2848dd683c651Dab7Af823b7dd123",
        dataSpace=DataSpace(name="Pontus-X", url="https://portal.pontus-x.eu"),
        publisher=Publisher(name="OPF", url=None),
        publishDate=datetime(year=2026, month=12, day=1),
        license=License(name=None, url="https://market.oceanprotocol.com/terms"),
        freely_available=False,
    )


@fixture
def event_log_mock(monkeypatch: MonkeyPatch):
    mock = Mock()
    monkeypatch.setattr("apps.monitoring.models.EventLog.objects.create", mock)
    return mock


def create_resource_id(client: APIClient, event_log_mock: Mock):
    response = client.post(edp_base_url())
    assert isinstance(response, Response)
    assert response.data is not None
    assert "id" in response.data
    event_log_mock.assert_called_once()
    event_log_mock.reset_mock()
    return response.data["id"]


def test_upload_edp_rejects_json(client: APIClient, event_log_mock: Mock):
    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.put(url, {}, format="json")
    event_log_mock.assert_called_once_with(
        requested_url=url,
        status="fail",
        message='EDP upload failed: Unsupported media type "application/json" in request.',
        metadata=None,
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
    assert response.data == {"detail": 'Unsupported media type "application/json" in request.'}


def test_upload_edp_no_file(client: APIClient, event_log_mock: Mock):
    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.put(url, {}, format="multipart")
    event_log_mock.assert_called_once_with(
        requested_url=url,
        status="fail",
        message="EDP upload failed: [ErrorDetail(string='No file uploaded.', code='invalid')]",
        metadata=None,
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == ["No file uploaded."]


def test_upload_edp_file_not_a_file(client: APIClient, event_log_mock: Mock):
    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.put(url, {"file": "not-a-file"}, format="multipart")
    event_log_mock.assert_called_once_with(
        requested_url=url,
        status="fail",
        message="EDP upload failed: [ErrorDetail(string='No file uploaded.', code='invalid')]",
        metadata=None,
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.data == ["No file uploaded."]


def test_upload_edp_file_not_a_zip(client: APIClient, not_a_zip, event_log_mock: Mock):
    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.put(url, {"file": not_a_zip}, format="multipart")
    event_log_mock.assert_called_once_with(
        requested_url=url,
        status="fail",
        message="EDP upload failed: [ErrorDetail(string='Only ZIP files are accepted.', code='invalid')]",
        metadata=None,
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == ["Only ZIP files are accepted."]


def test_create_edp_file_zip_missing_json(client: APIClient, event_log_mock: Mock):
    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.put(
        url,
        {"file": create_zip({"not-a-json.txt": "{}"})},
        format="multipart",
    )
    event_log_mock.assert_called_once_with(
        requested_url=url,
        status="fail",
        message="EDP upload failed: [ErrorDetail(string='Expected exactly one EDP file, but found: []', code='invalid')]",
        metadata=None,
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == ["Expected exactly one EDP file, but found: []"]


def test_create_edp_file_zip_validation_error(client: APIClient, event_log_mock: Mock):
    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.put(
        url,
        {"file": create_zip({"dummy_edp.json": '{"volume": "world"}', "image.png": ""})},
        format="multipart",
    )
    event_log_mock.assert_called_once()
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert len(response.json()) == 1
    assert response.json()[0].startswith("10 validation errors for ExtendedDatasetProfile")


def test_upload_edp_file_zip_success(
    client: APIClient,
    mini_edp: ExtendedDatasetProfile,
    monkeypatch: MonkeyPatch,
    event_log_mock: Mock,
):
    mock_index = mkmock(monkeypatch, Elasticsearch, "index")
    s3_upload_mock = mkmock(monkeypatch, S3EDPStorage, "upload")
    s3_delete_mock = mkmock(monkeypatch, S3EDPStorage, "delete")
    resp = RequestResponse()
    resp.status_code = 200
    monkeypatch.setattr(resp, "json", lambda: {"hits": {"hits": [{"_id": "dummy"}]}})
    monkeypatch.setattr(requests, "request", lambda method, es_url, json, headers, timeout: resp)

    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.put(
        url,
        {"file": create_zip({"dummy_edp.json": mini_edp.model_dump_json(), "image.png": ""})},
        format="multipart",
    )
    event_log_mock.assert_called_once_with(
        requested_url=url,
        status="success",
        message=f"EDP {id} upload done",
        metadata=None,
    )
    mock_index.assert_called_once()
    s3_upload_mock.assert_called_once()
    s3_delete_mock.assert_called_once()
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert Matcher.matches(
        response.data,
        {"message": f"EDP {id} uploaded successfully", "edp": mini_edp.model_dump(mode="json"), "id": id},
    )


def test_delete_edp_file_zip_success(
    client: APIClient,
    event_log_mock: Mock,
    monkeypatch: MonkeyPatch,
):
    elastic_delete = mkmock(monkeypatch, Elasticsearch, "delete")
    s3_delete = mkmock(monkeypatch, S3EDPStorage, "delete")

    id = create_resource_id(client, event_log_mock)
    url = edp_detail_url(id)
    response = client.delete(
        url,
        {},
        format="multipart",
    )
    event_log_mock.assert_called_once_with(
        requested_url=url,
        status="success",
        message=f"EDP {id} delete done",
        metadata=None,
    )
    elastic_delete.assert_called_once_with(index="edp-data", id=id)
    s3_delete.assert_called_once_with(id)
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert response.data == {"message": f"EDP {id} deleted successfully"}


def mkmock(monkeypatch, t, mod, **kwargs):
    mock = Mock(**kwargs)
    monkeypatch.setattr(t, mod, mock)
    return mock


class Matcher:
    @staticmethod
    def matches(actual: Any, expected: Any) -> bool:
        if isinstance(expected, dict):
            return Matcher._match_dict(actual, expected)
        elif isinstance(expected, list):
            return Matcher._match_list(actual, expected)
        elif isinstance(expected, str):
            return Matcher._match_string(actual, expected)
        return actual == expected

    @staticmethod
    def _match_dict(actual: Dict, expected: Dict) -> bool:
        if not isinstance(actual, dict):
            return False
        return all(k in actual and Matcher.matches(actual[k], v) for k, v in expected.items())

    @staticmethod
    def _match_list(actual: List, expected: List) -> bool:
        if not isinstance(actual, list) or len(actual) != len(expected):
            return False
        return all(Matcher.matches(a, e) for a, e in zip(actual, expected))

    @staticmethod
    def _match_string(actual: str, expected: str) -> bool:
        if expected == "<uuid>":
            try:
                uuid.UUID(str(actual))
                return True
            except ValueError:
                return False
        return actual == expected
