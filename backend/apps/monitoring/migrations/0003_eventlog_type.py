# Generated by Django 5.1.6 on 2025-03-16 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0002_alter_eventlog_requested_url_alter_eventlog_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventlog',
            name='type',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
