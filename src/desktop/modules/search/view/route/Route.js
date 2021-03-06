import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import RouteEntity from "app/core/entities/route/Route";

import Strings from "core/utilities/strings";

import SearchService from "app/core/services/search";

import FlightPoint from "./FlightPoint";
import RouteDate from "./RouteDate";
import Passengers from "./Passengers";

class Route extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validationErrors: {
                departurePoint: false,
                arrivalPoint: false
            },
            passengers: {},
            departurePoint: {
                getName: () => "",
                getCode: () => ""
            },
            arrivalPoint: {
                getName: () => "",
                getCode: () => ""
            },
            departureDate: "",
            comebackDate: ""
        };

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @private
         * @property _searchService
         * @type {Search}
         */
        this._searchService = SearchService.getInstance();

        /**
         * @private
         * @property _strings
         * @type {Strings}
         */
        this._strings = Strings.getInstance();

        /**
         * @private
         * @property _RouteEntity
         * @type {Route}
         */
        this._RouteEntity = RouteEntity;

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._setDeparturePoint = this._setDeparturePoint.bind(this);
        this._setArrivalPoint = this._setArrivalPoint.bind(this);
        this._setFormattedDepartureDate = this._setFormattedDepartureDate.bind(this);
        this._setComebackDate = this._setComebackDate.bind(this);
        this._changePassengers = this._changePassengers.bind(this);
        this._swapDirection = this._swapDirection.bind(this);
        this._createRoute = this._createRoute.bind(this);
    }

    /**
     * @public
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {
        this._setFormattedDepartureDate(this._getFormattedCurrentDate());
    }

    /**
     * @method _isValidRoute
     * @param route {Route}
     * @return {boolean}
     * @private
     */
    _isValidRoute(route) {
        let departureAirportCode = Boolean(route.getDeparture().getAirport().getCode()),
            arrivalAirportCode = Boolean(route.getArrival().getAirport().getCode());

        this._toggleValidationErrors({
            departurePoint: !departureAirportCode,
            arrivalPoint: !arrivalAirportCode
        });

        return departureAirportCode && arrivalAirportCode;
    }

    /**
     * @method _toggleValidationErrors
     * @param state {Object}
     * @return {Route}
     * @private
     */
    _toggleValidationErrors(state) {
        this.setState({
            validationErrors: {
                departurePoint: state.departurePoint,
                arrivalPoint: state.arrivalPoint
            }
        });

        return this;
    }

    /**
     * @method _getFormattedCurrentDate
     * @return {string}
     * @private
     */
    _getFormattedCurrentDate() {
        return this._strings.formatShortDate(this._getCurrentDate());
    }

    /**
     * @method _getCurrentDate
     * @return {Date}
     * @private
     */
    _getCurrentDate() {
        return new Date();
    }

    /**
     * @method _getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @return {Route}
     * @private
     */
    _getItemsByQuery(query, success) {
        if (query && query.length > 2) {
            this._searchService.getFlightPoint(query, (items) => {
                let result = [];

                items.forEach((item) => {
                    result.push(item);

                    item.getAirports().forEach((airport) => {
                        result.push(airport);
                    });
                });

                success(result);
            }, () => {});
        } else {
            success([]);
        }

        return this;
    }

    /**
     * @private
     * @method _setDeparturePoint
     * @param point {Airport}
     * @returns {Route}
     */
    _setDeparturePoint(point) {
        this.setState({
            departurePoint: point
        });

        return this;
    }

    /**
     * @private
     * @method _setArrivalPoint
     * @param point {Object}
     * @returns {Route}
     */
    _setArrivalPoint(point) {
        this.setState({
            arrivalPoint: point
        });

        return this;
    }

    /**
     * @private
     * @method _setComebackDate
     * @param date {string}
     * @return {Route}
     */
    _setComebackDate(date) {
        this.setState({
            comebackDate: date
        });

        return this;
    }

    /**
     * @method _getDepartureDate
     * @return {Date|null}
     * @private
     */
    _getDepartureDate() {
        let dateParts = this.state.departureDate.split("-").reverse(),
            result = null;

        if (this.state.departureDate) {
            result = new Date(
                Number(dateParts[0]),
                dateParts[1] - 1,
                Number(dateParts[2])
            );
        }

        return result;
    }

    /**
     * @private
     * @method _setFormattedDepartureDate
     * @param date {string}
     * @return {Route}
     */
    _setFormattedDepartureDate(date) {
        this.setState({
            departureDate: date
        });

        return this;
    }

    /**
     * @method _buildRoute
     * @return {Route}
     * @private
     */
    _buildRoute() {
        return new this._RouteEntity()
            .setDepartureCityName(this.state.departurePoint.getName())
            .setDepartureAirportCode(this.state.departurePoint.getCode())
            .setDepartureDate(this.state.departureDate)
            .setArrivalCityName(this.state.arrivalPoint.getName())
            .setArrivalAirportCode(this.state.arrivalPoint.getCode())
            .setComebackDate(this.state.comebackDate)
            .setAdultPassengersCount(this.state.passengers.counts.adult)
            .setChildPassengersCount(this.state.passengers.counts.child)
            .setBabyPassengersCount(this.state.passengers.counts.baby)
            .setServiceClass(this.state.passengers.serviceClass);
    }

    /**
     * @private
     * @method _changePassengers
     * @param passengers {Object}
     * @returns {Route}
     */
    _changePassengers(passengers) {
        this.setState({passengers});

        return this;
    }

    /**
     * @method _swapDirection
     * @return {Route}
     * @private
     */
    _swapDirection() {
        this.setState((prevState) => ({
            arrivalPoint: prevState.departurePoint,
            departurePoint: prevState.arrivalPoint
        }));

        return this;
    }

    /**
     * @method _createRoute
     * @return {Route}
     */
    _createRoute() {
        let route = this._buildRoute();

        if (this._isValidRoute(route)) {
            this.props.confirm(route);
        }

        return this;
    }

    render() {
        return (
            <div className="search__route route">
                <div className="route__body d-flex flex-wrap flex-xl-nowrap">
                    <div className="d-flex w-100 flex-wrap flex-xl-nowrap">
                        <div className="route__flight-points d-xl-flex w-100 position-relative">
                            <div className="route__departure w-100">
                                <FlightPoint
                                    title={this._stringsResource.fromWhere}
                                    getItemsByQuery={this._getItemsByQuery}
                                    change={this._setDeparturePoint}
                                    airport={this.state.departurePoint}
                                />

                                {this.state.validationErrors.departurePoint && (
                                    <div className="error-message error-departure-point">
                                        {this._stringsResource.validation.mustBeCompleted}
                                    </div>
                                )}
                            </div>

                            <span
                                className="route__to-swap-direction"
                                onClick={this._swapDirection}
                            >
                                <span className="icon icon-arrow-left" />
                                <span className="icon icon-arrow-right" />
                            </span>

                            <div className="route__arrival w-100">
                                <FlightPoint
                                    title={this._stringsResource.whereTo}
                                    getItemsByQuery={this._getItemsByQuery}
                                    change={this._setArrivalPoint}
                                    airport={this.state.arrivalPoint}
                                />

                                {this.state.validationErrors.arrivalPoint && (
                                    <div className="error-message error-arrival-point">
                                        {this._stringsResource.validation.mustBeCompleted}
                                    </div>
                                )}
                            </div>
                        </div>

                        <RouteDate
                            className="route__departure-date"
                            title={this._stringsResource.thitherward}
                            currentDate={this._getCurrentDate()}
                            change={this._setFormattedDepartureDate}
                        />

                        <RouteDate
                            className="route__comeback-date"
                            title={this._stringsResource.backward}
                            currentDate={null}
                            disableDaysBefore={this._getDepartureDate()}
                            change={this._setComebackDate}
                            deleteable
                        />

                        <Passengers
                            change={this._changePassengers}
                        />
                    </div>

                    <button
                        className="btn-default btn-lg to-search-results"
                        type="button"
                        onClick={this._createRoute}
                    >
                        {this._stringsResource.toFind}
                    </button>
                </div>
            </div>
        );
    }
}

Route.propTypes = {
    confirm: PropTypes.func
};

Route.defaultProps = {
    confirm: () => {}
};

export default Route;
