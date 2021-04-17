class HttpMethod {
    constructor(method) {
        this.method = method;
    }

    /**
     * @public
     * @method hasBody
     * @return {boolean}
     */
    hasBody() {
        return Boolean(this.method.hasBody);
    }

    /**
     * @public
     * @method getName
     * @return {string}
     */
    getName() {
        return this.method.name;
    }
}

HttpMethod.GET = {
    name: "GET",
    hasBody: false
};

HttpMethod.POST = {
    name: "POST",
    hasBody: true
};

HttpMethod.PUT = {
    name: "PUT",
    hasBody: true
};

HttpMethod.PATCH = {
    name: "PATCH",
    hasBody: true
};

HttpMethod.DELETE = {
    name: "DELETE",
    hasBody: false
};

export default HttpMethod;
