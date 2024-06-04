import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Api from "../api/Api";
import LocalStorageService from "../services/LocalStorageService";
import localStorageService from "../services/LocalStorageService";

export const baseQuery = fetchBaseQuery({
    baseUrl: Api.endpoints.HOST,
    prepareHeaders: (headers) => {
        const token = LocalStorageService.getValue("accessToken");
        if (token) headers.set("authorization", `Bearer ${token}`)
        return headers;
    },
})

export const baseQueryAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        localStorageService.removeValue("accessToken");
        window.location.href = '/login';
    }
    return result;
}
