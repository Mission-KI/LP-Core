from common.models import BaseModel
from django.db import models

class EventLog(BaseModel):

    STATUS_CHOICES = [
        ('SUCCESS', 'success'),
        ('FAIL', 'fail'),
    ]
    
    requested_url = models.CharField(max_length=50, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='SUCCESS')
    message = models.TextField()
    metadata = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"[{self.status}] {self.message[:50]}"
