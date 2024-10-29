import { elasticURL, elasticApiKey } from "./config";

export const getDatasets = async (from = 0, size = 10, params = {}) => {
    try {

        const urlParams = new URLSearchParams(window.location.search);
        const mustClauses = [];
        const shouldClauses = [];

        for (const key of urlParams.keys()) {
            const values = urlParams.getAll(key);

            if (key === 'page') continue;

            if (key === 'q') {
                if (values[0] === '') {
                    continue;
                }

                mustClauses.push({
                    query_string: {
                        query: values[0]+'*',
                        fields: ["name", "description", "dataSpace.name", "publisher.name", "licenseId"]
                    }
                });
            }

            else if (key === 'dataTypes') {
                mustClauses.push({
                    bool: {
                        must: [
                            { terms: { 'dataTypes': values } }
                        ]
                    }
                });
            }

            else if (key === 'min_size') {
                const min_percentage = parseFloat(values[0]);
                const min_bytes = percentageToBytes(min_percentage);
                mustClauses.push({
                    range: {
                        volume: {
                            gt: min_bytes
                        }
                    }
                });
            }

            else if (key === 'max_size') {
                const max_percentage = parseFloat(values[0]);
                const max_bytes = percentageToBytes(max_percentage);
                mustClauses.push({
                    range: {
                        volume: {
                            lt: max_bytes
                        }
                    }
                });
            }

            else if (key === 'min_lines') {
                const min_lines = parseInt(values[0]);
                mustClauses.push({
                    range: {
                        'structuredDatasets.rowCount': {
                            gte: min_lines
                        }
                    }
                });
            }

            else if (key === 'max_lines') {
                const max_lines = parseInt(values[0]);
                mustClauses.push({
                    range: {
                        'structuredDatasets.rowCount': {
                            lte: max_lines
                        }
                    }
                });
            }

            else if (key === 'min_columns') {
                const min_columns = parseInt(values[0]);
                mustClauses.push({
                    range: {
                        'structuredDatasets.columnCount': {
                            gte: min_columns
                        }
                    }
                });
            }

            else if (key === 'max_columns') {
                const max_columns = parseInt(values[0]);
                mustClauses.push({
                    range: {
                        'structuredDatasets.columnCount': {
                            lte: max_columns
                        }
                    }
                });
            }

            else {
                for (const value of values) {
                    shouldClauses.push({ match: { [key]: value } });
                }
            }
        }

        const query = {
            "from": from,
            "size": size,
            "query": {
                "bool": {
                    "must": mustClauses,
                    "should": shouldClauses.length > 0 ? shouldClauses : undefined,
                }
            },
        };

        const response = await fetch(elasticURL + '/_search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${elasticApiKey}`,
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


export const getDataset = async (id) => {
    try {

        const response = await fetch(`${elasticURL}/_doc/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${elasticApiKey}`,
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
                'Authorization': `ApiKey ${elasticApiKey}`,
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
                'Authorization': `ApiKey ${elasticApiKey}`,
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
                'Authorization': `ApiKey ${elasticApiKey}`,
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