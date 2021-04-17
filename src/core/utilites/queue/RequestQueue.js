import _ from "lodash";

import Queue from "app/core/utilites/queue/Queue";

class RequestQueue {
    constructor() {
        /**
         * @property pending
         * @type {boolean}
         */
        this.pending = false;

        /**
         * @property successQueue
         * @type {Queue}
         */
        this.successQueue = new Queue();

        /**
         * @property errorQueue
         * @type {Queue}
         */
        this.errorQueue = new Queue();
    }

    /**
     * @method isPending
     * @returns {boolean}
     */
    isPending() {
        return this.pending;
    }

    /**
     * @method toPending
     * @returns {RequestQueue}
     */
    toPending() {
        this.pending = true;

        return this;
    }

    /**
     * @public
     * @method addSuccess
     * @param callback {Function}
     * @returns {RequestQueue}
     */
    addSuccess(callback) {
        if (_.isFunction(callback)) {
            this.successQueue.add(callback);
        }

        return this;
    }

    /**
     * @public
     * @method addError
     * @param callback {Function}
     * @returns {RequestQueue}
     */
    addError(callback) {
        if (_.isFunction(callback)) {
            this.errorQueue.add(callback);
        }

        return this;
    }

    /**
     * @public
     * @method success
     * @param argumentsArray {Array}
     * @returns {RequestQueue}
     */
    success(argumentsArray) {
        this.successQueue.fire(argumentsArray);

        return this;
    }

    /**
     * @public
     * @method success
     * @param argumentsArray {Array}
     * @returns {RequestQueue}
     */
    error(argumentsArray) {
        this.errorQueue.fire(argumentsArray);

        return this;
    }

    /**
     * @public
     * @method clear
     * @returns {Queue}
     */
    clear() {
        this.pending = false;

        this.successQueue.clear();
        this.errorQueue.clear();

        return this;
    }
}

export default RequestQueue;
