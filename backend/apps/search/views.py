from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException, NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import FindResourceIDSerializer, SearchSerializer
from .utils.elasticsearch import elasticsearch_request


@extend_schema(
    methods=["POST"],
    request=SearchSerializer,
    responses={200: OpenApiTypes.OBJECT},
)
@api_view(["POST"])
@permission_classes([AllowAny])
def search(request):
    """Sends a raw query to Elasticsearch"""
    query = request.data
    return elasticsearch_request("POST", "_search", query)


@extend_schema(
    methods=["GET"],
    parameters=[
        OpenApiParameter(
            "uuid",
            location=OpenApiParameter.PATH,
            description="Unique identifier of the EDP document",
            type=OpenApiTypes.STR,
            required=True,
        )
    ],
    request=None,
    responses={200: OpenApiTypes.OBJECT},
)
@api_view(["GET"])
@permission_classes([AllowAny])
def find(request, uuid):
    """Retrieve an EDP from Elasticsearch"""
    return elasticsearch_request("GET", f"_doc/{uuid}")


@extend_schema(
    methods=["GET"],
    request=None,
    responses={200: OpenApiTypes.OBJECT},
)
@api_view(["GET"])
@permission_classes([AllowAny])
def count(request):
    """Gets the total count of assets in Elasticsearch"""
    return elasticsearch_request("GET", "_count")


@extend_schema(
    methods=["POST"],
    request=FindResourceIDSerializer,
    responses={200: OpenApiTypes.STR},
    summary="Find the resource ID of an EDP in the Database",
)
@api_view(["POST"])
@permission_classes([AllowAny])
def find_resource_id(request):
    serializer = FindResourceIDSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    asset_id: str = serializer.validated_data.get("assetId")  # type: ignore
    data_space_name: str = serializer.validated_data.get("dataSpaceName")  # type: ignore
    asset_sha256_hash: str | None = serializer.validated_data.get("assetSha256Hash")  # type: ignore
    data = _find_resource_id(asset_id, data_space_name, asset_sha256_hash)
    if len(data) != 1:
        raise NotFound("Resource not found")

    return Response(data, status=status.HTTP_200_OK)


def _find_resource_id(asset_id: str, data_space_name: str, asset_sha256_hash: str | None):
    must = [
        {
            "nested": {
                "path": "assetRefs",
                "query": {
                    "bool": {
                        "must": [
                            {"match": {"assetRefs.assetId.keyword": asset_id}},
                            {"match": {"assetRefs.dataSpace.name.keyword": data_space_name}},
                        ]
                    }
                },
            }
        }
    ]

    if asset_sha256_hash is not None:
        must.append({"match": {"assetSha256Hash.keyword": asset_sha256_hash}})

    resp = elasticsearch_request(
        "POST",
        "_search",
        {"query": {"bool": {"must": must}}},
    )
    if resp.status_code != status.HTTP_200_OK:
        raise APIException(f"Failed to query Elasticsearch: {resp.data}")

    if (
        resp.data is None
        or "hits" not in resp.data
        or "hits" not in resp.data["hits"]
        or "total" not in resp.data["hits"]
    ):
        raise APIException("Invalid response from Elasticsearch")

    return [hit["_id"] for hit in resp.data["hits"]["hits"]]
