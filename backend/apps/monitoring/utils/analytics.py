from apps.search.utils.elasticsearch import elasticsearch_request

from ..models import EventLog


def get_elastic_monitoring_analytics(dataSpaceName: str):
    query = {
        "size": 0,
        "query": {"bool": {"filter": [{"term": {"dataSpace.name.keyword": dataSpaceName}}]}},
        "aggs": {
            "unique_publishers": {"cardinality": {"field": "publisher.name.keyword"}},
            "total_items": {"value_count": {"field": "dataSpace.name.keyword"}},
            "total_original_data_assets": {
                "filter": {"term": {"assetProcessingStatus.keyword": "Original Data"}},
                "aggs": {"count": {"value_count": {"field": "assetProcessingStatus.keyword"}}},
            },
            "total_processed_data_assets": {
                "filter": {"term": {"assetProcessingStatus.keyword": "Processed Data"}},
                "aggs": {"count": {"value_count": {"field": "assetProcessingStatus.keyword"}}},
            },
            "total_refined_data_assets": {
                "filter": {"term": {"assetProcessingStatus.keyword": "Refined Data"}},
                "aggs": {"count": {"value_count": {"field": "assetProcessingStatus.keyword"}}},
            },
            "total_aiml_result_data_assets": {
                "filter": {"term": {"assetProcessingStatus.keyword": "AI/ML Result Data"}},
                "aggs": {"count": {"value_count": {"field": "assetProcessingStatus.keyword"}}},
            },
            "publishers_list": {
                "terms": {
                    "field": "publisher.name.keyword",
                    "size": 100,
                },
                "aggs": {"asset_count": {"value_count": {"field": "publisher.name.keyword"}}},
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
    edp_events = EventLog.objects.filter(requested_url="/connector/edp/")

    edp_successfull_uploads = edp_events.filter(type=EventLog.TYPE_UPLOAD, status=EventLog.STATUS_SUCCESS).count()
    edp_failed_uploads = edp_events.filter(type=EventLog.TYPE_UPLOAD, status=EventLog.STATUS_FAIL).count()

    edp_successfull_edits = edp_events.filter(type=EventLog.TYPE_EDIT, status=EventLog.STATUS_SUCCESS).count()
    edp_failed_edits = edp_events.filter(type=EventLog.TYPE_EDIT, status=EventLog.STATUS_FAIL).count()

    edp_successfull_deletions = edp_events.filter(type=EventLog.TYPE_DELETE, status=EventLog.STATUS_SUCCESS).count()
    edp_failed_deletions = edp_events.filter(type=EventLog.TYPE_DELETE, status=EventLog.STATUS_FAIL).count()

    edp_downloads = EventLog.objects.filter(type=EventLog.TYPE_DOWNLOAD).count()

    return {
        "uploads": {"successfull": edp_successfull_uploads, "failed": edp_failed_uploads},
        "edits": {"successfull": edp_successfull_edits, "failed": edp_failed_edits},
        "deletions": {"successfull": edp_successfull_deletions, "failed": edp_failed_deletions},
        "downloads": edp_downloads,
    }
