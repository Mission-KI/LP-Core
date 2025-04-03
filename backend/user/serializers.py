from rest_framework import serializers

from .models import Dataspace, User


class DataspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataspace
        fields = ["id", "name"]


class UserSerializer(serializers.ModelSerializer):
    dataspace = DataspaceSerializer(read_only=True)
    dataspace_id = serializers.PrimaryKeyRelatedField(
        queryset=Dataspace.objects.all(), source="dataspace", write_only=True, required=False, allow_null=True
    )
    password = serializers.CharField(write_only=True, required=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "dataspace",
            "dataspace_id",
            "is_monitoring_user",
            "is_connector_user",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        Create and return a new user instance, given the validated data
        """
        # Extract dataspace if provided
        dataspace = validated_data.pop("dataspace", None)

        # Create user
        user = User.objects.create_user(**validated_data)

        # Set dataspace if provided
        if dataspace:
            user.dataspace = dataspace
            user.save()

        return user
