import { apiUrl } from "../common/api/config";

export const getAnalytics = async (publisher = null) => {
    try {
        const token = localStorage.getItem("accessToken");

        let url = `${apiUrl}/monitoring/analytics/`;
        if (publisher) {
            url += `?publisher=${encodeURIComponent(publisher)}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
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
