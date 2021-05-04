import Promise from "promise-abortable";

import Env from "app/core/environment";
import Observer from "app/core/utilities/observer/Observer";
import LocalStorage from "app/core/utilities/storage/localStorage";
import LocalStorageNameEnum from "app/core/utilities/enum/localStorageName";

import HttpDataType from "../HttpDataType";
import HttpResponseType from "../HttpResponseType";

import HttpClientError from "./HttpClientError";
import HttpClientAdapter from "../adapter/AbstractAdapter";
import HttpClientResponse from "./HttpClientResponse";

import BodyBuilder from "./BodyBuilder";

class Request {
    /**
     * @constructor
     * @param driver {HttpClientAdapter}
     * @param method {HttpMethod}
     * @param url {string}
     * @param options {Object}
     * @param onSuccess {Function}
     * @param onError {Function}
     * @returns {void}
     */
    constructor(driver, method, url, options, onSuccess, onError) {
        if (!driver) {
            throw new HttpClientError(this, "HttpClientAdapter not provided!");
        }

        if (!(driver instanceof HttpClientAdapter)) {
            throw new HttpClientError(this, "Invalid HttpClientAdapter!");
        }

        this.defaultOptions = {
            headers: {},
            body: {}
        };

        this.method = method;
        this.driver = driver;

        this.options = {...this.defaultOptions, ...options};

        this.onSuccess = onSuccess;

        this.onError = onError;

        this.token = LocalStorage.getInstance().getItem(LocalStorageNameEnum.getInstance().getTokenAsValue());

        if (this.token) {
            this.options.headers.Authorization = `Bearer ${this.token}`;
        }

        this.url = url;

        this.observer = new Observer().installTo(this);

        this.env = Env.getInstance();

        this.make = this.make.bind(this);
    }

    /**
     * @method getMethod
     * @returns {HttpMethod}
     */
    getMethod() {
        return this.method;
    }

    /**
     * @method getUrl
     * @returns {URL}
     */
    getUrl() {
        return this.url;
    }

    /**
     * @public
     * @method getHeaders
     * @returns {Object}
     */
    getHeaders() {
        return {
            ...this.options.headers,
            ...this.getDataType().getHeaders()
        };
    }

    /**
     * @method getBody
     * @returns {string|FormData|null}
     */
    getBody() {
        return new BodyBuilder(this).build(this.options.body);
    }

    /**
     * @method getDataType
     * @returns {HttpDataType}
     */
    getDataType() {
        return this.options.dataType || new HttpDataType(HttpDataType.JSON);
    }

    /**
     * @method getResponseType
     * @returns {HttpResponseType}
     */
    getResponseType() {
        return this.options.responseType || new HttpResponseType(HttpResponseType.JSON);
    }

    /**
     * @method getTimeoutValue
     * @returns {number}
     */
    getTimeoutValue() {
        return Number(this.env.getHttpClientRequestTimeout());
    }

    /**
     * @method getAdapterOptions
     * @returns {Object}
     */
    getAdapterOptions() {
        return this.options.adapterOptions || {};
    }

    /**
     * @method make
     * @returns {Promise}
     */
    make() {
        return new Promise((resolve, reject, signal) => {
            this.on("success", (statusCode, headers, data) => {
                let response = new HttpClientResponse(this, statusCode, headers, data);

                return this.onSuccess ? this.onSuccess(response) : resolve(response);
            });

            this.on("error", (errorMessage, statusCode) => {
                let error = new HttpClientError(this, errorMessage, statusCode);

                return this.onError ? this.onError(error) : reject(error);
            });

            signal.onabort = () => {
                this.observer.trigger("cancel");
            };

            this.driver.setRequest(this).makeRequest();
        });
    }
}

export default Request;
