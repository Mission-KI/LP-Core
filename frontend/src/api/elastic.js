import { elasticURL, elasticUsername, elasticPassword } from "./config";

export const getDatasets = async (from = 0, size = 10, params = {}) => {
    try {
        const base64Credentials = btoa(`${elasticUsername}:${elasticPassword}`);

        const mustClauses = [];

        for (const [key, value] of Object.entries(params)) {
            if (key === 'page') continue;

            if (key === 'q') {
                if(value == ''){
                    continue
                }
                mustClauses.push({ match: { name: value } });
            } else if (key === 'dataspace') {
                mustClauses.push({ match: { 'dataSpace.name': value } });
            } else {
                mustClauses.push({ match: { [key]: value } });
            }
        }

        const query = {
            "from": from,
            "size": size,
            "query": mustClauses.length > 0 ? {
                "bool": {
                    "must": mustClauses
                }
            } : {
                "match_all": {}
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