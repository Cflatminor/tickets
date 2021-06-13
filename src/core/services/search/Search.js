import _ from "lodash";

class Search {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this._Repository = props.dependencies.Repository;

        this._AirportEntity = props.dependencies.AirportEntity;

        this._buildFlightPoint = this._buildFlightPoint.bind(this);
    }

    /**
     * @method _buildFlightPoint
     * @param point {Object}
     * @returns {Object}
     * @private
     */
    _buildFlightPoint(point) {
        let self = this;

        return {
            hasAirports: true,
            /**
             * @public
             * @method getName
             * @returns {string}
             */
            getName() {
                return point.name || "";
            },
            /**
             * @public
             * @method getCode
             * @returns {string}
             */
            getCode() {
                return point.code || "";
            },
            /**
             * @public
             * @method getCountryCode
             * @returns {string}
             */
            getCountryCode() {
                return point.country_code || "";
            },
            /**
             * @public
             * @method getAirports
             * @returns {Airport[]}
             */
            getAirports() {
                return point.airports.map((airport) => new self._AirportEntity(airport))
            }
        };
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
            this._Repository.getItemsByQuery(query.trim().toLowerCase(), success, error);
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
            this._Repository.getFlightPoint(
                query.trim().toLowerCase(),
                (items) => {
                    success(items.map(this._buildFlightPoint));
                },
                error
            );
        }

        return this;
    }
}

export default Search;
