import _ from "lodash";

class Search {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getItemsByQuery(query, success, error) {
        if (query && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.getItemsByQuery(query.trim().toLowerCase(), success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getFlightPoint
     * @param query {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getFlightPoint(query, success, error) {
        if (query && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.getFlightPoint(query.trim().toLowerCase(), success, error);
        }

        return this;
    }
}

export default Search;
