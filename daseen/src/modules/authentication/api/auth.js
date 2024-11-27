import { apiUrl } from "../../common/api/config";

export const login = async (user) => {

    try {
        const response = await fetch(apiUrl+'/authentication/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.detail || 'Login failed');
        }

        return responseData;

    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const register = async (user) => {

    try {
        const response = await fetch(apiUrl+'/authentication/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json();

        if (response.ok) {
            return { success: true, message: "Registration successful" };
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const resetPassword = async (data) => {

    const token = localStorage.getItem('accessToken');

    try {
        const response = await fetch(apiUrl+'/authentication/change-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error);
        }

        return { success: true, message: responseData };

    } catch (error) {
        return { success: false, message: error.message };
    }
};

