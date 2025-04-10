from logging import Logger

from apps.monitoring.models import EventLog
from apps.monitoring.utils.logging import create_log
from rest_framework.exceptions import APIException
from rest_framework.request import Request


def handle_request_error(
    logger: Logger, request: Request, exception: Exception, id: str, event_type: str, extra_metadata: None | dict = None
):
    """
    Generic error handler for API requests.

    Args:
        request: The Django request object.
        exception: The exception instance.
        id: The resource ID related to the request.
        event_type: The type of event (e.g., EventLog.TYPE_UPLOAD, EventLog.TYPE_DELETE).
        extra_metadata: Additional metadata to include in the log (optional).

    Raises:
        APIException: Re-raises the exception as an APIException.
    """
    metadata = {"id": id}
    if extra_metadata:
        metadata.update(extra_metadata)

    if isinstance(exception, APIException):
        message = f"EDP {event_type} failed: {exception}"
        logger.error(message)
        create_log(request, message, EventLog.STATUS_FAIL, metadata, event_type)
        raise exception
    else:
        message = f"EDP {event_type} failed: An unknown error occurred ({type(exception)}): {str(exception)}"
        logger.error(message)
        create_log(request, message, EventLog.STATUS_FAIL, metadata, event_type)
        raise APIException(message)
