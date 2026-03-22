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
    updateModal = {password:"", newPassword:"", confirmPassword:""}
    rounding = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    async clear() {
        this.me = undefined
        this.isLogin = false
        this.fieldRecords = [];
        this.fieldCount = 0;
        this.screenRecords = [];
        this.screenCount = 0;
        this.showRecords = [];
        this.rounding = undefined;
        this.updateModal = {password:"", newPassword:"", confirmPassword:""}
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken')

        this.user = null
        this.isLogin = false
    }

    async updatePassword() {
        await axios.patch('/user/updatePassword', {
            oldPassword: this.updateModal.password,
            newPassword: this.updateModal.newPassword,
        });
        this.updateModal = {password:"", newPassword:"", confirmPassword:""}
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

    setModalPassword(password) {
        this.updateModal.password = password;
    }

    setModalNewPassword(password) {
        this.updateModal.newPassword = password;
    }

    setModalConfirmPassword(password) {
        this.updateModal.confirmPassword = password;
    }
}

export const useUserStore = () => {
    return useStore().userStore;
}

export const getUserStore = () => {
    return getStore().userStore;
}
