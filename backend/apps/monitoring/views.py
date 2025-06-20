from apps.monitoring.utils.logging import create_log
from django.utils.dateparse import parse_datetime
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import EventLog
from .serializers import EventLogSerializer
from .utils.analytics import get_edp_event_counts, get_elastic_monitoring_analytics


class MonitoringAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Get Monitoring Analytics",
        request=None,
        responses={200: OpenApiTypes.OBJECT},
    )
    def get(self, request):
        dataspace = request.query_params.get("dataspace")
        publisher = request.query_params.get("publisher")
        user = request.user

        if user.is_superuser:
            pass
        elif getattr(user, "is_monitoring_user", False):
            if not dataspace:
                raise ValidationError("Monitoring users must provide a dataspace.")
            if not hasattr(user, "dataspace") or user.dataspace.name != dataspace:
                raise ValidationError("You are not authorized to access this dataspace.")
        else:
            raise ValidationError("You do not have permission to access this endpoint.")

        try:
            response = get_elastic_monitoring_analytics(dataspace, publisher)
            if response.status_code != status.HTTP_200_OK:
                return response
            elastic_counts = response.data

            edp_event_counts = get_edp_event_counts(dataspace, publisher)
            filtered_by_dataspace = elastic_counts["aggregations"]["publishers_list"]["filtered_by_dataspace"]
            if dataspace:
                publishers = filtered_by_dataspace["filtered"]["publishers"]["buckets"]
            else:
                publishers = filtered_by_dataspace["publishers"]["buckets"]

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
                "publishers": publishers,
                "dataspaces": elastic_counts["aggregations"]["dataSpaces_list"]["nested_dataSpaces"]["dataSpaces"][
                    "buckets"
                ],
                "edp_event_counts": edp_event_counts,
            }

            return Response(analytics_data)

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred {e}"},
                status=500,
            )


class EventLogPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class EventLogListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = EventLogPagination

    @extend_schema(
        summary="Get Logs",
        request=None,
        responses={200: OpenApiTypes.OBJECT},
    )
    def get(self, request):
        dataspace = request.query_params.get("dataspace")
        publisher = request.query_params.get("publisher")
        status = request.query_params.get("status")
        type = request.query_params.get("type")
        period_start = request.query_params.get("period_start")
        period_end = request.query_params.get("period_end")

        user = request.user

        if user.is_superuser:
            pass
        elif getattr(user, "is_monitoring_user", False):
            if not dataspace:
                raise ValidationError("Monitoring users must provide a dataspace.")
            if not hasattr(user, "dataspace") or user.dataspace.name != dataspace:
                raise ValidationError("You are not authorized to access this dataspace.")
        else:
            raise ValidationError("You do not have permission to access this endpoint.")

        event_logs = EventLog.objects.order_by("-created_at")
        if dataspace:
            event_logs = event_logs.filter(dataspace__name=dataspace)
        if publisher:
            event_logs = event_logs.filter(metadata__assetRefs__0__publisher__name=publisher)
        if status:
            event_logs = event_logs.filter(status=status)
        if type:
            event_logs = event_logs.filter(type=type)
        if period_start:
            try:
                start_dt = parse_datetime(period_start)
                if start_dt:
                    event_logs = event_logs.filter(created_at__gte=start_dt)
            except Exception:
                raise ValidationError("Invalid format for 'period_start'. Use ISO 8601 format.")
        if period_end:
            try:
                end_dt = parse_datetime(period_end)
                if end_dt:
                    event_logs = event_logs.filter(created_at__lte=end_dt)
            except Exception:
                raise ValidationError("Invalid format for 'period_end'. Use ISO 8601 format.")

        paginator = self.pagination_class()
        paginated_logs = paginator.paginate_queryset(event_logs, request)
        serializer = EventLogSerializer(paginated_logs, many=True)
        return paginator.get_paginated_response(serializer.data)


@extend_schema(
    summary="Log EDP Download",
    request=None,
    responses={200: OpenApiTypes.OBJECT},
)
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def log_edp_download(request):
    create_log(request, "edp download", EventLog.STATUS_SUCCESS, None, EventLog.TYPE_DOWNLOAD)
    return Response({"message": "success"})
