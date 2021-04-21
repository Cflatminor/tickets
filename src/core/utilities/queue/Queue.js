import _ from "lodash";

class Queue {
    constructor() {
        /**
         * @property queue
         * @type {Array}
         */
        this.queue = [];
    }

    /**
     * @public
     * @method add
     * @param callback {Function}
     * @returns {Queue}
     */
    add(callback) {
        if (_.isFunction(callback)) {
            this.queue.push(callback);
        }

        return this;
    }

    /**
     * @public
     * @method fire
     * @param argumentsArray {Array}
     * @param [context] {Object}
     * @returns {Queue}
     */
    fire(argumentsArray, context) {
        while (this.queue.length > 0) {
            this.queue.shift().apply(
                context || null,
                _.isArray(argumentsArray) ? argumentsArray : [argumentsArray]
            );
        }

        return this;
    }

    /**
     * @public
     * @method getSize
     * @return {number}
     */
    getSize() {
        return this.queue.length;
    }

    /**
     * @public
     * @method clear
     * @returns {Queue}
     */
    clear() {
        this.queue.length = 0;

        return this;
    }
}

export default Queue;
