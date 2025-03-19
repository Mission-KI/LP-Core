from datetime import timedelta

from apps.search.utils.elasticsearch import elasticsearch_request
from django.db.models import Count
from django.db.models.functions import TruncMonth
from django.utils.timezone import now

from ..models import EventLog


def get_elastic_monitoring_analytics(dataSpaceName: str):
    query = {
        "size": 0,
        "query": {
            "nested": {
                "path": "assetRefs",
                "query": {"bool": {"filter": [{"term": {"assetRefs.dataSpace.name.keyword": dataSpaceName}}]}},
            }
        },
        "aggs": {
            "unique_publishers": {
                "nested": {"path": "assetRefs"},
                "aggs": {"unique_publishers_count": {"cardinality": {"field": "assetRefs.publisher.name.keyword"}}},
            },
            "total_items": {
                "nested": {"path": "assetRefs"},
                "aggs": {"count": {"value_count": {"field": "assetRefs.dataSpace.name.keyword"}}},
            },
            "total_original_data_assets": {
                "nested": {"path": "assetRefs"},
                "aggs": {
                    "filtered": {
                        "filter": {"term": {"assetRefs.assetProcessingStatus.keyword": "Original Data"}},
                        "aggs": {"count": {"value_count": {"field": "assetRefs.assetProcessingStatus.keyword"}}},
                    }
                },
            },
            "total_processed_data_assets": {
                "nested": {"path": "assetRefs"},
                "aggs": {
                    "filtered": {
                        "filter": {"term": {"assetRefs.assetProcessingStatus.keyword": "Processed Data"}},
                        "aggs": {"count": {"value_count": {"field": "assetRefs.assetProcessingStatus.keyword"}}},
                    }
                },
            },
            "total_refined_data_assets": {
                "nested": {"path": "assetRefs"},
                "aggs": {
                    "filtered": {
                        "filter": {"term": {"assetRefs.assetProcessingStatus.keyword": "Refined Data"}},
                        "aggs": {"count": {"value_count": {"field": "assetRefs.assetProcessingStatus.keyword"}}},
                    }
                },
            },
            "total_aiml_result_data_assets": {
                "nested": {"path": "assetRefs"},
                "aggs": {
                    "filtered": {
                        "filter": {"term": {"assetRefs.assetProcessingStatus.keyword": "AI/ML Result Data"}},
                        "aggs": {"count": {"value_count": {"field": "assetRefs.assetProcessingStatus.keyword"}}},
                    }
                },
            },
            "publishers_list": {
                "nested": {"path": "assetRefs"},
                "aggs": {
                    "publishers": {
                        "terms": {"field": "assetRefs.publisher.name.keyword", "size": 100},
                        "aggs": {"asset_count": {"value_count": {"field": "assetRefs.publisher.name.keyword"}}},
                    }
                },
            },
        },
    }

    response = elasticsearch_request(
        "POST",
        "_search",
        query,
    )

    return response.data


def get_edp_event_counts(dataSpaceName: str):
    edp_events = EventLog.objects

    edp_successfull_uploads = edp_events.filter(type=EventLog.TYPE_UPLOAD, status=EventLog.STATUS_SUCCESS).count()
    edp_failed_uploads = edp_events.filter(type=EventLog.TYPE_UPLOAD, status=EventLog.STATUS_FAIL).count()

    edp_successfull_edits = edp_events.filter(type=EventLog.TYPE_EDIT, status=EventLog.STATUS_SUCCESS).count()
    edp_failed_edits = edp_events.filter(type=EventLog.TYPE_EDIT, status=EventLog.STATUS_FAIL).count()

    edp_successfull_deletions = edp_events.filter(type=EventLog.TYPE_DELETE, status=EventLog.STATUS_SUCCESS).count()
    edp_failed_deletions = edp_events.filter(type=EventLog.TYPE_DELETE, status=EventLog.STATUS_FAIL).count()

    edp_downloads = EventLog.objects.filter(type=EventLog.TYPE_DOWNLOAD).count()

    current_month = now().replace(day=1)
    months_list = [(current_month - timedelta(days=30 * i)).strftime("%m/%Y") for i in range(11, -1, -1)]

    downloads_by_month = {month: 0 for month in months_list}
    uploads_by_month = {month: 0 for month in months_list}

    twelve_months_ago = current_month - timedelta(days=365)

    downloads_per_month = (
        EventLog.objects.filter(type=EventLog.TYPE_DOWNLOAD, created_at__gte=twelve_months_ago)
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    for entry in downloads_per_month:
        month_str = entry["month"].strftime("%m/%Y")
        downloads_by_month[month_str] = entry["count"]

    uploads_per_month = (
        EventLog.objects.filter(type=EventLog.TYPE_UPLOAD, created_at__gte=twelve_months_ago)
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    for entry in uploads_per_month:
        month_str = entry["month"].strftime("%m/%Y")
        uploads_by_month[month_str] = entry["count"]

    return {
        "uploads": {
            "successfull": edp_successfull_uploads,
            "failed": edp_failed_uploads,
        },
        "edits": {"successfull": edp_successfull_edits, "failed": edp_failed_edits},
        "deletions": {"successfull": edp_successfull_deletions, "failed": edp_failed_deletions},
        "downloads": edp_downloads,
        "downloads_per_month": downloads_by_month,
        "uploads_per_month": uploads_by_month
    }
