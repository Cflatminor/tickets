import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Algorithms {
    constructor() {
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property baseAlgorithms
         * @type {Object}
         */
        this.baseAlgorithms = {
            text: {
                isValid(text) {
                    return Boolean(text);
                },
                error: {
                    fieldName: "Текстовое поле",
                    message: this.stringsResource.validation.mustBeCompleted,
                    selector: ".error-message.error-text-field"
                }
            },
            phone: {
                isValid(phone) {
                    var pattern = /[\+38]{3}[ ][(]([0-9]{3})[)][ ]([0-9]{3})-([0-9]{2})-([0-9]{2})/i;

                    return pattern.test(phone) || (/\+38\d{10}/i).test(phone);
                },
                error: {
                    fieldName: "Номер телефона",
                    message: this.stringsResource.validation.enterCorrectPhoneNumber,
                    selector: ".error-message.error-phone-field"
                }
            },
            email: {
                isValid(email) {
                    return (/^\w+[\+\.\w\-]*@([\w\-]+\.)*\w+[\w\-]*\.([a-z]{2,4}|\d+)$/i).test(email);
                },
                error: {
                    fieldName: "E-mail адрес",
                    message: this.stringsResource.validation.enterCorrectEmail,
                    selector: ".error-message.error-email-field"
                }
            }
        };
    }

    /**
     * @example
     *
     * var algorithms = new Algorithms().getAlgorithms([
     *      {type: "phone", selector: "css selector", message: "error description"},
     *      {type: "phone", name: "workPhone", selector: "css selector", message: "error description"}
     * ]);
     *
     * algorithms;
     * //{phone: {isValid: Function, error: Object}, workPhone: {isValid: Function, error: Object}}
     *
     * @method getAlgorithms
     * @param algorithms {Array}
     * @returns {Object}
     */
    getAlgorithms(algorithms) {
        let result = {};

        algorithms.forEach((algorithm) => {
            if (this.baseAlgorithms[algorithm.type]) {
                result[algorithm.name || algorithm.type] = _.merge(
                    {},
                    this.baseAlgorithms[algorithm.type],
                    {error: {selector: algorithm.selector, message: algorithm.message}}
                );
            }
        });

        return result;
    }
}

export default Algorithms;
