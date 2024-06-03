import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from "../../../api/Api";
import {axiosClient} from "../../../common/axios";

const initialState = {
    transactions: []
    
};

export const asyncLoadTransactions = createAsyncThunk(
    "asyncLoadTransactions",
    async (id) => {
        const url = Api.endpoints.GET_TRANSACTIONS.replace('{user_id}', id);
        const response = await axiosClient.get(url);
        return response.data;
    }
)

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: builder => (
        builder.addCase(asyncLoadTransactions.fulfilled, (state, action) => {
            state.transactions = action.payload
        })
    )
})

export const {
} = transactionsSlice.actions;

export const selectTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;

