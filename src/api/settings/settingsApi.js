import { createApi } from '@reduxjs/toolkit/query'
import Api from "../Api";
import { baseQueryAuth } from "../../services/ApiService";

export const settingsApi = createApi({
    reducerPath: "settingsApi",
    baseQuery: baseQueryAuth,
    endpoints: (builder) => ({
        getSettingsData: builder.query({
            query: () => ({
                url: Api.endpoints.USER_INFO,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetSettingsDataQuery,

} = settingsApi;