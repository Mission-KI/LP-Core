# Generated by Django 5.1.5 on 2025-02-18 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventlog',
            name='requested_url',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='eventlog',
            name='status',
            field=models.CharField(default='success', max_length=50),
        ),
    ]
