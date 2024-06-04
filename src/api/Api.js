import {errorParser} from "../api/errorParser/errorParser";

import {decodeToken} from "../api/auth/decodeToken";

export class ApiEndpoints {
    //Analytics
    // HOST = process.env.REACT_APP_PUBLIC_API_BASE;
    HOST = "http://localhost";
    
    UCHITEL_API = this.HOST + ":8000"; 
    // UCHITEL_API = this.HOST + "/uchitel"; 
    USER_SIGNUP = this.UCHITEL_API + "/complete-registration/user";
    LOGIN_USER = this.UCHITEL_API + "/login";
    DECODE_TOKEN = this.UCHITEL_API + "/decode-token";
    USER_INFO = this.UCHITEL_API + "/user/info";
    CHECK_RECOVERY_TOKEN_BY_EMAIL = this.UCHITEL_API + "/password-recover-by-email/check";
    
    //PRODUCTS
    ADD_PRODUCT = this.UCHITEL_API + "/add-product";
    GET_PRODUCTS = this.UCHITEL_API + "/products";
    GET_PRODUCT_BY_ID = this.UCHITEL_API + "/get-product/{product_id}";
    GET_FILTER_DATA = this.UCHITEL_API + "/get-filter-data";
    GET_USER_PRODUCTS = this.UCHITEL_API + "/get-user-ownership/{user_id}";
    CREATE_TRANSACTION = this.UCHITEL_API + "/create-checkout-session";
    GET_TRANSACTION_STATUS_BY_ID = this.UCHITEL_API + "/get-transaction-status/{transaction_id}";

    //TRANSACTIONS
    ADD_TRANSACTIONS = this.UCHITEL_API + "/transaction";
    GET_TRANSACTIONS = this.UCHITEL_API + "/user-transactions/{user_id}";

}

export class Api {
    endpoints = new ApiEndpoints();
    
    async decodeToken(token) {
        return await decodeToken(token);
    }

    getErrors(errors) {
        return errorParser(errors);
    }
}

export default new Api();
