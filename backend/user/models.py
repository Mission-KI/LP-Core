# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Dataspace(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    dataspaces = models.ManyToManyField(Dataspace, blank=True)
    is_monitoring_user = models.BooleanField(default=False)
    is_connector_user = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


# Automatically create or update UserProfile when User is created or updated
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.profile.save()
