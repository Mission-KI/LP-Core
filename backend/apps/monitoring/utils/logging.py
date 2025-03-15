from ..models import EventLog


def create_log(requested_url, message, status=None, metadata=None):
    """
    Utility function to create a log entry.
    :param requested_url: The URL where the event occurred.
    :param status: The HTTP status code or custom status of the event.
    :param message: A description of the log entry.
    :param metadata: Additional data for the log entry (optional).
    :return: None
    """
    EventLog.objects.create(requested_url=requested_url, status=status, message=message, metadata=metadata)
