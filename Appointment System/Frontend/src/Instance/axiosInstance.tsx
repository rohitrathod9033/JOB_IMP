import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("token");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: any) => Promise.reject(error)
);

export default axiosInstance;