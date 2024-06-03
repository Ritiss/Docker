import axios from "axios";
import LocalStorageService from "../services/LocalStorageService";

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(function (config) {
    const token = LocalStorageService.getValue("accessToken");
    if (token && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response.status === 401) {
            LocalStorageService.removeValue("accessToken");
            window.location.href = "/login";
        }
        return response;
    },
)