import uuid
from datetime import datetime
from io import BytesIO
from typing import Any, Dict, List
from unittest.mock import Mock, patch
from zipfile import ZipFile

import apps.search.views as search_views
import boto3
import pytest
import requests
from apps.connector.models import ResourceStatus
from apps.connector.utils.edpuploader.elastic_edp import ElasticDBWrapper
from apps.connector.utils.edpuploader.s3_edp_storage import S3EDPStorage
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
from pytest import MonkeyPatch
from requests import Response as RequestResponse
from rest_framework import status
from rest_framework.exceptions import ErrorDetail
from rest_framework.response import Response
from rest_framework.test import APIClient
from user.models import Dataspace, User


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def auth_client():
    client = APIClient()
    dataspace = Dataspace.objects.create(name="Pontus-X")
    user = User.objects.create_user(username="test", password="test", dataspace=dataspace)
    user.is_connector_user = True
    client.force_authenticate(user=user)
    return client


@pytest.fixture
def no_perm_client():
    client = APIClient()
    user = User.objects.create_user(username="test", password="test")
    user.is_connector_user = False
    client.force_authenticate(user=user)
    return client


@pytest.fixture
def valid_zip_file():
    return create_zip_from_file_list({"edp.json": mini_edp().model_dump_json(), "image.png": ""})


@pytest.fixture
def invalid_zip_file():
    return BytesIO(b"This is not a zip file")


def raw_zip_upload_url(id):
    return reverse("edp-raw-zip-upload", kwargs={"id": id, "file_name": "test.zip"})


def edp_base_url():
    return reverse("edp-base")


def edp_detail_url(id: uuid.UUID):
    return reverse("edp-detail", kwargs={"id": id})


def create_zip_from_file_list(file_list: Dict[str, str]):
    zip_buf = BytesIO()
    with ZipFile(zip_buf, "w") as zip_file:
        for file_name, content in file_list.items():
            zip_file.writestr(file_name, data=content)
    zip_buf.seek(0)
    return zip_buf


def create_upload_zip_file(file_list: Dict[str, str]):
    return InMemoryUploadedFile(
        create_zip_from_file_list(file_list),
        name="test_file.zip",
        content_type="application/zip",
        field_name=None,
        size=None,
        charset=None,
    )


