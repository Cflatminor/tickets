import _ from "lodash";

class Presenter {
    constructor(props) {
        this._Model = props.dependencies.Model;
    }

    /**
     * @public
     * @method getTicketsByRoute
     * @param route {Route}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    getTicketsByRoute(route, success, error) {
        if (route && _.isFunction(success) && _.isFunction(error)) {
            this._Model.getTicketsByRoute(route, success, error);
        }

        return this;
    }

    /**
     * @method getTicketRules
     * @param ticket {Ticket}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    getTicketRules(ticket, success, error) {
        if (ticket && _.isFunction(success) && _.isFunction(error)) {
            this._Model.getTicketRules(ticket, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return this._Model.normalizeInitialProps(initialData, pageInfo);
    }
}

export default Presenter;
