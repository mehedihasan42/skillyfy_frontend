import axios from "axios";

const API = axios.create({
    baseURL: "https://skillyfy-backend.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add JWT token if needed
export const setToken = (token) => {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;