def mini_edp():
    asset_ref = AssetReference(
        assetId="did:op:ACce37394eD2848dd383c651Dsb7sf823b7dd123",
        assetUrl="https://portal.pontus-x.eu/asset/did:op:ACce37394eD2848dd383c651Dsb7sf823b7dd123",
        dataSpace=DataSpace(name="Pontus-X", url="https://portal.pontus-x.eu"),
        publisher=Publisher(name="OPF", url=None),
        publishDate=datetime(year=2026, month=12, day=1),
        license=License(name=None, url="https://market.oceanprotocol.com/terms"),
    )

    return ExtendedDatasetProfile(
        schema_version=SchemaVersion.V0,
        volume=4307,
        dataTypes=set(),
        name="Sample asset",
        freely_available=False,
        generatedBy="Example Generator",
        assetRefs=[asset_ref],
        assetSha256Hash="9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    )


def check_event_log(url, status, message, expect_id=True):
    assert EventLog.objects.count() == 1
    event_log = EventLog.objects.all()[0]
    assert event_log.requested_url == url and event_log.message == message and event_log.status == status
    if expect_id:
        assert event_log.metadata is not None and "id" in event_log.metadata


@pytest.mark.django_db()
def test_upload_edp_rejects_json(auth_client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.put(url, {}, format="json")

    assert (
        isinstance(response, Response)
        and response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
        and response.data == {"detail": 'Unsupported media type "application/json" in request.'}
    )
    check_event_log(
        url, status="fail", message='EDP upload failed: Unsupported media type "application/json" in request.'
    )


@pytest.mark.django_db()
def test_upload_edp_no_file(auth_client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.put(url, {}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == {"file": ["No file was submitted."]}
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: {'file': [ErrorDetail(string='No file was submitted.', code='required')]}",
    )


@pytest.mark.django_db()
def test_upload_edp_file_not_a_file(auth_client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.put(url, {"file": "not-a-file"}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.data == {
        "file": [
            ErrorDetail(
                string="The submitted data was not a file. Check the encoding type on the form.",
                code="invalid",
            )
        ]
    }
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: {'file': [ErrorDetail(string='The submitted data was not a file. Check the encoding type on the form.', code='invalid')]}",
    )


@pytest.mark.django_db()
def test_upload_edp_file_invalid_zip_file(auth_client: APIClient, invalid_zip_file):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.put(url, {"file": invalid_zip_file}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == {"file": ["File extension “” is not allowed. Allowed extensions are: zip."]}
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: {'file': [ErrorDetail(string='File extension “” is not allowed. Allowed extensions are: zip.', code='invalid_extension')]}",
    )


@pytest.mark.django_db()
def test_create_edp_file_zip_missing_json(auth_client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.put(
        url,
        {"file": create_upload_zip_file({"not-a-json.txt": "{}"})},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == ["Expected exactly one EDP file, but found: []"]
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: [ErrorDetail(string='Expected exactly one EDP file, but found: []', code='invalid')]",
    )


@pytest.mark.django_db()
def test_create_edp_file_zip_validation_error(auth_client: APIClient):
    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.put(
        url,
        {"file": create_upload_zip_file({"dummy_edp.json": '{"volume": "world"}', "image.png": ""})},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert len(response.json()) >= 1
    assert "validation errors for ExtendedDatasetProfile" in response.json()[0]


@mock_aws
@pytest.mark.django_db()
def test_upload_edp_file_zip_success(auth_client: APIClient, monkeypatch: MonkeyPatch):
    mock_index = mkmock(monkeypatch, Elasticsearch, "index")
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)
    id = ResourceStatus.objects.create().id
    monkeypatch.setattr(
        search_views,
        "elasticsearch_request",
        Mock(return_value=Response({"hits": {"total": 1, "hits": [{"_id": str(id)}]}})),
    )

    url = edp_detail_url(id)
    edp = mini_edp()
    response = auth_client.put(
        url,
        {"file": create_upload_zip_file({"dummy_edp.json": edp.model_dump_json(), "image.png": ""})},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert Matcher.matches(
        response.data,
        {
            "message": "EDP uploaded successfully",
            "edp": edp.model_dump(mode="json"),
            "id": str(id),
        },
    )
    check_event_log(url=url, status="success", message="EDP upload done")
    mock_index.assert_called_once()


@pytest.mark.django_db()
def test_upload_user_edp_dataspace_mismatch(monkeypatch: MonkeyPatch):
    auth_client = APIClient()
    dataspace = Dataspace.objects.create(name="Another dataspace")
    user = User.objects.create_user(username="test", password="test", dataspace=dataspace)
    user.is_connector_user = True
    auth_client.force_authenticate(user=user)

    id = ResourceStatus.objects.create().id
    monkeypatch.setattr(
        search_views,
        "elasticsearch_request",
        Mock(return_value=Response({"hits": {"total": 1, "hits": [{"_id": str(id)}]}})),
    )

    url = edp_detail_url(id)
    response = auth_client.put(
        url,
        {"file": create_upload_zip_file({"dummy_edp.json": mini_edp().model_dump_json(), "image.png": ""})},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.json()
    assert response.json() == {"detail": "User not allowed to upload to dataspace Pontus-X"}
    check_event_log(
        url=url, status="fail", message="EDP upload failed: User not allowed to upload to dataspace Pontus-X"
    )


@mock_aws
@pytest.mark.django_db()
def test_upload_edp_file_already_exists_with_different_resource_id(auth_client: APIClient, monkeypatch: MonkeyPatch):
    mock_index = mkmock(monkeypatch, Elasticsearch, "index")
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)
    resp = RequestResponse()
    resp.status_code = 200

    monkeypatch.setattr(
        resp,
        "json",
        lambda: {
            "hits": {
                "total": 1,
                "hits": [
                    {
                        "_id": "<the-other-id>",
                        "_source": {
                            "assetRefs": [
                                {
                                    "assetId": "asset-id",
                                    "dataSpace": {"name": "dPName"},
                                }
                            ]
                        },
                    }
                ],
            }
        },
    )
    monkeypatch.setattr(requests, "request", lambda method, es_url, json, headers, timeout: resp)

    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.put(
        url,
        {"file": create_upload_zip_file({"dummy_edp.json": mini_edp().model_dump_json(), "image.png": ""})},
        format="multipart",
    )
    # msg = "Asset ID already exists in the data space: <the-other-id>"
    # check_event_log(
    #     url=url,
    #     status="fail",
    #     message=f"EDP upload failed: [ErrorDetail(string='{msg}', code='invalid')]",
    # )
    assert mock_index.call_count == 0
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()

    assert "already exists in the data space" in response.json()[0]


@mock_aws
@pytest.mark.django_db()
def test_delete_edp_file_zip_success(auth_client: APIClient, monkeypatch: MonkeyPatch):
    elastic_delete = mkmock(monkeypatch, Elasticsearch, "delete")
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)

    id = ResourceStatus.objects.create().id
    url = edp_detail_url(id)
    response = auth_client.delete(
        url,
        {},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert response.data == {"message": "EDP deleted successfully", "id": str(id)}
    check_event_log(url=url, status="success", message="EDP delete done")
    elastic_delete.assert_called_once_with(index="edp-data", id=str(id))


@pytest.mark.django_db()
def test_get_schema(auth_client: APIClient):
    response = auth_client.get(reverse("edp-schema"))
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert response.data == CURRENT_SCHEMA.model_json_schema()


@pytest.mark.django_db
def test_raw_zip_upload_success(auth_client: APIClient, valid_zip_file: BytesIO, monkeypatch: MonkeyPatch):
    resource = ResourceStatus.objects.create()
    url = raw_zip_upload_url(resource.id)

    monkeypatch.setattr(
        search_views,
        "elasticsearch_request",
        Mock(return_value=Response({"hits": {"total": 0, "hits": []}})),
    )
    monkeypatch.setattr(ElasticDBWrapper, "upload", Mock())
    monkeypatch.setattr(S3EDPStorage, "upload", Mock())
    response = auth_client.put(url, data=valid_zip_file.getvalue(), content_type="application/zip")

    assert response.status_code == status.HTTP_200_OK, response.data
    assert response.data["message"] == "EDP uploaded successfully"
    assert EventLog.objects.filter(metadata__id=str(resource.id)).exists()


@pytest.mark.django_db
def test_raw_zip_upload_permission_denied(no_perm_client, valid_zip_file):
    resource = ResourceStatus.objects.create()
    url = raw_zip_upload_url(resource.id)
    response = no_perm_client.put(url, data=valid_zip_file.getvalue(), content_type="application/zip")
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.data["message"] == "Permission denied"


@pytest.mark.django_db
def test_raw_zip_upload_invalid_zip(auth_client, invalid_zip_file):
    resource = ResourceStatus.objects.create()
    url = raw_zip_upload_url(resource.id)
    response = auth_client.put(url, data=invalid_zip_file.getvalue(), content_type="application/zip")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    rjs = response.json()
    assert rjs == ["Uploaded file is not a valid ZIP archive."]
    assert EventLog.objects.filter(metadata__id=str(resource.id)).exists()


@pytest.mark.django_db
def test_raw_zip_upload_unsupported_media_type(auth_client, valid_zip_file):
    resource = ResourceStatus.objects.create()
    url = raw_zip_upload_url(resource.id)
    response = auth_client.put(url, data=valid_zip_file.getvalue(), content_type="application/json")
    assert response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
    assert EventLog.objects.filter(metadata__id=str(resource.id)).exists()


@pytest.mark.django_db
@patch("apps.connector.views._do_upload")
def test_raw_zip_upload_general_exception(mock_do_upload, auth_client, valid_zip_file):
    mock_do_upload.side_effect = Exception("Test exception")
    resource = ResourceStatus.objects.create()
    url = raw_zip_upload_url(resource.id)
    response = auth_client.put(url, data=valid_zip_file.getvalue(), content_type="application/zip")
    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert "An error occurred" in response.data["error"]
    assert EventLog.objects.filter(metadata__id=str(resource.id)).exists()


@pytest.mark.django_db()
def test_create_permission_denied(no_perm_client: APIClient):
    response = no_perm_client.post(reverse("edp-base"))
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.json()
    assert response.data == {"message": "Permission denied"}
    check_event_log(
        url=response.request["PATH_INFO"],
        status="fail",
        message="Resource ID create failed: Permission denied",
        expect_id=False,
    )


@pytest.mark.django_db()
def test_upload_permission_denied(no_perm_client: APIClient):
    response = no_perm_client.put(reverse("edp-detail", kwargs={"id": uuid.uuid4()}), {}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.json()
    assert response.data == {"message": "Permission denied"}
    check_event_log(
        url=response.request["PATH_INFO"],
        status="fail",
        message="EDP upload failed: Permission denied",
    )


@pytest.mark.django_db()
def test_delete_permission_denied(no_perm_client: APIClient):
    response = no_perm_client.delete(reverse("edp-detail", kwargs={"id": uuid.uuid4()}), {}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.json()
    assert response.data == {"message": "Permission denied"}
    check_event_log(
        url=response.request["PATH_INFO"],
        status="fail",
        message="EDP delete failed: Permission denied",
    )


@pytest.mark.django_db()
def test_status_permission_denied(no_perm_client: APIClient):
    response = no_perm_client.get(reverse("edp-schema"))
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.json()
    assert response.data == {"message": "Permission denied"}
    check_event_log(
        url=response.request["PATH_INFO"],
        status="fail",
        message="EDP schema failed: Permission denied",
        expect_id=False,
    )


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
