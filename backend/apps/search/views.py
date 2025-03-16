from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException, NotFound, ValidationError
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
)
@api_view(["GET"])
@permission_classes([AllowAny])
def find(request, uuid):
    """Retrieve an EDP from Elasticsearch"""
    return elasticsearch_request("GET", f"_doc/{uuid}")


@api_view(["GET"])
@permission_classes([AllowAny])
def count(request):
    """Gets the total count of assets in Elasticsearch"""
    return elasticsearch_request("GET", "_count")


@extend_schema(
    methods=["POST"],
    request=FindResourceIDSerializer,
    responses={200: OpenApiTypes.STR, 404: "Not found"},
    summary="Find the resource ID(s) of an EDP in Elasticsearch",
    description="This endpoint can be used to find the resource ID(s) of an EDP in Elasticsearch. "
    "The result is ordered by oldest to newest EDP.",
)
@api_view(["POST"])
@permission_classes([AllowAny])
def find_resource_id(request):
    serializer = FindResourceIDSerializer(data=request.data)
    if not serializer.is_valid():
        raise ValidationError(serializer.errors)

    asset_id = serializer.validated_data.get("assetId")
    data_space_name = serializer.validated_data.get("dataSpaceName")
    data = _find_resource_id(asset_id, data_space_name)
    if len(data) != 1:
        raise NotFound("Resource not found")

    return Response(data, status=status.HTTP_200_OK)


def _find_resource_id(asset_id: str, data_space_name: str):
    must = [
        {
            "nested": {
                "path": "assetRefs",
                "query": {
                    "bool": {
                        "must": [
                            {"match": {"assetRefs.assetId": asset_id}},
                            {"match": {"assetRefs.dataSpace.name": data_space_name}},
                        ]
                    }
                },
            }
        }
    ]

    resp = elasticsearch_request(
        "POST",
        "_search",
        {"query": {"bool": {"must": must}}},
    )
    if resp.status_code != status.HTTP_200_OK:
        raise APIException("Failed to query Elasticsearch")

    if (
        resp.data is None
        or "hits" not in resp.data
        or "hits" not in resp.data["hits"]
        or "total" not in resp.data["hits"]
    ):
        raise APIException("Invalid response from Elasticsearch")

    return [hit["_id"] for hit in resp.data["hits"]["hits"]]
