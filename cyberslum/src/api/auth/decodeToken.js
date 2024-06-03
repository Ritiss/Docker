import axios, {AxiosError} from "axios";
import Api from "../Api";

export const decodeToken = async (token) => {
    return await axios.post(Api.endpoints.DECODE_TOKEN, token)
        .then((response => ({
            success: response.status === 200,
            userType: response.data.user_type,
            status: response.status,
        })))
        .catch((error) => ({
            success: false,
            status: error.response?.status,
        }))
}
