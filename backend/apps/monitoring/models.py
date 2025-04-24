from common.models import BaseModel
from django.db import models
from user.models import Dataspace


class EventLog(BaseModel):
    STATUS_SUCCESS = "success"
    STATUS_FAIL = "fail"

    TYPE_UPLOAD = "upload"
    TYPE_EDIT = "edit"
    TYPE_DELETE = "delete"
    TYPE_DOWNLOAD = "download"

    requested_url = models.CharField(max_length=100, null=True)
    status = models.CharField(max_length=50, default="success")
    type = models.CharField(max_length=50, null=True)
    message = models.TextField()
    dataspace = models.ForeignKey(Dataspace, on_delete=models.SET_NULL, null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"[{self.status}] {self.message[:50]}"
