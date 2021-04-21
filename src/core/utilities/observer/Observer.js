class Observer {
    constructor() {
        this.events = {};

        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
    }

    /**
     * @method on
     * @param eventName {string}
     * @param callback {Function}
     * @returns {Observer}
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);

        return this;
    }

    /**
     * @method off
     * @param eventName {string}
     * @param callback {Function}
     * @returns {Observer}
     */
    off(eventName, callback) {
        let event = this.events[eventName];

        if (event) {
            this.events[eventName] = event.filter((func) => func !== callback);
        }

        return this;
    }

    /**
     * @method trigger
     * @param eventNames {string}
     * @param args {Array}
     * @returns {Observer}
     */
    trigger(eventNames, ...args) {
        eventNames.split(" ").forEach((eventName) => {
            if (this.events[eventName]) {
                this.events[eventName].forEach((callback) => callback(...args));
            }
        });

        return this;
    }

    /**
     * @method installTo
     * @param obj {Object}
     * @returns {Observer}
     */
    installTo(obj) {
        obj.on = this.on;
        obj.off = this.off;

        return this;
    }
}

export default Observer;
