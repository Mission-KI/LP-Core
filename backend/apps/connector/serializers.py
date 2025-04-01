from django.core.validators import FileExtensionValidator
from rest_framework.serializers import FileField, Serializer


class MultipartFormDataUploadSerializer(Serializer):
    file = FileField(
        required=True,
        help_text="EDP ZIP file",
        use_url=False,
        validators=[FileExtensionValidator(allowed_extensions=["zip"])],
    )
