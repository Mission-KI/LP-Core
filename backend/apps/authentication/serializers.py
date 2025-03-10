from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers


class ChangePasswordSerializer(serializers.Serializer):
    current_password = jwt_serializers.PasswordField(required=True)
    new_password = jwt_serializers.PasswordField(required=True)
    confirm_password = jwt_serializers.PasswordField(required=True)
