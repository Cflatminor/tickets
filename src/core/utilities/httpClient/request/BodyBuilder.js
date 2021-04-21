class BodyBuilder {
    /**
     * @constructor
     * @param request {Request}
     * @returns {void}
     */
    constructor(request) {
        /**
         * @property request
         * @type {Request}
         */
        this.request = request;
    }

    /**
     * @method _toJson
     * @param body {Object}
     * @returns {string}
     */
    _toJson(body) {
        return JSON.stringify(body);
    }

    /**
     * @method _toUrlEncoded
     * @param body {Object}
     * @returns {string}
     * @private
     */
    _toUrlEncoded(body = {}) {
        return Object.keys(body)
            .reduce(function (result, key) {
                result.push(`${key}=${body[key]}`);

                return result;
            }, [])
            .join("&");
    }

    /**
     * @method _serialize
     * @param body {Object}
     * @return {string}
     * @private
     */
    _serialize(body) {
        let result = "";

        if (this.request.getDataType().isJSON()) {
            result = this._toJson(body);
        }

        if (this.request.getDataType().isURLENCODED()) {
            result = this._toUrlEncoded(body);
        }

        return result;
    }

    /**
     * @public
     * @method build
     * @param body {Object}
     * @returns {string|null}
     */
    build(body) {
        let result = null;

        if (this.request.getMethod().hasBody()) {
            result = this._serialize(body);
        }

        return result;
    }
}
export default BodyBuilder;
