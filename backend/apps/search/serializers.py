from rest_framework import serializers


class SearchSerializer(serializers.Serializer):
    query = serializers.JSONField(required=True, help_text="Full Elasticsearch query object")


class FindResourceIDSerializer(serializers.Serializer):
    assetId = serializers.CharField(required=True, help_text="Asset ID identifying the EDP in the dataSpace")
    dataSpaceName = serializers.CharField(required=True, help_text="Name of the dataSpace used to publish the EDP")
    assetSha256Hash = serializers.CharField(required=False, help_text="Cryptographic sha-256 hash of the asset")
