import _ from "lodash";
import {routes, Router as NextRouter} from "config/routes";

import Observer from "app/core/utilites/observer/Observer";

class Router {
    constructor() {
        this.routes = routes;
        this.NextRouter = NextRouter;

        this.observer = new Observer();

        this.observer.installTo(this);

        this._initEvents();
    }

    /**
     * @method _buildGetParamsByRouteAsString
     * @param route {Object}
     * @param params {Object}
     * @returns {string}
     * @private
     */
    _buildGetParamsByRouteAsString(route, params) {
        let result = "";

        Object.keys(params).forEach(function (key) {
            if (!route.keyNames.includes(key)) {
                result += `&${key}=${encodeURIComponent(params[key])}`;
            }
        });

        return result.slice(1);
    }

    /**
     * @private
     * @method initEvents
     * @returns {void}
     */
    _initEvents() {
        // NOTE: https://nextjs.org/docs/api-reference/next/router#routerevents
        this.NextRouter.events.on("routeChangeStart", (...args) => {
            this.observer.trigger("routeChangeStart", ...args);
        });

        this.NextRouter.events.on("routeChangeComplete", (...args) => {
            this.observer.trigger("routeChangeComplete", ...args);
        });

        this.NextRouter.events.on("routeChangeError", (...args) => {
            this.observer.trigger("routeChangeError", ...args);
        });

        this.NextRouter.events.on("beforeHistoryChange", (...args) => {
            this.observer.trigger("beforeHistoryChange", ...args);
        });

        this.NextRouter.events.on("hashChangeStart", (...args) => {
            this.observer.trigger("hashChangeStart", ...args);
        });

        this.NextRouter.events.on("hashChangeComplete", (...args) => {
            this.observer.trigger("hashChangeComplete", ...args);
        });
    }

    /**
     * @public
     * @method getCurrentRoute
     * @returns {{query: Object, pathname: string}}
     */
    getCurrentRoute() {
        let router = this.NextRouter.router;

        return {
            pathname: (router && router.asPath) || "",
            query: (router && router.query) || {}
        };
    }

    /**
     * @public
     * @method getRoutes
     * @returns {Array}
     */
    getRoutes() {
        return this.routes;
    }

    /**
     * @public
     * @method getRoutes
     * @param name {string}
     * @returns {Object|null}
     */
    getRouteByName(name) {
        return this.getRoutes().find((item) => item.name === name) || null;
    }

    /**
     * @public
     * @param url {string}
     * @param options {Object}
     * @param success {Function}
     * @returns {Router}
     */
    to(url, options = {}, success) {
        if (_.isString(url)) {
            this.NextRouter.pushRoute(url, options)
                .then(success);
        }

        return this;
    }

    /**
     * @public
     * @method changeRoute
     * @param name {string}
     * @param [params] {Object}
     * @param [options] {Object}
     * @returns {Router}
     */
    toByName(name, params = {}, options = {}) {
        let route = this.getRouteByName(name);

        if (route) {
            this.to(
                `${route.toPath(_.merge({}, this.getCurrentRoute().query, params))}/`,
                options
            );
        }

        return this;
    }

    /**
     * @public
     * @method buildUrlByRouteNameWithQueryString
     * @param name {string}
     * @param params {Object}
     * @returns {string}
     */
    buildUrlByRouteNameWithQueryString(name, params) {
        let route = this.getRouteByName(name),
            result = "";

        if (route) {
            result = `${route.toPath(_.merge({}, params))}?${this._buildGetParamsByRouteAsString(route, params)}`;
        }

        return result;
    }

    /**
     * @public
     * @method replace
     * @param url {string}
     * @param options {Object}
     * @returns {Router}
     */
    replace(url, options = {}) {
        if (_.isString(url)) {
            this.NextRouter.replaceRoute(url, options);
        }

        return this;
    }
}

export default Router;
