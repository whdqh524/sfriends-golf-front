import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import {getStore, useStore} from "./index.js";

export class RecordStore {
    records = [];
    offset = 0;
    limit = 10;
    totalCount = 0;
    selectedTab = 'MY';
    loading = false;
    hasMore = true;

    constructor() {
        makeAutoObservable(this)
    }

    clear() {
        /** @type {object[]} */
        this.records = [];
        this.offset = 0;
        this.limit = 10;
        this.totalCount = 0;
        this.hasMore = true;
    }
    clearAll() {
        this.records = [];
        this.offset = 0;
        this.limit = 10;
        this.totalCount = 0;
        this.hasMore = true;
        this.selectedTab = 'MY'
    }
    async getList(type) {
        this.loading = true;
        let baseUrl = this.selectedTab === 'ALL' ? '/round/all' : this.selectedTab === 'MY' ? '/round/me' : `/round/player`
        let userIdFilter = baseUrl === '/round/player' ? `userId=${this.selectedTab}&` : '';
        const url = `${baseUrl}?${userIdFilter}type=${type}&offset=${this.offset}&limit=${this.limit}`;
        const response = await axios.get(url);
        const {rounds, count} = response.data.data;
        const map = new Map();
        [...this.records, ...rounds].forEach(item => {
            map.set(item.id, item)
        })

        this.records = Array.from(map.values())
        this.totalCount = count;
        this.loading = false;
        this.hasMore = this.records.length < count;
    }

    setOffset(offset) {
        this.offset = offset;
    }

    setSelectedTab(tab) {
        this.selectedTab = tab;
    }

    setLoading(loading) {
        this.loading = loading;
    }

    setHasMore(hasMore) {
        this.hasMore = hasMore;
    }
}

export const useRecordStore = () => {
    return useStore().recordStore;
}

export const getRecordStore = () => {
    return getStore().recordStore;
}
