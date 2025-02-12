import base64

import requests
from django.conf import settings
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


def get_auth_headers():
    """Returns the authentication headers for Elasticsearch requests"""
    auth_value = f"{settings.ELASTICSEARCH_USERNAME}:{settings.ELASTICSEARCH_PASSWORD}"
    encoded_auth_value = base64.b64encode(auth_value.encode("utf-8")).decode("utf-8")

    return {
        "Content-Type": "application/json",
        "Authorization": f"Basic {encoded_auth_value}",
    }


def elasticsearch_request(method, endpoint, data=None, timeout=10):
    """Helper function to send requests to Elasticsearch with a timeout"""
    es_url = f"{settings.ELASTICSEARCH_URL}/{endpoint}"

    try:
        response = requests.request(method, es_url, json=data, headers=get_auth_headers(), timeout=timeout)

        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response({"error": response.text}, status=response.status_code)

    except requests.exceptions.Timeout:
        return Response({"error": "Request timed out"}, status=status.HTTP_504_GATEWAY_TIMEOUT)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@swagger_auto_schema(
    methods=["post"],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "query": openapi.Schema(type=openapi.TYPE_OBJECT, description="Full Elasticsearch query object"),
        },
        required=["query"],
    ),
)
@api_view(["POST"])
def search(request):
    """Sends a raw query to Elasticsearch"""
    query = request.data.get("query", {})
    return elasticsearch_request("POST", "_search", {"query": query})


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "uuid",
            openapi.IN_PATH,
            description="Unique identifier of the EDP document",
            type=openapi.TYPE_STRING,
            required=True,
        )
    ],
)
@api_view(["GET"])
def find(request, uuid):
    """Retrieve an EDP from Elasticsearch"""
    return elasticsearch_request("GET", f"_doc/{uuid}")


@api_view(["GET"])
def count(request):
    """Gets the total count of assets in Elasticsearch"""
    return elasticsearch_request("GET", "_count")
