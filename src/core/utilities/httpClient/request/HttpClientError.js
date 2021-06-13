class HttpClientError {
    /**
     * @constructor
     * @param request {Request}
     * @param message {string}
     * @param statusCode {int}
     * @returns {void}
     */
    constructor(request, message, statusCode = -1) {
        this.request = request;
        this.message = message;
        this.statusCode = statusCode;

        this.defaultMessage = "Произошла ошибка, попробуйте позже!";
    }

    /**
     * @method getMessage
     * @returns {string}
     */
    getMessage() {
        let result = "",
            error = null;

        try {
            error = JSON.parse(this.message);

            result = error.detail;
        } catch (e) {
            result = this.defaultMessage;
        }

        return result;
    }

    /**
     * @method getStatusCode
     * @returns {int}
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * @method getRequest
     * @returns {Request}
     */
    getRequest() {
        return this.request;
    }
}

export default HttpClientError;
