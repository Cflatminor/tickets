import _ from "lodash";

class LocalStorage {
    constructor() {
        // TODO for ssr
        this.storage = {
            setItem() {},
            getItem() {
                return "";
            },
            removeItem() {},
            clear() {}
        };

        this._setStorageForBrowserEnvironment();
    }

    /**
     * @method _setStorageForBrowserEnvironment
     * @private
     */
    _setStorageForBrowserEnvironment() {
        if (typeof window !== 'undefined') {
            this.storage = window.localStorage;
        }
    }

    /**
     * @method setItem
     * @param name {string}
     * @param value {*}
     * @returns {LocalStorage}
     */
    setItem(name, value) {
        if (_.isString(name)) {
            try {
                this.storage.setItem(name, JSON.stringify(value));
            } catch (err) {
                return this;
            }
        }

        return this;
    }

    /**
     * @method getItem
     * @param name {string}
     * @returns {*}
     */
    getItem(name) {
        if (_.isString(name)) {
            try {
                return JSON.parse(this.storage.getItem(name));
            } catch (err) {
                return "";
            }
        }
    }

    /**
     * @method removeItem
     * @param name {string}
     * @returns {LocalStorage}
     */
    removeItem(name) {
        if (_.isString(name)) {
            try {
                this.storage.removeItem(name);
            } catch (err) {
                return this;
            }
        }

        return this;
    }

    /**
     * @method clear
     * @return {LocalStorage}
     */
    clear() {
        try {
            this.storage.clear();
        } catch (err) {
            return this;
        }

        return this;
    }
}

export default LocalStorage;
