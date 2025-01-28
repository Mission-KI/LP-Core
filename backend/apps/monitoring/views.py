from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import create_log
from .models import EventLog


@api_view(["POST"])
def log_edp_download(request):
    create_log(request.get_full_path(), "edp download", EventLog.STATUS_SUCCESS)
    return Response({"message": "success"})
