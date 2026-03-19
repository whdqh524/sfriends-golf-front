import axios from "axios"
import {toast} from "react-toastify";
import {getLoadingStore} from "./stores/loadingStore";

let delayTimer = null;
const DELAY = 500;

const initializeApp = () => {

    // Setting base URL for all API request via axios
    axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL
    axios.interceptors.request.use(function (config, custom) {
        // UPDATE: Add this code to show global loading indicator
        // console.log(config)
        if (config.headers?.skipInterceptor) {
            // Interceptor를 우회
            return config;
        }
        getLoadingStore().startLoading();
        if (!delayTimer) {
            delayTimer = setTimeout(() => {
                getLoadingStore().setLoadingState(true);
            }, DELAY);
        }
        return config
    }, function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        getLoadingStore().setLoadingState(false);
        if (delayTimer) {
            clearTimeout(delayTimer);
            delayTimer = null;
        }
        return response;
    }, function (error) {
        if(error.config) {
            getLoadingStore().setLoadingState(false);
            if (delayTimer) {
                clearTimeout(delayTimer);
                delayTimer = null;
            }
        }
        let errorData = {code: error.code, message: error.message};
        if (error.response.status === 400) {
            errorData = {code: error.response.data.error.code, message: error.response.data.error.message};
            if (['AUTH_TOKEN_EXPIRED', 'NOT_EXIST_AUTH_TOKEN'].includes(errorData.code)) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
        }
        toast(errorData.message);
        return Promise.reject(errorData);
    });
    if (!import.meta.env.MODE || import.meta.env.MODE === 'development') {
        axios.defaults.baseURL = import.meta.env.VITE_DEV_SERVER_URL
    }
}

export default initializeApp
