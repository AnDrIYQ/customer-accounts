import {makeAutoObservable} from "mobx";

class HomeStore {
    // Fields
    userName = 'Admin';

    constructor() {
        makeAutoObservable(this);
    }

    // Mutations

    // Actions (async)
}

export default HomeStore;