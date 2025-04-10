import json
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
from apps.connector.utils.edpuploader import edp_json_to_model
from apps.connector.utils.edpuploader.elastic_edp import ElasticDBWrapper
from apps.connector.utils.edpuploader.s3_edp_storage import S3EDPStorage
from apps.monitoring.models import EventLog
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import HttpResponse
from django.urls import reverse
from elastic_transport import ApiResponseMeta, HttpHeaders, NodeConfig, TlsError
from elasticsearch import AuthenticationException, ConflictError, Elasticsearch
from extended_dataset_profile import CURRENT_SCHEMA, Version
from extended_dataset_profile import __version__ as current_schema_version
from extended_dataset_profile.models.v0.edp import AssetReference, DataSpace, ExtendedDatasetProfile, License, Publisher
from moto import mock_aws
from pydantic import AnyUrl
from pytest import MonkeyPatch
from requests import Response as RequestResponse
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.test import APIClient
from user.models import Dataspace, User


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def auth_client():
    # prevent schema from being added to the DB by default
    ElasticDBWrapper.SCHEMA_ADDED_TO_DB = True
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
        assetUrl=AnyUrl("https://portal.pontus-x.eu/asset/did:op:ACce37394eD2848dd383c651Dsb7sf823b7dd123"),
        dataSpace=DataSpace(name="Pontus-X", url="https://portal.pontus-x.eu"),
        publisher=Publisher(name="OPF", url=None),
        publishDate=datetime(year=2026, month=12, day=1),
        license=License(name=None, url="https://market.oceanprotocol.com/terms"),
    )

    return ExtendedDatasetProfile(
        schemaVersion=Version(current_schema_version),
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
    url = reverse("edp-detail", kwargs={"id": id})
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
    url = reverse("edp-detail", kwargs={"id": id})
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
    url = reverse("edp-detail", kwargs={"id": id})
    response = auth_client.put(url, {"file": "not-a-file"}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert response.json() == {"file": ["The submitted data was not a file. Check the encoding type on the form."]}
    check_event_log(
        url=url,
        status="fail",
        message="EDP upload failed: {'file': [ErrorDetail(string='The submitted data was not a file. Check the encoding type on the form.', code='invalid')]}",
    )


@pytest.mark.django_db()
def test_upload_edp_file_invalid_zip_file(auth_client: APIClient, invalid_zip_file):
    id = ResourceStatus.objects.create().id
    url = reverse("edp-detail", kwargs={"id": id})
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
    url = reverse("edp-detail", kwargs={"id": id})
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
    url = reverse("edp-detail", kwargs={"id": id})
    response = auth_client.put(
        url,
        {"file": create_upload_zip_file({"dummy_edp.json": '{"volume": "world"}', "image.png": ""})},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.json()
    assert len(response.json()) >= 1
    assert "Cannot read schemaVersion from EDP: 1 validation error for" in response.json()[0]


@mock_aws
@pytest.mark.django_db()
def test_upload_edp_file_zip_success(auth_client: APIClient, monkeypatch: MonkeyPatch):
    ElasticDBWrapper.SCHEMA_ADDED_TO_DB = False
    mock_index = mkmock(monkeypatch, Elasticsearch, "index")
    conn = boto3.resource("s3")
    bucket = conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)
    id = ResourceStatus.objects.create().id
    monkeypatch.setattr(
        search_views,
        "elasticsearch_request",
        Mock(return_value=Response({"hits": {"total": 1, "hits": [{"_id": str(id)}]}})),
    )

    url = reverse("edp-detail", kwargs={"id": id})
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
    assert mock_index.call_count == 2
    assert mock_index.call_args_list[0][1]["id"] == current_schema_version
    assert mock_index.call_args_list[0][1]["index"] == "edp-data-schema"
    assert mock_index.call_args_list[1][1]["id"] == str(id)
    assert mock_index.call_args_list[1][1]["index"] == "edp-data"

    all_objects = bucket.objects.all()
    all_objects = list(all_objects)
    assert len(all_objects) == 2
    assert all_objects[0].key == f"{id}/dummy_edp.json"
    assert all_objects[1].key == f"{id}/image.png"


@pytest.mark.parametrize("dataspace", [None, "Another dataspace"])
@pytest.mark.django_db()
def test_upload_user_edp_dataspace_mismatch(dataspace: None | str):
    dataspace_obj = Dataspace.objects.create(name=dataspace) if dataspace else None
    auth_client = APIClient()
    user = User.objects.create_user(username="test", password="test", dataspace=dataspace_obj)
    user.is_connector_user = True
    auth_client.force_authenticate(user=user)

    id = ResourceStatus.objects.create().id
    url = reverse("edp-detail", kwargs={"id": id})
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
def test_upload_user_edp_superuser(monkeypatch: MonkeyPatch):
    auth_client = APIClient()
    user = User.objects.create_user(username="test", password="test")  # no dataspace assigned
    user.is_superuser = True
    user.is_connector_user = True
    auth_client.force_authenticate(user=user)

    mock_index = mkmock(monkeypatch, Elasticsearch, "index")
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)
    id = ResourceStatus.objects.create().id
    monkeypatch.setattr(
        search_views, "elasticsearch_request", Mock(return_value=Response({"hits": {"total": 0, "hits": []}}))
    )

    url = reverse("edp-detail", kwargs={"id": id})
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
    url = reverse("edp-detail", kwargs={"id": id})
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
def test_delete_edp_by_id_success(auth_client: APIClient, monkeypatch: MonkeyPatch):
    elastic_delete = mkmock(monkeypatch, Elasticsearch, "delete")
    id = ResourceStatus.objects.create().id
    upload_event = EventLog.objects.create(
        requested_url="",
        status="success",
        type=EventLog.TYPE_UPLOAD,
        message="upload done",
        dataspace=Dataspace.objects.create(name="Pontus-X"),
        metadata={
            "id": str(id),
            "assetRefs": [mini_edp().assetRefs[0].model_dump(mode="json")],
            "schemaVersion": str(mini_edp().schemaVersion),
        },
    )
    conn = boto3.resource("s3")
    conn.create_bucket(Bucket=settings.S3_BUCKET_NAME)

    url = reverse(viewname="edp-detail", kwargs={"id": id})
    response = auth_client.delete(
        url,
        {},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK, response.json()
    assert response.data == {"message": "EDP deleted successfully", "id": str(id)}
    assert EventLog.objects.count() == 2
    event_log = EventLog.objects.filter(type=EventLog.TYPE_DELETE).first()
    assert event_log is not None
    assert event_log.requested_url == url and event_log.message == "EDP delete done" and event_log.status == "success"
    assert event_log.metadata == upload_event.metadata
    assert event_log.type == EventLog.TYPE_DELETE
    elastic_delete.assert_called_once_with(index="edp-data", id=str(id))


@pytest.mark.django_db
def test_get_current_schema(auth_client):
    response = auth_client.get(reverse("edp-schema"))

    assert isinstance(response, HttpResponse)
    assert response.status_code == status.HTTP_200_OK

    assert response["Content-Type"] == "application/json"
    assert response["Content-Disposition"] == 'attachment; filename="schema.json"'

    response_json = json.loads(response.content.decode("utf-8"))

    assert response_json == CURRENT_SCHEMA.model_json_schema()


@pytest.mark.django_db
def test_get_edp_schema(auth_client: APIClient, monkeypatch: MonkeyPatch):
    ElasticDBWrapper.SCHEMA_ADDED_TO_DB = False

    def elastic_get_cb(*args, **kwargs):
        if kwargs["index"] == "edp-data":
            return {"_source": mini_edp().model_dump(mode="json")}
        if kwargs["index"] == "edp-data-schema":
            return {"_source": {"schema": CURRENT_SCHEMA.model_json_schema()}}
        raise ValueError("Invalid index")

    elastic_get = Mock(side_effect=elastic_get_cb)

    # elastic_get = Mock(return_value={"_source": {"schema": CURRENT_SCHEMA.model_json_schema()}})
    monkeypatch.setattr(Elasticsearch, "get", elastic_get)
    elastic_index = Mock()
    monkeypatch.setattr(Elasticsearch, "index", elastic_index)

    id = ResourceStatus.objects.create().id
    response = auth_client.get(reverse("edp-schema-by-id", kwargs={"id": str(id)}))

    elastic_index.assert_called_once()
    assert elastic_get.call_count == 2

    assert isinstance(response, HttpResponse)
    assert response.status_code == status.HTTP_200_OK

    assert response["Content-Type"] == "application/json"
    assert response["Content-Disposition"] == 'attachment; filename="schema.json"'

    content = response.content.decode("utf-8")
    response_json = json.loads(content)

    assert response_json == CURRENT_SCHEMA.model_json_schema()


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
    event_log_query = EventLog.objects.filter(metadata__id=str(resource.id))
    assert event_log_query.count() == 1
    assert event_log_query.first() is not None
    edp = mini_edp()
    assert event_log_query.first().metadata == {
        "id": str(resource.id),
        "assetRefs": [edp.assetRefs[0].model_dump(mode="json")],
        "schemaVersion": str(edp.schemaVersion),
    }


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
    assert response.json() == {
        "detail": "EDP upload failed: An unknown error occurred (<class 'Exception'>): Test exception"
    }
    assert EventLog.objects.filter(metadata__id=str(resource.id)).exists()


@pytest.mark.django_db()
def test_create_success(auth_client: APIClient):
    response = auth_client.post(reverse("edp-base"))
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_201_CREATED, response.json()
    assert isinstance(response.data, dict) and "id" in response.data and isinstance(response.data["id"], uuid.UUID)
    check_event_log(
        url=response.request["PATH_INFO"], status="success", message="EDP resource created", expect_id=False
    )


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


@pytest.mark.django_db
def test_schema_allow_any(no_perm_client):
    response = no_perm_client.get(reverse("edp-schema"))

    assert isinstance(response, HttpResponse)
    assert response.status_code == status.HTTP_200_OK

    assert response["Content-Type"] == "application/json"
    assert response["Content-Disposition"] == 'attachment; filename="schema.json"'

    response_json = json.loads(response.content.decode("utf-8"))

    assert response_json == CURRENT_SCHEMA.model_json_schema()


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


def test_edp_json_to_model():
    edp = mini_edp()
    edp_json = edp.model_dump(mode="json")

    edp_json["schemaVersion"] = "invalid"
    with pytest.raises(ValidationError, match="Cannot read schemaVersion from EDP:"):
        edp_json_to_model(json.dumps(edp_json))

    edp_json["schemaVersion"] = "100.200.300"
    with pytest.raises(ValidationError, match="Unknown EDP major schema version 100"):
        edp_json_to_model(json.dumps(edp_json))

    edp_json["schemaVersion"] = current_schema_version
    assert edp_json_to_model(json.dumps(edp_json)).schemaVersion == Version(current_schema_version)


@pytest.mark.django_db
@patch("apps.connector.utils.edpuploader.elastic_edp.Elasticsearch.index")
def test_index_current_schema_conflict_error(mock_index, caplog):
    """Test that ConflictError is handled gracefully in index_current_schema."""
    ElasticDBWrapper.SCHEMA_ADDED_TO_DB = False
    mock_index.side_effect = ConflictError(
        message="Conflict occurred",
        meta=ApiResponseMeta(
            status=409,
            headers=HttpHeaders({}),
            http_version="1.1",
            duration=0.0,
            node=NodeConfig("tcp", "test-node", 9200, "pre"),
        ),
        body={},
    )

    ElasticDBWrapper(config=ElasticDBWrapper.create_config())

    assert ElasticDBWrapper.SCHEMA_ADDED_TO_DB is True
    assert f"Schema version {current_schema_version} already added to Elastic Search." in caplog.text


@pytest.mark.django_db
@patch("apps.connector.utils.edpuploader.elastic_edp.Elasticsearch.index")
def test_index_current_schema_authentication_error(mock_index, caplog):
    """Test that AuthenticationException is logged and handled in index_current_schema."""
    ElasticDBWrapper.SCHEMA_ADDED_TO_DB = False
    mock_index.side_effect = AuthenticationException(
        message="Authentication failed",
        meta=ApiResponseMeta(
            status=409,
            headers=HttpHeaders({}),
            http_version="1.1",
            duration=0.0,
            node=NodeConfig("tcp", "test-node", 9200, "pre"),
        ),
        body={},
    )

    ElasticDBWrapper(config=ElasticDBWrapper.create_config())

    # Ensure the schema is not marked as added
    assert ElasticDBWrapper.SCHEMA_ADDED_TO_DB is False

    # Check that the error was logged
    assert "Could not add schema to Elastic Search: Authentication" in caplog.text


@pytest.mark.django_db
@patch("apps.connector.utils.edpuploader.elastic_edp.Elasticsearch.index")
def test_index_current_schema_tls_error(mock_index, caplog):
    """Test that TlsError is logged and handled in index_current_schema."""
    ElasticDBWrapper.SCHEMA_ADDED_TO_DB = False
    mock_index.side_effect = TlsError(message="TLS handshake failed")

    ElasticDBWrapper(config=ElasticDBWrapper.create_config())

    # Ensure the schema is not marked as added
    assert ElasticDBWrapper.SCHEMA_ADDED_TO_DB is False

    # Check that the error was logged
    assert "Could not add schema to Elastic Search: TLS" in caplog.text


@pytest.mark.django_db
@patch("apps.connector.utils.edpuploader.elastic_edp.Elasticsearch.index")
def test_index_current_schema_success(mock_index):
    """Test that index_current_schema works successfully."""
    ElasticDBWrapper.SCHEMA_ADDED_TO_DB = False
    mock_index.return_value = {"_id": current_schema_version}

    ElasticDBWrapper(config=ElasticDBWrapper.create_config())

    # Ensure the schema is marked as added
    assert ElasticDBWrapper.SCHEMA_ADDED_TO_DB is True

    # Ensure the index method was called with the correct arguments
    mock_index.assert_called_once_with(
        index="edp-data-schema",
        id=current_schema_version,
        document={"schema": CURRENT_SCHEMA.model_json_schema(by_alias=True)},
        op_type="create",
    )
