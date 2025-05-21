import { apiUrl } from "../../common/api/config";

export const getLogs = async (
  dataspaceName = null,
  publisher = null,
  page,
  type = null,
  status = null,
  period_start = null,
  period_end = null,
) => {
  try {
    const token = localStorage.getItem("accessToken");

    const params = new URLSearchParams();
    if (dataspaceName) params.append("dataspace", dataspaceName);
    if (publisher) params.append("publisher", publisher);
    if (page) params.append("page", page);
    if (type) params.append("type", type);
    if (status) params.append("status", status);
    if (period_start) params.append("period_start", period_start);
    if (period_end) params.append("period_end", period_end);

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
