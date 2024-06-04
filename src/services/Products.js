import {axiosClient} from "../common/axios";
import Api from "../api/Api";

export const createProduct = async (payload) => {
    try {
        const response = await axiosClient.post(Api.endpoints.ADD_PRODUCT, payload);
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


export const getProducts = async (params) => {
    try {
        let url = Api.endpoints.GET_PRODUCTS;

        if(params){
            url += "?";

            const urlScheme = new URLSearchParams();

            Object.keys(params).forEach((key) => {
                const paramsValue = params[key];
                if (paramsValue) {
                    if (Array.isArray(paramsValue)) {
                        paramsValue.map((value) => urlScheme.append(key, value));
                    } else {
                        paramsValue && urlScheme.append(key, paramsValue.toString());
                    }
                }
            });

            url += urlScheme.toString();
        }

        const response = await axiosClient.get(url);
        
        return {
            success: response.status === 200,
            data: response.data,
        }
    } catch (error) {
        return {
            success: false
        };
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

export const deleteProduct = async ({product_id}) => {
    try {
        const url = Api.endpoints.DELETE_PRODUCT.replace('{product_id}', product_id);
        
        const response = await axiosClient.post(url);

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

export const createTransaction = async (payload) => {
    try {
        const response = await axiosClient.post(Api.endpoints.CREATE_TRANSACTION, payload);
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

export const getTransaction = async ({transaction_id}) => {
    try {
        const url = Api.endpoints.GET_TRANSACTION_STATUS_BY_ID.replace('{transaction_id}', transaction_id);
        
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