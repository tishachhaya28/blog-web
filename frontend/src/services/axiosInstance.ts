import axios from "axios";

const getBaseURL = () => {
    const url = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
    if (url.endsWith("/api/v1")) return url;
    return `${url.replace(/\/$/, '')}/api/v1`;
};

const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(config => {
    config.headers['x-auth-token'] = localStorage.getItem('token');
    return config;
});

export default axiosInstance;