import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response


def get_auth_headers():
    """Returns the authentication headers for Elasticsearch requests"""

    return {
        "Content-Type": "application/json",
        "Authorization": f"ApiKey {settings.ELASTICSEARCH_API_KEY}",
    }


def elasticsearch_request(method, endpoint, data=None, timeout=10):
    """Helper function to send requests to Elasticsearch with a timeout"""
    es_url = f"{settings.ELASTICSEARCH_URL}/{endpoint}"

    try:
        response = requests.request(method, es_url, json=data, headers=get_auth_headers(), timeout=timeout)

        if response.status_code == 200:
            return Response(response.json())
        else:
            return Response({"error": response.text}, status=response.status_code)

    except requests.exceptions.Timeout:
        return Response({"error": "Request timed out"}, status=status.HTTP_504_GATEWAY_TIMEOUT)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
