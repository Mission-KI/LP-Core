from user.models import Dataspace

from ..models import EventLog


def create_log(requested, message, status=None, metadata=None, type=None, data_space=None):
    """
    Utility function to create a log entry.
    :param requested_url: The URL where the event occurred.
    :param status: The HTTP status code or custom status of the event.
    :param message: A description of the log entry.
    :param metadata: Additional data for the log entry (optional).
    :return: None
    """
    if data_space is None:
        ds_obj = requested.user.dataspace
    else:
        ds_obj = Dataspace.objects.get_or_create(name=data_space)[0]
    EventLog.objects.create(
        requested_url=requested.get_full_path(),
        status=status,
        message=message,
        metadata=metadata,
        type=type,
        dataspace=ds_obj,
    )
