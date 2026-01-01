import axios from "axios";

const API__URL = import.meta.env.VITE_API_URL;

export async function registerUser(userData) {
    const response = await axios.post(`${API__URL}/user/register/`, userData);
    return response.data;
}

export async function loginUser(userData) {
    const response = await axios.post(`${API__URL}/user/login/`, userData);
    return response.data;
}
