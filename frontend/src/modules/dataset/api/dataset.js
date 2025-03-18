import { apiUrl } from "../../common/api/config";

export const notifyEdpDownloadEvent = async () => {
    try {
        const url = `${apiUrl}/monitoring/log-edp-download/`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
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
