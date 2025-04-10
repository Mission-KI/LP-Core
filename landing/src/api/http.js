const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchJSON = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${response.statusText} - ${JSON.stringify(responseData)}`,
      );
    }

    return responseData;
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
};
