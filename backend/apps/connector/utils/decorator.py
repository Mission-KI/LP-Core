import inspect
from functools import wraps

from apps.monitoring.models import EventLog
from apps.monitoring.utils.logging import create_log
from rest_framework import status
from rest_framework.response import Response


def check_connector_user_permission(event_type: str, prefix: str = ""):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            sig = inspect.signature(func)
            parameters = list(sig.parameters.keys())

            arg_index = parameters.index("request")

            if len(args) > arg_index:
                request = args[arg_index]
            elif "request" in kwargs:
                request = kwargs["request"]
            else:
                raise ValueError("Request not found in arguments")

            if not request.user.is_connector_user:
                log_prefix = prefix if prefix else f"EDP {event_type} failed"
                metadata = {"id": kwargs.get("id")} if "id" in kwargs else {}
                create_log(request, f"{log_prefix}: Permission denied", EventLog.STATUS_FAIL, metadata, event_type)
                return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

            return func(*args, **kwargs)

        return wrapper

    return decorator
