// stores/authStore.ts
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import Cookies from 'js-cookie'
import {getStore, useStore} from "./index.js";

/**
 * @typedef {object} User
 * @property {string} cellphone
 * @property {string} name
 * @property {number} fieldHandy
 * @property {number} screenHandy
 */


export class UserStore {
    /** @type {User} */
    me = undefined
    isLogin = false
    fieldRecords = [];
    fieldCount = 0;
    screenRecords = [];
    screenCount = 0;
    showRecords = [];
    rounding = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    async signIn(cellphone, password) {
        const loginResponse = await axios.post('/user/signIn', {
            cellphone,
            password
        })

        const { accessToken, refreshToken, user } = loginResponse.data.data
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.me = user;
        this.isLogin = true;
    }

    async signInWithToken() {
        const loginResponse = await axios.post('/user/signInWithToken');
        const { accessToken, refreshToken, user } = loginResponse.data.data
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.me = user;
        this.isLogin = true;
    }

    async getCurrentRecord() {
        const recordResponse = await axios.get('/round/current');
        this.fieldRecords = recordResponse.data.data.field.records;
        this.fieldCount = recordResponse.data.data.field.count;
        this.screenRecords = recordResponse.data.data.screen.records;
        this.screenCount = recordResponse.data.data.screen.count;
    }

    setShowRecord(tab) {
        if(tab === 'FIELD') {
            this.showRecords = this.fieldRecords;
        } else {
            this.showRecords = this.screenRecords;
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
