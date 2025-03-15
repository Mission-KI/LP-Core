import uuid
from datetime import datetime
from io import BytesIO, StringIO
from typing import Any, Dict, List
from unittest.mock import Mock
from zipfile import ZipFile

import boto3
import pytest
import requests
from apps.connector.models import ResourceStatus
from apps.monitoring.models import EventLog
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.urls import reverse
from elasticsearch import Elasticsearch
from extended_dataset_profile import CURRENT_SCHEMA, SchemaVersion
from extended_dataset_profile.models.v0.edp import (
    AssetReference,
    DataSpace,
    ExtendedDatasetProfile,
    License,
    Publisher,
)
from moto import mock_aws
from pytest import MonkeyPatch, fixture
from requests import Response as RequestResponse
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from rest_framework.response import Response
from rest_framework.test import APIClient

# from apps.monitoring.utils import create_log


@fixture
def client():
    return APIClient()


def edp_base_url():
    return reverse("edp-base")


def edp_detail_url(id: uuid.UUID):
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
        generatedBy="Example Generator",
        assetRefs=[AssetReference(id="did:op:ACce67694eD2848dd683c651Dab7Af823b7dd123")],
    )


def check_event_log(url, status, message, expect_id=True):
    assert EventLog.objects.count() == 1
    event_log = EventLog.objects.all()[0]
    assert event_log.requested_url == url and event_log.message == message and event_log.status == status
    if expect_id:
        assert event_log.metadata is not None and "id" in event_log.metadata


@pytest.mark.django_db()
def test_upload_edp_rejects_json(client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.put(url, {}, format="json")
    check_event_log(
        url, status="fail", message='EDP upload failed: Unsupported media type "application/json" in request.'
    )
    assert (
        isinstance(response, Response)
        and response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
        and response.data == {"detail": 'Unsupported media type "application/json" in request.'}
    )


@pytest.mark.django_db()
def test_upload_edp_no_file(client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.put(url, {}, format="multipart")
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: {'file': [ErrorDetail(string='No file was submitted.', code='required')]}",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == {"file": ["No file was submitted."]}


@pytest.mark.django_db()
def test_upload_edp_file_not_a_file(client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.put(url, {"file": "not-a-file"}, format="multipart")
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: {'file': [ErrorDetail(string='The submitted data was not a file. Check the encoding type on the form.', code='invalid')]}",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.data == {
        "file": [
            ErrorDetail(
                string="The submitted data was not a file. Check the encoding type on the form.", code="invalid"
            )
        ]
    }


@pytest.mark.django_db()
def test_upload_edp_file_not_a_zip(client: APIClient, not_a_zip):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.put(url, {"file": not_a_zip}, format="multipart")
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: {'file': [ErrorDetail(string='File extension “” is not allowed. Allowed extensions are: zip.', code='invalid_extension')]}",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == {"file": ["File extension “” is not allowed. Allowed extensions are: zip."]}


@pytest.mark.django_db()
def test_create_edp_file_zip_missing_json(client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.put(
        url,
        {"file": create_zip({"not-a-json.txt": "{}"})},
        format="multipart",
    )
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: [ErrorDetail(string='Expected exactly one EDP file, but found: []', code='invalid')]",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == ["Expected exactly one EDP file, but found: []"]


@pytest.mark.django_db()
def test_create_edp_file_zip_validation_error(client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.put(
        url,
        {"file": create_zip({"dummy_edp.json": '{"volume": "world"}', "image.png": ""})},
        format="multipart",
    )
    assert EventLog.objects.count() == 1
    event_log = EventLog.objects.all()[0]
    assert event_log.requested_url == url
    assert event_log.status == "fail"
    assert "validation errors for ExtendedDatasetProfile" in event_log.message
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert len(response.json()) >= 1
    assert "validation errors for ExtendedDatasetProfile" in response.json()[0]


@mock_aws
@pytest.mark.django_db()
def test_upload_edp_file_zip_success(client: APIClient, mini_edp: ExtendedDatasetProfile, monkeypatch: MonkeyPatch):
    mock_index = mkmock(monkeypatch, Elasticsearch, "index")
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)
    resp = RequestResponse()
    resp.status_code = 200
    id = ResourceStatus.objects.create().id
    monkeypatch.setattr(resp, "json", lambda: {"hits": {"total": 1, "hits": [{"_id": str(id)}]}})
    monkeypatch.setattr(requests, "request", lambda method, es_url, json, headers, timeout: resp)

    url = edp_detail_url(id)
    response = client.put(
        url,
        {"file": create_zip({"dummy_edp.json": mini_edp.model_dump_json(), "image.png": ""})},
        format="multipart",
    )
    check_event_log(
        url=url,
        status="success",
        message=f"EDP {id} upload done",
    )
    mock_index.assert_called_once()
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert Matcher.matches(
        response.data,
        {"message": "EDP uploaded successfully", "edp": mini_edp.model_dump(mode="json"), "id": str(id)},
    )


@mock_aws
@pytest.mark.django_db()
def test_upload_edp_file_already_exists_with_different_resource_id(
    client: APIClient, mini_edp: ExtendedDatasetProfile, monkeypatch: MonkeyPatch
):
    mock_index = mkmock(monkeypatch, Elasticsearch, "index")
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)
    resp = RequestResponse()
    resp.status_code = 200
    monkeypatch.setattr(resp, "json", lambda: {"hits": {"total": 1, "hits": [{"_id": "<the-other-id>"}]}})
    monkeypatch.setattr(requests, "request", lambda method, es_url, json, headers, timeout: resp)

    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.put(
        url,
        {"file": create_zip({"dummy_edp.json": mini_edp.model_dump_json(), "image.png": ""})},
        format="multipart",
    )
    msg = f"Asset ID {mini_edp.assetId} already exists in the data space {mini_edp.dataSpace.name}: <the-other-id>"
    check_event_log(
        url=url,
        status="fail",
        message=f"EDP upload failed: [ErrorDetail(string='{msg}', code='invalid')]",
    )
    assert mock_index.call_count == 0
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == [msg]


@mock_aws
@pytest.mark.django_db()
def test_delete_edp_file_zip_success(client: APIClient, monkeypatch: MonkeyPatch):
    elastic_delete = mkmock(monkeypatch, Elasticsearch, "delete")
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)

    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = client.delete(
        url,
        {},
        format="multipart",
    )
    check_event_log(
        url=url,
        status="success",
        message="EDP delete done",
    )
    elastic_delete.assert_called_once_with(index="edp-data", id=str(id))
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert response.data == {"message": "EDP deleted successfully", "id": str(id)}


def test_get_schema(client: APIClient):
    response = client.get(reverse("edp-schema"))
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert response.data == CURRENT_SCHEMA.model_json_schema()


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
