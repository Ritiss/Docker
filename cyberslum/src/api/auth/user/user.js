import Api from "../../Api";
import axios from "axios";

export const initUserRegistration = async (user) => {
    const data = {
        name: user.name,
        email: user.email,
        password: user.password,
        confirm_password: user.confirmPassword,
    }
    let response = null;
    try {
        response = await axios.post(Api.endpoints.USER_SIGNUP, data);
    } catch (e) {
        return {
            status: e.response?.status || 0,
            token: "",
            errors: [],
            email: e.response?.data.email,
            name: e.response?.data.name,

        }
    }

    return {
        status: response.status,
        token: response.data.access_token,
        errors: Api.getErrors(response),
    }
}
