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
                mustClauses.push({ match: { name: values[0] } });
            } else if (key === 'dataspace') {
                for (const value of values) {
                    shouldClauses.push({ match: { 'dataSpace.name': value } });
                }
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
                    "minimum_should_match": 1
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

export const searchSuggestions = async (id) => {
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