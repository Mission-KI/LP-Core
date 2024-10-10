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
            } else if (key === 'min_size') {
                const min_mb = parseFloat(values[0]);
                const min_bytes = min_mb * 1024 * 1024;
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
                const max_bytes = max_mb * 1024 * 1024;
                mustClauses.push({
                    range: {
                        volume: {
                            lt: max_bytes
                        }
                    }
                });
            }
            // else if (key === 'min_lines') {
            //     const min_lines = parseInt(values[0]); // Convert the first URL parameter value to an integer
            //     mustClauses.push({
            //         script: {
            //             script: {
            //                 source: `
            //                     if (doc.containsKey('datasets') && doc['datasets'].size() > 0) {
            //                         // Access the 'datasets' object directly
            //                         def datasetsObj = doc['datasets'];
            //                         if (datasetsObj.containsKey('rowCount')) {
            //                             return datasetsObj['rowCount'] > params.minLines; // Compare rowCount to minLines
            //                         }
            //                     } 
            //                     return false; // Return false if conditions are not met
            //                 `,
            //                 params: {
            //                     minLines: min_lines // Pass the min_lines value as a parameter
            //                 }
            //             }
            //         }
            //     });
            // }

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
            const uniqueSuggestions = [...new Set(responseData.hits.hits.map(hit => hit._source.name))];
            return uniqueSuggestions;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};
