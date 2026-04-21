import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/v1",
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(config => {
    config.headers['x-auth-token'] = localStorage.getItem('token');
    return config;
});

export default axiosInstance;