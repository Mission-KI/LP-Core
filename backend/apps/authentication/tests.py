import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APIClient


def test_change_password_forbidden():
    response = APIClient().post(reverse("change_password"), data={}, format="json")
    assert (
        isinstance(response, Response)
        and response.status_code == status.HTTP_403_FORBIDDEN
    ), response.data


@pytest.mark.django_db()
def test_change_password_bad_request():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    response = client.post(reverse("change_password"), data={}, format="json")
    assert (
        isinstance(response, Response)
        and response.status_code == status.HTTP_400_BAD_REQUEST
    ), response.data


@pytest.mark.django_db()
def test_change_password_missing_field():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    response = client.post(
        reverse("change_password"),
        data={"current_password": "testpassword"},
        format="json",
    )
    assert (
        isinstance(response, Response)
        and response.status_code == status.HTTP_400_BAD_REQUEST
    ), response.data


@pytest.mark.django_db()
def test_change_password_wrong_password():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    response = client.post(
        reverse("change_password"),
        data={
            "current_password": "wrongpassword",
            "new_password": "newpassword",
            "confirm_password": "newpassword",
        },
        format="json",
    )
    assert (
        isinstance(response, Response)
        and response.status_code == status.HTTP_400_BAD_REQUEST
    ), response.data


@pytest.mark.django_db()
def test_change_password_confirm_password_mismatch():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    response = client.post(
        reverse("change_password"),
        data={
            "current_password": "testpassword",
            "new_password": "newpassword",
            "confirm_password": "wrongpassword",
        },
        format="json",
    )
    assert (
        isinstance(response, Response)
        and response.status_code == status.HTTP_400_BAD_REQUEST
    ), response.data


@pytest.mark.django_db()
def test_change_password():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    response = client.post(
        reverse("change_password"),
        data={
            "current_password": "testpassword",
            "new_password": "newpassword",
            "confirm_password": "newpassword",
        },
        format="json",
    )
    assert (
        isinstance(response, Response) and response.status_code == status.HTTP_200_OK
    ), response.data
    assert User.objects.get(username="testuser").check_password("newpassword")
