import LocalStorage from "app/core/utilites/storage/localStorage/LocalStorage";

let localStorage = new LocalStorage();

export default {
    getInstance() {
        return localStorage;
    }
};
