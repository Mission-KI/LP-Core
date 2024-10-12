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
                    bool: {
                        should: [
                            { match_phrase: { name: values[0] } },
                            { match_phrase: { 'description': values[0] } },
                            { match_phrase: { 'dataSpace.name': values[0] } }
                        ]
                    }
                });
            } else if (key === 'min_size') {
                const min_mb = parseFloat(values[0]);
                const min_bytes = min_mb * 1024;
                mustClauses.push({
                    range: {
                        volume: {
                            gt: min_bytes
                        }
                    }
                });
            }
            else if (key === 'max_size') {
                const max_mb = parseFloat(values[0]);
                const max_bytes = max_mb * 1024;
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
                    "query": searchTerm,
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
