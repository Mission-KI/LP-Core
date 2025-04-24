from unittest.mock import MagicMock, patch

import pytest
from django.urls import reverse
from rest_framework.response import Response
from rest_framework.test import APIClient
from user.models import Dataspace, User

MOCK_ANALYTICS_RESPONSE = {
    "aggregations": {
        "total_items": {"doc_count": 42},
        "unique_publishers": {"unique_publishers_count": {"value": 5}},
        "total_original_data_assets": {"count": {"value": 10}},
        "total_processed_data_assets": {"count": {"value": 15}},
        "total_refined_data_assets": {"count": {"value": 7}},
        "total_aiml_result_data_assets": {"count": {"value": 9}},
        "publishers_list": {
            "filtered_by_dataspace": {
                "filtered": {"publishers": {"buckets": [{"key": "Publisher A", "doc_count": 3}]}},
                "publishers": {"buckets": [{"key": "Publisher B", "doc_count": 2}]},
            }
        },
    }
}


def test_analytics_not_authorized():
    client = APIClient()
    response = client.get(reverse("analytics"))
    assert response.status_code == 401 and response.json() == {
        "detail": "Authentication credentials were not provided."
    }


@pytest.mark.django_db
@patch("requests.request")
def test_analytics_superuser_access(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = MOCK_ANALYTICS_RESPONSE
    client = APIClient()
    superuser = User.objects.create_user(username="admin", password="admin", is_superuser=True)
    client.force_authenticate(user=superuser)
    response = client.get(reverse("analytics"))
    assert response.status_code == 200


@pytest.mark.django_db
@patch("requests.request")
def test_analytics_monitoring_user_valid_dataspace(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = MOCK_ANALYTICS_RESPONSE
    client = APIClient()

    dataspace = Dataspace.objects.create(name="DataA")
    user = User.objects.create_user(username="monitor", password="monitor", is_monitoring_user=True)
    user.dataspace = dataspace
    user.save()

    client.force_authenticate(user=user)
    response = client.get(reverse("analytics") + f"?dataspace={dataspace.name}")
    assert response.status_code == 200


@pytest.mark.django_db
@patch("requests.request")
def test_analytics_monitoring_user_missing_dataspace_param(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = MOCK_ANALYTICS_RESPONSE
    client = APIClient()

    dataspace = Dataspace.objects.create(name="DataB")
    user = User.objects.create_user(username="monitor2", password="monitor2", is_monitoring_user=True)
    user.dataspace = dataspace
    user.save()

    client.force_authenticate(user=user)
    response = client.get(reverse("analytics"))
    assert response.status_code == 400
    assert "Monitoring users must provide a dataspace." in str(response.data)


@pytest.mark.django_db
@patch("requests.request")
def test_analytics_monitoring_user_wrong_dataspace(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = MOCK_ANALYTICS_RESPONSE
    client = APIClient()

    user_dataspace = Dataspace.objects.create(name="DataC")
    other_dataspace_name = "OtherData"

    user = User.objects.create_user(username="monitor3", password="monitor3", is_monitoring_user=True)
    user.dataspace = user_dataspace
    user.save()

    client.force_authenticate(user=user)
    response = client.get(reverse("analytics") + f"?dataspace={other_dataspace_name}")
    assert response.status_code == 400
    assert "You are not authorized to access this dataspace." in str(response.data)


@pytest.mark.django_db
def test_analytics(monkeypatch):
    elastic_mock = MagicMock(
        return_value=Response(
            status=200,
            data={
                "aggregations": {
                    "total_items": {"doc_count": 100},
                    "unique_publishers": {"unique_publishers_count": {"value": 10}},
                    "total_original_data_assets": {"count": {"value": 20}},
                    "total_processed_data_assets": {"count": {"value": 30}},
                    "total_refined_data_assets": {"count": {"value": 40}},
                    "total_aiml_result_data_assets": {"count": {"value": 50}},
                    "publishers_list": {
                        "filtered_by_dataspace": {
                            "filtered": {
                                "publishers": {
                                    "buckets": [
                                        {"key": "publisher1"},
                                        {"key": "publisher2"},
                                    ]
                                }
                            }
                        }
                    },
                }
            },
        )
    )
    monkeypatch.setattr("apps.monitoring.utils.analytics.elasticsearch_request", elastic_mock)

    client = APIClient()
    dataspace = Dataspace.objects.create(name="test_dataspace")
    user = User.objects.create_user(username="test", password="test", dataspace=dataspace)
    user.is_monitoring_user = True
    client.force_authenticate(user=user)
    response = client.get(reverse("analytics") + f"?dataspace={dataspace.name}")

    assert response.status_code == 200, response.json()
    assert "edp_event_counts" in response.data
    assert "downloads_per_month" in response.data["edp_event_counts"]
    assert "uploads_per_month" in response.data["edp_event_counts"]
    assert len(response.data["edp_event_counts"]["downloads_per_month"]) == 11
    assert len(response.data["edp_event_counts"]["uploads_per_month"]) == 11
    response.data["edp_event_counts"]["downloads_per_month"] = "already_counted_above"
    response.data["edp_event_counts"]["uploads_per_month"] = "already_counted_above"
    assert response.data == {
        "edp_count": 100,
        "publishers_count": 10,
        "original_data_count": 20,
        "processed_data_count": 30,
        "refined_data_count": 40,
        "aiml_result_data_count": 50,
        "publishers": [{"key": "publisher1"}, {"key": "publisher2"}],
        "edp_event_counts": {
            "uploads": {"successful": 0, "failed": 0},
            "edits": {"successful": 0, "failed": 0},
            "deletions": {"successful": 0, "failed": 0},
            "downloads": 0,
            "downloads_per_month": "already_counted_above",
            "uploads_per_month": "already_counted_above",
        },
    }
    assert elastic_mock.called
    assert elastic_mock.call_count == 1
    assert elastic_mock.call_args_list[0][0][0] == "POST"
    assert elastic_mock.call_args_list[0][0][1] == "_search"
