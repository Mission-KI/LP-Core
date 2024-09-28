import { elasticURL, elasticUsername, elasticPassword } from "./config";

export const getDatasets = async () => {

    try {

        const base64Credentials = btoa(`${elasticUsername}:${elasticPassword}`);

        const response = await fetch(elasticURL + '/_search', {
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

}