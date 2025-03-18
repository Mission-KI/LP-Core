import { elasticURL } from "./config";
import { fetchJSON } from "./http";

export const getTotalDatasetCount = async () => {
    const responseData = await fetchJSON(`${elasticURL}/_count`, { method: 'POST' });
    return responseData.count;
};

export const getAttributeCounts = async () => {
    const requestBody = {
        size: 0,
        aggs: {
            unique_data_spaces: { cardinality: { field: "dataSpace.name.keyword" } },
            unique_publishers: { cardinality: { field: "publisher.name.keyword" } }
        }
    };

    const responseData = await fetchJSON(`${elasticURL}/_search`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });

    return {
        dataSpaceCount: responseData.aggregations.unique_data_spaces.value,
        publisherCount: responseData.aggregations.unique_publishers.value
    };
};

export const getPublisherAssetCounts = async () => {
    const requestBody = {
        "aggs": {
            "by_ds_and_pub": {
                "multi_terms": {
                    "terms": [{
                        "field": "publisher.name.keyword"
                    }, {
                        "field": "dataSpace.name.keyword"
                    }]
                }
            }
        }, "_source": ["publisher", "dataSpace"]
    };

    const responseData = await fetchJSON(`${elasticURL}/_search`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    });

    return responseData;
};
