from io import BytesIO, StringIO
from typing import Callable, Dict
from zipfile import ZipFile

import pytest
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.urls import reverse
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
        zip_buf, name="test_file.zip", content_type="application/zip", field_name=None, size=None, charset=None
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


def test_create_edp_file_zip_success(client: APIClient, create_edp_url: str):
    response = client.post(
        create_edp_url,
        {"file": create_zip({"dummy_edp.json": '{"hello": "world"}', "some_other_file_will_be_ignored.png": ""})},
        format="multipart",
    )
    assert isinstance(response, Response)
    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"message": "JSON file processed successfully", "json_content": {"hello": "world"}}
