// stores/authStore.ts
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";

export class RoundStore {
    currentRound = null
    currentHole = 0
    strokeRecords = [];
    moneyRecords = [];

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
