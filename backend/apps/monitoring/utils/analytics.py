from apps.search.utils.elasticsearch import elasticsearch_request


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
        },
    }

    response = elasticsearch_request(
        "POST",
        "_search",
        query,
    )

    return response
