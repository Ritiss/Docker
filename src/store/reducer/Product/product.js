import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from "../../../api/Api";
import {axiosClient} from "../../../common/axios";

const initialState = {
    products: []
    
};

export const asyncLoadProducts = createAsyncThunk(
    "asyncLoadProducts",
    async () => {
        const response = await axiosClient.get(Api.endpoints.GET_PRODUCTS);
        return response.data;
    }
)

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => (
        builder.addCase(asyncLoadProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    )
})

export const {
} = productsSlice.actions;

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;

