import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";

export class RoundStore {
    records = [];
    offset = 0;
    limit = 10;
    totalCount = 0;

    constructor() {
        makeAutoObservable(this)
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
