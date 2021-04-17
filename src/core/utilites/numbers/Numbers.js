class Numbers {
    /**
     * @example
     * var number = 1;
     * this.addLeadingZero(number);//01
     * this.addLeadingZero(elements.$BirthDateDay.val());//01
     * if number < 10 added first 0 to in your number
     *
     * @method addLeadingZero
     * @param value {number}
     * @returns {string}
     */
    addLeadingZero(value) {
        return Number(value) < 10 ? `0${value}` : `${value}`;
    }

    /**
     * @example
     * var value = 1000000;
     *
     * this.toLocaleString(value);//1 000 000
     *
     * @method toLocaleString
     * @param value {Number|String}
     * @returns {string}
     */
    toLocaleString(value/*, format = "en-US"*/) {
        let result = Number(value);

        if (result) {
            result = result
                .toLocaleString();
            //.toLocaleString(format);
            // .replace(/\,/g, " ")
            // .replace(".", ",");
        }

        return result || value;
    }

    /**
     * @method round
     * @param value {number}
     * @param [preciseness] {number}
     * @returns {number}
     */
    round(value, preciseness) {
        let currentPreciseness = Number(preciseness) || 100;

        return Math.round((Number(value) || 0) * currentPreciseness) / currentPreciseness;
    }
}

export default Numbers;
