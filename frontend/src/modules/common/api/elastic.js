import { elasticURL, elasticUsername, elasticPassword } from "./config";

export const getDatasets = async (from = 0, size = 10, params = {}) => {
    try {
        const base64Credentials = btoa(`${elasticUsername}:${elasticPassword}`);

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
            } else {
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
            "aggs": {
                "variety_ds_count": {
                    "filter": {
                        "term": {
                            "dataSpace.name.enum": "variety DS"
                        }
                    }
                }
            }
        };

        const response = await fetch(elasticURL + '/_search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Credentials}`,
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
        const base64Credentials = btoa(`${elasticUsername}:${elasticPassword}`);

        const response = await fetch(`${elasticURL}/_doc/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Credentials}`,
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
        const base64Credentials = btoa(`${elasticUsername}:${elasticPassword}`);

        const words = searchTerm.split(/\s+/);
        const wildcardQueries = words.map(word => `*${word.split('').join('*')}*`);

        const query = {
            query: {
                bool: {
                    must: wildcardQueries.map(wildcard => ({
                        wildcard: {
                            name: {
                                value: wildcard,
                                case_insensitive: true
                            }
                        }
                    }))
                }
            },
            _source: ["name"],
            size: 8
        };

        const response = await fetch(`${elasticURL}/_search`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Credentials}`,
            },
            body: JSON.stringify(query),
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData.hits.hits.map(hit => hit._source.name);
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};
