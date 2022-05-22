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
    config.headers.ContentType = `multipart/form-data`;
    return config;
})

$api.interceptors.response.use(config => {
    return config;
},  async (error) => {
    let originalRequest;
    try {
        originalRequest = error.config();
    } catch (e) {
        return null;
    }
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $refreshApi.post('/refresh-token');
            localStorage.setItem('app_token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch(e) {
            console.log("Not authorized")
        }
    }
})

export default $api;