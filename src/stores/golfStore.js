// stores/authStore.ts
import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";

export class GolfStore {
    data = [];
    register = {}
    constructor() {
        makeAutoObservable(this)
    }

    clear() {
        this.data = [];
        this.register = {};
    }

    setRegisterInfo({id, name, location, courses, mode}) {
        this.register = {
            id, name, location, courses, mode
        }
    }

    async getList() {
        const response = await axios.get('/golf/all');
        this.data = response.data.data.golfList;
    }

    async save() {
        const data = {...this.register};

        data.courses.map(course => {
            const holes = {};
            course.holes.map(hole => {
                holes[`${hole.number}`] = hole.par;
            });
            course.holes = holes;
        })
        if(data.mode === 'create') {
            await axios.post('/golf', data);
        } else {
            await axios.patch('/golf', data);
        }
        await this.getList();
        return this.data.find(golf => golf.name === data.name);
    }
}

export const useGolfStore = () => {
    return useStore().golfStore;
}

export const getGolfStore = () => {
    return getStore().golfStore;
}
