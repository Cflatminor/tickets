import HttpClientError from "../request/HttpClientError";

class AbstractAdapter {
    constructor() {
        if (new.target === AbstractAdapter) {
            throw new HttpClientError(null, "Can not construct AbstractAdapter");
        }
    }

    /**
     * @method setRequest
     * @param request {Request}
     * @returns {AbstractAdapter}
     */
    setRequest(request) {
        this.request = request;

        return this;
    }

    /**
     * @method
     * @returns {void}
     */
    makeRequest() {
        throw new HttpClientError(this.request, "Driver method makeRequest not implemented");
    }

    /**
     * @method success
     * @param status {number}
     * @param headers {Object}
     * @param data {Object}
     * @returns {void}
     */
    success(status, headers, data) {
        this.request.observer.trigger("success", status, headers, data);
    }

    /**
     * @method error
     * @param message {string}
     * @param status {number}
     * @returns {void}
     */
    error(message, status) {
        this.request.observer.trigger("error", message, status);
    }
}

export default AbstractAdapter;
