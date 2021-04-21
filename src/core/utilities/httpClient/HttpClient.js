import UrlBuilder from "./UrlBuilder";

import Request from "./request/Request";

import HttpClientAdapter from "./adapter/FetchAdapter";
import HttpMethod from "./HttpMethod";
import HttpDataType from "./HttpDataType";
import HttpResponseType from "./HttpResponseType";

/**
 * @example
 *
 * let baseURL = 'https://dsp.com',
 *     APIRoute = '/api/users/:id',
 *     userId = 123,
 *     httpClient = new HttpClient();
 *
 * httpClient
 * .setBaseUrl(baseURL)
 * .request({
 *       path: APIRoute,
 *       method: HttpClient.methods.GET,
 *       params: {
 *           id: userId
 *       }
 * })
 * .then((response) => console.log(response.data))
 *
 * httpClient
 * .setBaseUrl(baseURL)
 * .request({
 *       path: APIRoute,
 *       method: HttpClient.methods.PATCH,
 *       params: {
 *           id: userId
 *       },
 *       body: {
 *           name: "new name"
 *       }
 * })
 * .then((response) => console.log(response.data))
 *
 * @class HttpClient
 */
class HttpClient {
    constructor() {
        this.urlBuilder = new UrlBuilder();
    }

    /**
     * @public
     * @method setBaseUrl
     * @param url {string}
     * @return {HttpClient}
     */
    setBaseUrl(url) {
        this.urlBuilder.setBaseUrl(url);

        return this;
    }

    /**
     * @example
     *
     * options = {
     *      method: HttpMethod,
     *      dataType: HttpDataType,
     *      path: string,
     *      params: Object,
     *      query: Object,
     *      body: Object,
     *      headers: Object,
     *      adapterOptions: Object,
     *      onSuccess: Function,
     *      onError: Function
     * }
     *
     * @public
     * @method request
     * @param options {Object}
     * @returns {Promise}
     */
    request(options) {
        let {
            method, path, onSuccess, onError, ...truncatedOptions
        } = options;

        return new Request(
            new HttpClientAdapter(),
            method,
            this.urlBuilder.build(path, truncatedOptions.params, truncatedOptions.query),
            truncatedOptions,
            onSuccess,
            onError
        ).make();
    }

    /**
     * @public
     * @method get
     * @param path {string}
     * @param options {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    get(path, options, success, error) {
        return this.request({});
    }

    /**
     * @public
     * @method post
     * @param path {string}
     * @param options {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    post(path, options, success, error) {
        return this.request({});
    }

    /**
     * @public
     * @method put
     * @param path {string}
     * @param options {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    put(path, options, success, error) {
        return this.request({});
    }

    /**
     * @public
     * @method patch
     * @param path {string}
     * @param options {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    patch(path, options, success, error) {
        return this.request({});
    }

    /**
     * @public
     * @method delete
     * @param path {string}
     * @param options {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    delete(path, options, success, error) {
        return this.request({});
    }
}

HttpClient.methods = {
    GET: new HttpMethod(HttpMethod.GET),
    POST: new HttpMethod(HttpMethod.POST),
    PUT: new HttpMethod(HttpMethod.PUT),
    PATCH: new HttpMethod(HttpMethod.PATCH),
    DELETE: new HttpMethod(HttpMethod.DELETE)
};

HttpClient.dataTypes = {
    JSON: new HttpDataType(HttpDataType.JSON),
    URLENCODED: new HttpDataType(HttpDataType.URLENCODED),
    TEXTHTML: new HttpDataType(HttpDataType.TEXTHTML)
};

HttpClient.responseTypes = {
    JSON: new HttpResponseType(HttpResponseType.JSON),
    TEXT: new HttpResponseType(HttpResponseType.TEXT)
};

export default HttpClient;
