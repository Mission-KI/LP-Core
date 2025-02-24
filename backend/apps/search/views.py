import requests
from django.conf import settings
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
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


@swagger_auto_schema(
    methods=["post"],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "assetId": openapi.Schema(
                type=openapi.TYPE_STRING, description="assetId identifying the EDP in the dataSpace"
            ),
            "dataSpaceName": openapi.Schema(
                type=openapi.TYPE_STRING, description="Name of the dataSpace used to publish the EDP"
            ),
            "assetVersion": openapi.Schema(type=openapi.TYPE_STRING, description="Asset version"),
        },
        required=["assetId", "dataSpaceName"],
    ),
)
@api_view(["POST"])
def find_resource_id(request):
    asset_id = request.data.get("assetId", "string")
    data_space_name = request.data.get("dataSpaceName", None)
    asset_version = request.data.get("assetVersion", None)
    return _find_resource_id(asset_id, data_space_name, asset_version)


def _find_resource_id(asset_id: str, data_space_name: str, asset_version: str | None):
    must = [
        {"match": {"assetId": asset_id}},
        {"match": {"dataSpace.name": data_space_name}},
    ]
    if asset_version is not None:
        must.append({"match": {"version": asset_version}})

    resp = elasticsearch_request(
        "POST",
        "_search",
        {"query": {"bool": {"must": must}}},
    )
    if resp.status_code != status.HTTP_200_OK:
        return resp

    return Response(
        [hit["_id"] for hit in resp.data["hits"]["hits"]] if resp.data is not None else [], status.HTTP_200_OK
    )
