import axios from 'axios';

export const API_URL = `http://31.131.24.72:3300`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export const $refreshApi = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('app_token')}`
    return config;
})

$api.interceptors.response.use(config => {
    return config;
},  async (error) => {
    let originalRequest;
    try {
        originalRequest = error?.config();
    } catch (e) {
        console.log(e);
        if (error?.response?.status === 400) {
            window.notifications.validationError(error.response.data);
        }
        if (error?.response?.status === 500) {
            console.log(500)
            window.notifications.serverError(error.response.data);
        }
        return null;
    }
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $refreshApi.post('/refresh-token');
            localStorage.setItem('app_token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch(e) {
            console.log("Не авторизовано")
        }
    }
})

export default $api;