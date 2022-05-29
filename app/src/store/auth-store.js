import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { $refreshApi } from "../http";

export default class AuthStore {
    // Fields
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Mutations
    setAuth(auth) {
        this.isAuth = auth;
    }

    setUser(user) {
        this.user = user;
    }

    // Actions (async)
    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('app_token', response.data.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.data);
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async register(email, password, username, bio) {
        try {
            const response = await AuthService.register(email, password, username, bio);
            console.log(response);
            localStorage.setItem('app_token', response.data.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.data);
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('app_token');
            this.setAuth(false);
            this.setUser({});
            window.EVENT_BUS.disconnect();
            window.EVENT_BUS = null
            console.log(`Disconnected => ` + window.EVENT_BUS)
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await $refreshApi.post('/refresh-token');
                localStorage.setItem('app_token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data);
                resolve(response.data)
            } catch (e) {
                window.notifications.serverError(e);
                localStorage.removeItem('app_token');
                reject(e.response?.data?.message);
            }
        })
    }
}