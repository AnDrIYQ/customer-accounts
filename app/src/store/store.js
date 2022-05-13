import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {$refreshApi, API_URL} from "../http";

export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(auth) {
        this.isAuth = auth;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('app_token', response.data.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.data.user);
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async register(email, password) {
        try {
            const response = await AuthService.register(email, password);
            localStorage.setItem('app_token', response.data.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.data.user);
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
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await $refreshApi.post('/refresh-token');
            localStorage.setItem('app_token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}