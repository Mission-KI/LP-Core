from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from rest_framework import permissions
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.response import Response

from .models import EventLog
from .utils import create_log


class HasAddEventLogPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        content_type = ContentType.objects.get_for_model(EventLog)
        permission = Permission.objects.get(
            codename="add_eventlog",  # or change_eventlog, delete_eventlog, add_eventlog.
            content_type=content_type,
        )
        full_permission_string = f"{EventLog._meta.app_label}.{permission.codename}"
        return request.user.has_perm(full_permission_string)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated, HasAddEventLogPermission])
def log_edp_download(request):
    create_log(request.get_full_path(), "edp download", EventLog.STATUS_SUCCESS)
    return Response({"message": "success"})
