import { apiUrl } from "../common/api/config";

export const getAnalytics = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const url = `${apiUrl}/monitoring/analytics/`;

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
