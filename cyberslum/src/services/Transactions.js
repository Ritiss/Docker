import {axiosClient} from "../common/axios";
import Api from "../api/Api";

export const createTransaction = async (payload) => {
    try {
        const response = await axiosClient.post(Api.endpoints.ADD_TRANSACTIONS, payload);
        return {
            success: response.status === 200,
            data: response.data,
            response: response,
        }
    } catch (e) {
        return {
            success: false,
            response: e.response,
        }
    }
}

export const getProductById = async ({product_id}) => {
    try {
        const url = Api.endpoints.GET_PRODUCT_BY_ID.replace('{product_id}', product_id);
        
        const response = await axiosClient.get(url);

        return {
            success: response.status === 200,
            data: response.data,
            response: response,
        }
    } catch (e) {
        return {
            success: false,
            response: e.response,
        }
    }
}