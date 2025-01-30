from datetime import datetime
from io import BytesIO, StringIO
from typing import Dict
from zipfile import ZipFile

import pytest
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.urls import reverse
from extended_dataset_profile import SchemaVersion
from extended_dataset_profile.models.v0.edp import (
    DataSpace,
    ExtendedDatasetProfile,
    License,
    Publisher,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APIClient


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def create_edp_url():
    return reverse("create_edp")


@pytest.fixture
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


@pytest.fixture
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


def test_create_edp_rejects_json(client: APIClient, create_edp_url: str):
    response = client.post(create_edp_url, {}, format="json")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
    assert response.data == {"detail": 'Unsupported media type "application/json" in request.'}


def test_create_edp_no_file(client: APIClient, create_edp_url: str):
    response = client.post(create_edp_url, {}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data == {"detail": "No file uploaded."}


def test_create_edp_file_not_a_file(client: APIClient, create_edp_url: str):
    response = client.post(create_edp_url, {"file": "not-a-file"}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data == {"detail": "No file uploaded."}


def test_create_edp_file_not_a_zip(client: APIClient, create_edp_url: str, not_a_zip):
    response = client.post(create_edp_url, {"file": not_a_zip}, format="multipart")
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data == {"detail": "Only ZIP files are accepted."}


def test_create_edp_file_zip_missing_json(client: APIClient, create_edp_url: str):
    response = client.post(
        create_edp_url,
        {"file": create_zip({"not-a-json.txt": "{}"})},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data == {"detail": "No JSON file found in the ZIP archive."}


def test_create_edp_file_zip_validation_error(client: APIClient, create_edp_url: str):
    response = client.post(
        create_edp_url,
        {
            "file": create_zip(
                {
                    "dummy_edp.json": '{"volume": "world"}',
                    "some_other_file_will_be_ignored.png": "",
                }
            )
        },
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert isinstance(response.data, dict)
    assert "detail" in response.data
    assert response.data["detail"].startswith("10 validation errors for ExtendedDatasetProfile"), response.data[
        "detail"
    ]


def test_create_edp_file_zip_success(client: APIClient, create_edp_url: str, mini_edp: ExtendedDatasetProfile):
    response = client.post(
        create_edp_url,
        {
            "file": create_zip(
                {
                    "dummy_edp.json": mini_edp.model_dump_json(),
                    "some_other_file_will_be_ignored.png": "",
                }
            )
        },
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK
    assert response.data == {
        "message": "JSON file processed successfully",
        "json_content": mini_edp.model_dump(),
    }
