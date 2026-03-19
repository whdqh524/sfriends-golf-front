// stores/authStore.ts
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";

export class GolfStore {
    golfList = [];

    constructor() {
        makeAutoObservable(this)
    }

    async getList() {
        const response = await axios.get('/golf');
        this.golfList = response.data.golfList;
    }

    async create(name, location, courses) {
        await axios.post('/golf', {name, location, courses});
    }
}

export const useGolfStore = () => {
    return useStore().golfStore;
}

export const getGolfStore = () => {
    return getStore().golfStore;
}
