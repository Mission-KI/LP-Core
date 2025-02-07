from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import EventLog
from .utils import create_log


@api_view(["POST"])
def log_edp_download(request):
    create_log(request.get_full_path(), "edp download", EventLog.STATUS_SUCCESS)
    return Response({"message": "success"})
