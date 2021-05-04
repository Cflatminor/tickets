import LocalStorage from "app/core/utilities/storage/localStorage/LocalStorage";

let localStorage = new LocalStorage();

export default {
    getInstance() {
        return localStorage;
    }
};
