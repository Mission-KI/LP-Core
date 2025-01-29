import requests
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import base64

@swagger_auto_schema(
    methods=['post'],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'query': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="Full Elasticsearch query object"
            ),
        },
        required=['query']
    )
)
@api_view(['POST'])
def search(request):
    """ Sends a raw query to Elasticsearch using requests """

    es_url = f"{settings.ELASTICSEARCH_URL}/edp-data/_search"

    auth_value = f"{settings.ELASTICSEARCH_USERNAME}:{settings.ELASTICSEARCH_PASSWORD}"
    encoded_auth_value = base64.b64encode(auth_value.encode('utf-8')).decode('utf-8')

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Basic {encoded_auth_value}",
    }

    query = request.data.get('query', {})

    try:
        response = requests.post(es_url, json=query, headers=headers)

        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response({'error': response.text}, status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
