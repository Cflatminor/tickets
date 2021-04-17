import _ from "lodash";

class Strings {
    constructor() {
        /**
         * @property symbolsOfTextOverflow
         * @type {string}
         */
        this.symbolsOfTextOverflow = " ...";
    }

    /**
     * @example
     *
     * var once = "Компаня",
     *     several = "Компании",
     *     many = "Компаний";
     *
     * plural(3, [once, several, many]); //"Компании"
     * plural(21, [once, several, many]); //"Компания"
     * plural(47, [once, several, many]); //"Компаний"
     *
     * @public
     * @method plural
     * @param count {number}
     * @param strings {Array}
     * @returns {string}
     */
    plural(count, strings) {
        let [once = "", several = "", many = ""] = strings,
            lastNumbers = count % 100,
            lastNumber = lastNumbers % 10,
            result = "";

        if (lastNumbers > 10 && lastNumbers < 20) {
            result = many;
        } else {
            if (lastNumber === 1) {
                result = once;
            } else if (lastNumber > 1 && lastNumber < 5) {
                result = several;
            } else {
                result = many;
            }
        }

        return result;
    }

    /**
     * @example
     * var template = "Загрузить еще {0} {1}";
     *
     * writeLine(template, 5, "товаров");// "Загрузить еще 5 товаров"
     *
     * @public
     * @method writeLine
     * @param str {string}
     * @param args {*}
     * @returns {string}
     */
    writeLine(str, ...args) {
        let result = String(str || "");

        args.forEach(function (item, i) {
            result = result.replace(`{${i}}`, item);
        });

        return result;
    }

    /**
     * @example
     * var text = "overflow text",
     *     maxCountSymbols = 3;
     *
     * clip(text, maxCountSymbols);//"over ..."
     *
     * @public
     * @method clip
     * @param str {string}
     * @param maxCount {number}
     * @returns {*}
     */
    clip(str, maxCount) {
        let result = str;

        if (_.isString(result) && result.length > maxCount) {
            result = result.slice(0, maxCount || result.length) + this.symbolsOfTextOverflow;
        }

        return result;
    }

    /**
     * @method getCurrentDateAsText
     * @returns {string} YYYY-MM-DD
     */
    getCurrentDateAsText() {
        return new Date().toISOString().slice(0, 10);
    }

    /**
     * @method formatDate
     * @param date {Date}
     * @returns {string}
     */
    formatDate(date) {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            addZero = (value) => (value < 10 ? `0${value}` : value);

        return `${addZero(day)}.${addZero(month)}.${year} ${addZero(hours)}:${addZero(minutes)}`;
    }

    /**
     * @method formatShortDate
     * @param date {Date}
     * @returns {string}
     */
    formatShortDate(date) {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            addZero = (value) => (value < 10 ? `0${value}` : value);

        return `${addZero(day)}-${addZero(month)}-${year}`;
    }
}

export default Strings;
