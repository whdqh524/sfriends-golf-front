import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";

export class RoundStore {

    constructor() {
        makeAutoObservable(this)
    }

    async getGolfAll() {
        const response = await axios.get('/golf/all')
    }

    async create() {

    }
}

export const useRoundStore = () => {
    return useStore().roundStore;
}

export const getRoundStore = () => {
    return getStore().roundStore;
}
