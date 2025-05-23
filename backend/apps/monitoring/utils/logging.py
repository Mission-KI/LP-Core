from ..models import EventLog


def create_log(requested, message, status=None, metadata=None, type=None):
    """
    Utility function to create a log entry.
    :param requested_url: The URL where the event occurred.
    :param status: The HTTP status code or custom status of the event.
    :param message: A description of the log entry.
    :param metadata: Additional data for the log entry (optional).
    :return: None
    """
    EventLog.objects.create(
        requested_url=requested.get_full_path(),
        status=status,
        message=message,
        metadata=metadata,
        type=type,
        dataspace=requested.user.dataspace,
    )
