import { apiUrl } from "../../common/api/config";

export const login = async (user) => {
  try {
    const response = await fetch(apiUrl + "/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.detail || "Login failed");
    }

    return responseData;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
