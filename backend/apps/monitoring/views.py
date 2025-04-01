from apps.monitoring.utils.logging import create_log
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import EventLog
from .utils.analytics import get_edp_event_counts, get_elastic_monitoring_analytics


class MonitoringAnalyticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Get Monitoring Analytics",
        request=None,
        responses={200: OpenApiTypes.OBJECT},
    )
    def get(self, request):
        if request.user.dataspace is None:
            raise ValidationError("User is not assigned to dataspace")
        dataSpaceName = request.user.dataspace.name

        try:
            response = get_elastic_monitoring_analytics(dataSpaceName)
            if response.status_code != status.HTTP_200_OK:
                return response
            elastic_counts = response.data

            edp_event_counts = get_edp_event_counts(dataSpaceName)

            analytics_data = {
                "edp_count": elastic_counts["aggregations"]["total_items"]["doc_count"],
                "publishers_count": elastic_counts["aggregations"]["unique_publishers"]["unique_publishers_count"][
                    "value"
                ],
                "original_data_count": elastic_counts["aggregations"]["total_original_data_assets"]["count"]["value"],
                "processed_data_count": elastic_counts["aggregations"]["total_processed_data_assets"]["count"]["value"],
                "refined_data_count": elastic_counts["aggregations"]["total_refined_data_assets"]["count"]["value"],
                "aiml_result_data_count": elastic_counts["aggregations"]["total_aiml_result_data_assets"]["count"][
                    "value"
                ],
                "publishers": elastic_counts["aggregations"]["publishers_list"]["publishers"]["buckets"],
                "edp_event_counts": edp_event_counts,
            }

            return Response(analytics_data)

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred {e}"},
                status=500,
            )


@extend_schema(
    summary="Log EDP Download",
    request=None,
    responses={200: OpenApiTypes.OBJECT},
)
@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def log_edp_download(request):
    create_log(request, "edp download", EventLog.STATUS_SUCCESS, None, EventLog.TYPE_DOWNLOAD)
    return Response({"message": "success"})
