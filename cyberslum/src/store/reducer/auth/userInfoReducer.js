import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import LocalStorageService from "../../../services/LocalStorageService";
import Api from "../../../api/Api";
import {axiosClient} from "../../../common/axios";
import camelcaseKeys from "camelcase-keys";

const initialState = {
    profile: {
        email: "",
        name: "",
    }
};

export const asyncLoadUserData = createAsyncThunk(
    "asyncLoadUserData",
    async () => {
        const response = await axiosClient.get(Api.endpoints.USER_INFO);
        return response.data;
    }
)

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.profile = {...initialState.profile}
            LocalStorageService.removeValue("accessToken");
        },
    },
    extraReducers: builder => (
        builder.addCase(asyncLoadUserData.fulfilled, (state, action) => {
            state.profile = {...camelcaseKeys(action.payload)}
        })
    )
})

export const {
    logoutUser
} = userInfoSlice.actions;

export const selectTeacher = (state) => state.teacher;

export default userInfoSlice.reducer;

