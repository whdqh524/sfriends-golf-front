// stores/authStore.ts
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";

export class GolfStore {
    data = [];

    constructor() {
        makeAutoObservable(this)
    }

    clear() {
        this.data = [];
    }

    async getList() {
        const response = await axios.get('/golf/all');
        this.data = response.data.data.golfList;
    }

    async create(name, location, courses) {
        await axios.post('/golf/all', {name, location, courses});
    }
}

export const useGolfStore = () => {
    return useStore().golfStore;
}

export const getGolfStore = () => {
    return getStore().golfStore;
}
