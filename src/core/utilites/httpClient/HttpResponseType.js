class HttpResponseType {
    constructor(responseType) {
        this.responseType = responseType;
    }

    /**
     * @public
     * @method isJSON
     * @return {boolean}
     */
    isJSON() {
        return this.getType() === HttpResponseType.JSON.type;
    }

    /**
     * @public
     * @method isTEXT
     * @return {boolean}
     */
    isTEXT() {
        return this.getType() === HttpResponseType.TEXT.type;
    }

    /**
     * @public
     * @method getType
     * @return {string}
     */
    getType() {
        return this.responseType.type;
    }
}

HttpResponseType.JSON = {
    type: "JSON"
};

HttpResponseType.TEXT = {
    type: "TEXT"
};

export default HttpResponseType;
