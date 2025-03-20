from django.contrib.auth.models import AbstractUser
from django.db import models


class Dataspace(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class User(AbstractUser):
    dataspace = models.ForeignKey(Dataspace, on_delete=models.SET_NULL, null=True, blank=True)
    is_monitoring_user = models.BooleanField(default=False)
    is_connector_user = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    class Meta:
        db_table = "user"
