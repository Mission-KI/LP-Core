from django.core.validators import FileExtensionValidator
from rest_framework import serializers


class MultipartFormDataUploadSerializer(serializers.Serializer):
    file = serializers.FileField(
        required=True,
        help_text="EDP ZIP file",
        use_url=False,
        validators=[FileExtensionValidator(allowed_extensions=["zip"])],
    )
