import { elasticURL } from "./config";
import { fetchJSON } from "./http";

export const getTotalDatasetCount = async () => {
    const responseData = await fetchJSON(`${elasticURL}/_count`, { method: 'GET' });
    return responseData.count;
};

export const getAttributeCounts = async () => {
    const requestBody = {
        "size": 0,
        "aggs": {
            "unique_data_spaces": {
                "nested": { "path": "assetRefs" },
                "aggs": {
                    "count": { "cardinality": { "field": "assetRefs.dataSpace.name.keyword" } }
                }
            },
            "unique_publishers": {
                "nested": { "path": "assetRefs" },
                "aggs": {
                    "count": { "cardinality": { "field": "assetRefs.publisher.name.keyword" } }
                }
            }
        }
    };

    const responseData = await fetchJSON(`${elasticURL}/_search`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });

    return {
        dataSpaceCount: responseData.aggregations.unique_data_spaces.count.value,
        publisherCount: responseData.aggregations.unique_publishers.count.value
    };
};


export const getPublisherAssetCounts = async () => {
    const requestBody = {
        "size": 0,
        "aggs": {
            "by_ds_and_pub": {
                "nested": { "path": "assetRefs" },
                "aggs": {
                    "multi_terms_agg": {
                        "multi_terms": {
                            "terms": [
                                { "field": "assetRefs.publisher.name.keyword" },
                                { "field": "assetRefs.dataSpace.name.keyword" }
                            ],
                            "size": 100
                        }
                    }
                }
            }
        },
        "_source": ["assetRefs.publisher", "assetRefs.dataSpace"]
    };

    const responseData = await fetchJSON(`${elasticURL}/_search`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });

    return responseData;
};
