import { createContext, createElement, useContext } from "react";
import { ModalStore } from "./modalStore";
import { UserStore } from "./userStore";
import { RoundStore } from "./roundStore";
import { LoadingStore } from "./loadingStore";
import { GolfStore } from "./golfStore.js";
import { RecordStore } from "./recordStore.js";

export const StoreContext = createContext(null);

export class Store {
    modalStore;
    userStore;
    golfStore;
    roundStore;
    recordStore;
    loadingStore;

    constructor() {
        this.modalStore = new ModalStore(this);
        this.userStore = new UserStore(this);
        this.golfStore = new GolfStore(this);
        this.roundStore = new RoundStore(this);
        this.loadingStore = new LoadingStore(this);
        this.recordStore = new RecordStore(this);
    }
}

let store = new Store();

export const StoreProvider = ({ children, initialState }) => {
    if (!store) {
        store = new Store(initialState);
    }
    return createElement(StoreContext.Provider, { value: store }, children);
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used inside of StoreProvider");

    return context;
};

export const getStore = () => {
    if (!store) throw new Error("Store has not been initialized");

    return store;
};

window.getStore = getStore;
