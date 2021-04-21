import _ from "lodash";

class Validator {
    constructor(fields, config) {
        /**
         * @example
         *
         * fields = {
         *  name: "person name"
         * }
         *
         * @property fields
         * @type {Object}
         */
        this.fields = fields;

        /**
         * @example
         *
         * config = {
         *  name: {
         *      isValid: {Function},
         *      error: {
         *          fieldName: {string},
         *          message: {string},
         *          selector: {string}
         *      }
         *  }
         * }
         *
         * @property config
         * @type {Object}
         */
        this.config = config;
    }

    /**
     * @method validate
     * @returns {{irrelevantErrors: Array, errors: Array, hasError: Function}}
     */
    validate() {
        let fields = this.fields,
            config = this.config,
            errors = [],
            selectors = [],
            error,
            isValid;

        Object.keys(fields).forEach(function (key) {
            if (config.hasOwnProperty(key)) {
                isValid = config[key].isValid;

                if (_.isFunction(isValid) && !isValid(fields[key])) {
                    error = {};

                    error[key] = {
                        error: _.merge({}, config[key].error)
                    };

                    errors.push(error);
                } else {
                    selectors.push(config[key].error.selector);
                }
            }
        });

        return {
            /**
             * @property irrelevantErrors
             * @type {Array}
             */
            irrelevantErrors: selectors,
            /**
             * @property errors
             * @type {Array}
             */
            errors,
            /**
             * @method hasError
             * @returns {boolean}
             */
            hasError() {
                return this.errors.length > 0;
            },
            /**
             * @method getErrors
             * @returns {Array}
             */
            getErrors() {
                let result = [];

                this.errors.forEach(function (item) {
                    Object.keys(item).forEach(function (key) {
                        result.push(item[key].error);
                    });
                });

                return result;
            }
        };
    }
}

/**
 * @method showErrorMessages
 * @param errors {Array}
 * @param [parentElement] {HTMLElement}
 * @returns {void}
 */
Validator.showErrorMessages = function (errors, parentElement) {
    errors.forEach(function (error) {
        let element = !parentElement ?
            document.querySelector(error.selector) :
            parentElement.querySelector(error.selector);

        if (element) {
            element.innerText = error.message;
        }
    });
};

/**
 * @method toggleValidateErrors
 * @param validationReport {Object}
 * @param [parentElement] {HTMLElement}
 * @returns {Object}
 */
Validator.toggleValidateErrors = function (validationReport, parentElement) {
    let selector = (validationReport.irrelevantErrors || []).join(","),
        elements = [];

    if (selector) {
        elements = !parentElement ? document.querySelectorAll(selector) : parentElement.querySelectorAll(selector);
    }

    Array.from(elements).forEach(function (item) {
        item.innerText = "";
    });

    if (validationReport.hasError()) {
        Validator.showErrorMessages(validationReport.getErrors(), parentElement);
    }

    return this;
};

export default Validator;
