import uuid

from common.models import BaseModel
from django.db import models


class ResourceStatus(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    status = models.CharField(
        max_length=20,
        choices=[
            ("created", "Created"),
            ("uploaded", "Uploaded"),
        ],
        default="created",
    )

    def __str__(self) -> str:
        return f"Resource Status: {self.status} (ID: {self.id})"
