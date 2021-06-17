import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import RouteEntity from "app/core/entities/route/Route";

import SearchService from "app/core/services/search";

import ArrivalPoint from "./ArrivalPoint";
import DeparturePoint from "./DeparturePoint";
import ArrivalDate from "./ArrivalDate";
import DepartureDate from "./DepartureDate";
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
                getCode: () => "",
                getAirports: () => []
            },
            arrivalPoint: {
                getName: () => "",
                getCode: () => "",
                getAirports: () => []
            },
            arrivalDate: "",
            departureDate: ""
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
         * @property _RouteEntity
         * @type {Route}
         */
        this._RouteEntity = RouteEntity;

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._setDeparturePoint = this._setDeparturePoint.bind(this);
        this._setArrivalPoint = this._setArrivalPoint.bind(this);
        this._setArrivalDate = this._setArrivalDate.bind(this);
        this._setDepartureDate = this._setDepartureDate.bind(this);
        this._changePassengers = this._changePassengers.bind(this);
        this._swapDirection = this._swapDirection.bind(this);
        this._createRoute = this._createRoute.bind(this);
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
     * @private
     * @method _setDeparturePoint
     * @param point {Object}
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
     * @method _setArrivalDate
     * @param date {string}
     * @return {Route}
     */
    _setArrivalDate(date) {
        this.setState({
            arrivalDate: date
        });

        return this;
    }

    /**
     * @private
     * @method _setDepartureDate
     * @param date {string}
     * @return {Route}
     */
    _setDepartureDate(date) {
        this.setState({
            departureDate: date
        });

        return this;
    }

    _getItemsByQuery(query, success) {
        if (query.length > 2) {
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
    }

    /**
     * @method _buildRoute
     * @return {Route}
     * @private
     */
    _buildRoute() {
        return new this._RouteEntity()
            .setDepartureAirportCode(this.state.departurePoint.getCode())
            .setDepartureDate(this.state.departureDate)
            .setArrivalAirportCode(this.state.arrivalPoint.getCode())
            .setArrivalDate(this.state.arrivalDate)
            .setAdultPassengersCount(this.state.passengers.counts.adult)
            .setChildPassengersCount(this.state.passengers.counts.child)
            .setBabyPassengersCount(this.state.passengers.counts.baby)
            .setServiceClass(this.state.passengers.serviceClass)
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
                <div className="route__body d-flex">
                    <div className="d-flex w-100">
                        <div className="route__departure w-100">
                            <DeparturePoint
                                getItemsByQuery={this._getItemsByQuery}
                                setAirportCode={this._setDeparturePoint}
                                airport={this.state.departurePoint}
                            />

                            {this.state.validationErrors.departurePoint && (
                                <div className="error-message error-departure-point">
                                    {this._stringsResource.validation.mustBeCompleted}
                                </div>
                            )}
                        </div>

                        <div className="route__arrival w-100">
                            <ArrivalPoint
                                getItemsByQuery={this._getItemsByQuery}
                                setAirportCode={this._setArrivalPoint}
                                airport={this.state.arrivalPoint}
                            />

                            {this.state.validationErrors.arrivalPoint && (
                                <div className="error-message error-arrival-point">
                                    {this._stringsResource.validation.mustBeCompleted}
                                </div>
                            )}
                        </div>

                        {/*<span onClick={this._swapDirection}>x</span>*/}

                        <DepartureDate
                            change={this._setDepartureDate}
                        />

                        <ArrivalDate
                            change={this._setArrivalDate}
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
                        Найти
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
