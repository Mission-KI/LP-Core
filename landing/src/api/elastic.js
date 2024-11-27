import { elasticURL, elasticApiKey } from "./config";

export const getTotalDatasetCount = async () => {
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