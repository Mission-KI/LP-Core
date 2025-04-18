# Generated by Django 5.1.5 on 2025-02-24 12:07

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ResourceStatus",
            fields=[
                ("created_at", models.DateTimeField(auto_now=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[("created", "Created"), ("uploaded", "Uploaded")],
                        default="created",
                        max_length=20,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
