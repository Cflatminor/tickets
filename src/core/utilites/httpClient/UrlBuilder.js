import {compile} from "path-to-regexp";
import httpBuildQuery from "http-build-query";

class UrlBuilder {
    constructor() {
        // eslint-disable-next-line max-len
        this.pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        this.baseUrl = "";
    }

    /**
     * @method setBaseUrl
     * @param url {string}
     * @returns {UrlBuilder}
     */
    setBaseUrl(url) {
        if (!this.pattern.test(url)) {
            throw new TypeError("Invalid URL");
        }

        this.baseUrl = url;

        return this;
    }

    /**
     * @method build
     * @param path {string}
     * @param params {Object}
     * @param query {Object}
     * @returns {string}
     */
    build(path, params = {}, query = {}) {
        let url = new URL(this.baseUrl),
            pathCompiler = compile(path, {
                encode: encodeURIComponent
            });

        url.pathname = pathCompiler(params);
        url.search = httpBuildQuery(query);

        return url.toString();
    }
}

export default UrlBuilder;
