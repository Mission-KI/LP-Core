import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APIClient
from user.models import User


def test_change_password_forbidden():
    response = APIClient().post(reverse("change_password"), data={}, format="json")
    assert isinstance(response, Response) and response.status_code == status.HTTP_401_UNAUTHORIZED, response.data


@pytest.fixture
def auth_client():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.mark.django_db()
def test_change_password_bad_request(auth_client: APIClient):
    response = auth_client.post(reverse("change_password"), data={}, format="json")
    assert isinstance(response, Response) and response.status_code == status.HTTP_400_BAD_REQUEST, response.data


@pytest.mark.django_db()
def test_change_password_missing_field(auth_client: APIClient):
    response = auth_client.post(reverse("change_password"), data={"current_password": "testpassword"}, format="json")
    assert isinstance(response, Response) and response.status_code == status.HTTP_400_BAD_REQUEST, response.data


@pytest.mark.django_db()
def test_change_password_wrong_password(auth_client: APIClient):
    response = auth_client.post(
        reverse("change_password"),
        data={
            "current_password": "wrongpassword",
            "new_password": "newpassword",
            "confirm_password": "newpassword",
        },
        format="json",
    )
    assert isinstance(response, Response) and response.status_code == status.HTTP_400_BAD_REQUEST, response.data


@pytest.mark.django_db()
def test_change_password_confirm_password_mismatch(auth_client: APIClient):
    response = auth_client.post(
        reverse("change_password"),
        data={
            "current_password": "testpassword",
            "new_password": "newpassword",
            "confirm_password": "wrongpassword",
        },
        format="json",
    )
    assert isinstance(response, Response) and response.status_code == status.HTTP_400_BAD_REQUEST, response.data


@pytest.mark.django_db()
def test_change_password(auth_client: APIClient):
    response = auth_client.post(
        reverse("change_password"),
        data={
            "current_password": "testpassword",
            "new_password": "newpassword",
            "confirm_password": "newpassword",
        },
        format="json",
    )
    assert isinstance(response, Response) and response.status_code == status.HTTP_200_OK, response.data
    assert User.objects.get(username="testuser").check_password("newpassword")
