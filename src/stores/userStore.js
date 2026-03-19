// stores/authStore.ts
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import Cookies from 'js-cookie'
import {getStore, useStore} from "./index.js";

export class UserStore {
    me = null
    isLogin = false
    fieldRecords = [];
    screenRecords = [];

    constructor() {
        makeAutoObservable(this)
    }

    async signIn(userId, password) {
        try {
            const loginResponse = await axios.post('/user/signIn', {
                userId,
                password
            })

            const { refreshToken, user } = loginResponse.data
            // refreshToken → localStorage
            localStorage.setItem('refreshToken', refreshToken)
            this.user = user;
            this.isLogin = true;
            const recordResponse = await axios.post('/round/me', {

            })

        } catch (err) {
            console.log(err)
        }
    }

    async signUp(userId, password, name) {
        try {
            const {refreshToken} = await axios.post('/user/signUp', {
                userId, password, name
            });
        } catch (e) {
            console.log(e);
        }
    }

    logout() {
        Cookies.remove('accessToken')
        localStorage.removeItem('refreshToken')

        this.user = null
        this.isLogin = false
    }

    async refresh() {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) return

        try {
            const res = await axios.post('/user/signInByRefreshToken', {
                refreshToken
            })

            this.user = res.data.user;

        } catch (err) {
            console.log(err);
            this.logout()
        }
    }
}

export const useUserStore = () => {
    return useStore().userStore;
}

export const getUserStore = () => {
    return getStore().userStore;
}
