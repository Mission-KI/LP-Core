import { elasticURL } from "./config";

export const getDatasets = async (from = 0, size = 10) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const filters = [];
        const groupedFilters = {};

        for (const key of urlParams.keys()) {
            const values = urlParams.getAll(key);

            if (key === 'page') continue;

            if (key === 'q') {
                if (values[0] === '') continue;

                filters.push({
                    multi_match: {
                        query: values[0],
                        fields: ["name"],
                        type: "best_fields"
                    }
                });

            } else if (key === 'dataTypes') {
                filters.push({
                    terms: { 'dataTypes': values }
                });
            }
            else if (key === 'dataSpace.name') {
                filters.push({
                    nested: {
                        path: "assetRefs",
                        query: {
                            bool: {
                                must: [
                                    {
                                        term: {
                                            "assetRefs.dataSpace.name.keyword": values[0]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                });
            }
            else if (key === 'publisher.name') {
                filters.push({
                    nested: {
                        path: "assetRefs",
                        query: {
                            bool: {
                                must: [
                                    {
                                        term: {
                                            "assetRefs.publisher.name.keyword": values[0]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                });
            }
            else if (key === 'dataType') {
                filters.push({
                    bool: {
                        should: values.map(value => ({
                            match: { "dataTypes": value }
                        })),
                        minimum_should_match: 1
                    }
                });
            }            
            else if (key === 'license.name') {
                filters.push({
                    nested: {
                        path: "assetRefs",
                        query: {
                            bool: {
                                must: [
                                    {
                                        term: {
                                            "assetRefs.license.name.keyword": values[0]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                });
            }
            else if (key === 'min_size') {
                const min_percentage = parseFloat(values[0]);
                const min_bytes = percentageToBytes(min_percentage);
                filters.push({
                    range: {
                        volume: {
                            gt: min_bytes
                        }
                    }
                });
            } else if (key === 'max_size') {
                const max_percentage = parseFloat(values[0]);
                const max_bytes = percentageToBytes(max_percentage);
                filters.push({
                    range: {
                        volume: {
                            lt: max_bytes
                        }
                    }
                });
            } else if (key === 'min_lines') {
                const min_lines = parseInt(values[0]);
                filters.push({
                    range: {
                        'structuredDatasets.rowCount': {
                            gte: min_lines
                        }
                    }
                });
            } else if (key === 'max_lines') {
                const max_lines = parseInt(values[0]);
                filters.push({
                    range: {
                        'structuredDatasets.rowCount': {
                            lte: max_lines
                        }
                    }
                });
            } else if (key === 'min_columns') {
                const min_columns = parseInt(values[0]);
                filters.push({
                    range: {
                        'structuredDatasets.columnCount': {
                            gte: min_columns
                        }
                    }
                });
            } else if (key === 'max_columns') {
                const max_columns = parseInt(values[0]);
                filters.push({
                    range: {
                        'structuredDatasets.columnCount': {
                            lte: max_columns
                        }
                    }
                });
            } else if (key === 'hasDatetimeAttribute') {
                filters.push({
                    range: {
                        'structuredDatasets.datetimeColumnCount': {
                            gt: 0
                        }
                    }
                });
            } else if (key === 'hasTemporalFrequency') {
                filters.push({
                    exists: {
                        field: 'periodicity'
                    }
                });
            } else if (key === 'dataTypeConsistency') {
                continue
            }
            else if (key === 'significantVariance') {
                continue
            }
            else {
                if (!groupedFilters[key]) {
                    groupedFilters[key] = [];
                }
                groupedFilters[key].push(...values);
            }
        }

        for (const [key, values] of Object.entries(groupedFilters)) {
            if (key === 'freely_available') {
                filters.push({
                    terms: { [key]: [...new Set(values)] }
                });
            } else {
                filters.push({
                    terms: { [`${key}.keyword`]: [...new Set(values)] }
                });
            }
        }


        const query = {
            "from": from,
            "size": size,
            ...(filters.length > 0 ? {
                "query": {
                    "bool": {
                        "filter": filters
                    }
                }
            } : {})
            ,
            "sort": [
                "_score",
                {
                    "_script": {
                        "type": "number",
                        "script": {
                            "source": "doc['description.keyword'].size() > 0 ? 1 : 0",
                            "lang": "painless"
                        },
                        "order": "desc"
                    }
                },
                { "description.keyword": "desc" }
            ]
        };

        const response = await fetch(elasticURL + '/_search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const getFilterValues = async () => {
    try {
        const query = {
            "size": 0,
            "aggs": {
                "nested_asset_refs": {
                    "nested": { "path": "assetRefs" },
                    "aggs": {
                        "distinct_dataSpace_names": {
                            "terms": {
                                "field": "assetRefs.dataSpace.name.keyword",
                                "size": 10000
                            }
                        },
                        "distinct_license_names": {
                            "terms": {
                                "field": "assetRefs.license.name.keyword",
                                "size": 10000
                            }
                        },
                        "distinct_publisher_names": {
                            "terms": {
                                "field": "assetRefs.publisher.name.keyword",
                                "size": 10000
                            }
                        }
                    }
                },
                "max_row_count": {
                    "max": { "field": "structuredDatasets.rowCount" }
                },
                "max_column_count": {
                    "max": { "field": "structuredDatasets.columnCount" }
                },
                "distinct_dataTypes": {
                    "terms": {
                        "field": "dataTypes.keyword",
                        "size": 10000
                    }
                }
            }
        };

        const response = await fetch(elasticURL + '/_search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getDataset = async (id) => {
    try {

        const response = await fetch(`${elasticURL}/_doc/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const getAutocompleteSuggestions = async (searchTerm) => {
    try {
        const query = {
            "query": {
                "query_string": {
                    "query": `${searchTerm}*`,
                    "default_field": "name"
                }
            }
        };

        const response = await fetch(`${elasticURL}/_search`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });

        const responseData = await response.json();

        if (response.ok) {
            const uniqueSuggestions = [...new Set(responseData.hits.hits.map(hit => hit._source.name))];
            return uniqueSuggestions;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const getTotalCount = async () => {
    try {
        const response = await fetch(`${elasticURL}/_count`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData.count;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const getBookmarkedDatasets = async (from = 0, size = 10) => {
    try {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        if (bookmarks.length === 0) {
            return { hits: { hits: [] } };
        }

        const query = {
            "from": from,
            "size": size,
            "query": {
                "terms": {
                    "_id": bookmarks
                }
            }
        };

        const response = await fetch(elasticURL + '/_search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};



const percentageToBytes = (percentage) => {
    const ONE_MB = 1024 * 1024;
    const ONE_GB = 1024 * 1024 * 1024;
    const ONE_TB = 1024 * 1024 * 1024 * 1024;
    const MAX_TB = 1000 * ONE_TB;

    if (percentage <= 25) {
        return (percentage / 25) * ONE_MB;
    } else if (percentage <= 50) {
        return ONE_MB + ((percentage - 25) / 25) * (ONE_GB - ONE_MB);
    } else if (percentage <= 75) {
        return ONE_GB + ((percentage - 50) / 25) * (ONE_TB - ONE_GB);
    } else if (percentage <= 100) {
        return ONE_TB + ((percentage - 75) / 25) * (MAX_TB - ONE_TB);
    }

    return MAX_TB;
};