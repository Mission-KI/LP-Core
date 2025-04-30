import { apiUrl } from "../../common/api/config";

export const getLogs = async (dataspaceName = null, publisher = null) => {
  try {
    const token = localStorage.getItem("accessToken");

    const params = new URLSearchParams();
    if (dataspaceName) params.append("dataspace", dataspaceName);
    if (publisher) params.append("publisher", publisher);

    const url = `${apiUrl}/monitoring/logs/${params.toString() ? `?${params.toString()}` : ""}`;

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
