class HttpDataType {
    constructor(dataType) {
        /**
         * @property dataType
         * @type {Object}
         */
        this.dataType = dataType;
    }

    /**
     * @public
     * @method isJSON
     * @return {boolean}
     */
    isJSON() {
        return this.getType() === HttpDataType.JSON.type;
    }

    /**
     * @public
     * @method isURLENCODED
     * @return {boolean}
     */
    isURLENCODED() {
        return this.getType() === HttpDataType.URLENCODED.type;
    }

    /**
     * @public
     * @method getType
     * @return {string}
     */
    getType() {
        return this.dataType.type;
    }

    /**
     * @public
     * @method getHeaders
     * @return {Object}
     */
    getHeaders() {
        return this.dataType.headers;
    }
}

HttpDataType.JSON = {
    type: "JSON",
    headers: {
        "content-type": "application/json; charset=utf-8"
    }
};

HttpDataType.URLENCODED = {
    type: "URLENCODED",
    headers: {
        "content-type": "application/x-www-form-urlencoded"
    }
};

HttpDataType.TEXTHTML = {
    type: "TEXTHTML",
    headers: {
        "content-type": "text/html"
    }
};

export default HttpDataType;
