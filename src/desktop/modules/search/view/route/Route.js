import React from "react";
import PropTypes from "prop-types";

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

        this.state = {
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
            departureDate: "",
            adultPassengers: 1,
            childPassengers: 0,
            babyPassengers: 0,
            serviceClass: ""
        };

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._setDeparturePoint = this._setDeparturePoint.bind(this);
        this._setArrivalPoint = this._setArrivalPoint.bind(this);
        this._setArrivalDate = this._setArrivalDate.bind(this);
        this._setDepartureDate = this._setDepartureDate.bind(this);
        this._setBabyPassengersCount = this._setBabyPassengersCount.bind(this);
        this._setChildPassengersCount = this._setChildPassengersCount.bind(this);
        this._setAdultPassengersCount = this._setAdultPassengersCount.bind(this);
        this._setServiceClass = this._setServiceClass.bind(this);
        this._swapPoints = this._swapPoints.bind(this);
        this._createRoute = this._createRoute.bind(this);
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

    /**
     * @private
     * @method _setAdultPassengersCount
     * @returns {Route}
     */
    _setAdultPassengersCount(count) {
        this.setState({
            adultPassengers: count
        });

        return this;
    }

    /**
     * @private
     * @method _setChildPassengersCount
     * @returns {Route}
     */
    _setChildPassengersCount(count) {
        this.setState({
            childPassengers: count
        });

        return this;
    }

    /**
     * @private
     * @method _setBabyPassengersCount
     * @returns {Route}
     */
    _setBabyPassengersCount(count) {
        this.setState({
            babyPassengers: count
        });

        return this;
    }

    _setServiceClass(serviceClass) {
        this.setState({
            serviceClass
        });

        return this;
    }

    _swapPoints() {
        this.setState((prevState) => ({
            arrivalPoint: prevState.departurePoint,
            departurePoint: prevState.arrivalPoint
        }));

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
     * @method _createRoute
     * @return {Route}
     */
    _createRoute() {
        this.props.confirm(
            new this._RouteEntity()
                .setDepartureAirportCode(this.state.departurePoint.getCode())
                .setDepartureDate(this.state.departureDate)
                .setArrivalAirportCode(this.state.arrivalPoint.getCode())
                .setArrivalDate(this.state.arrivalDate)
                .setAdultPassengersCount(this.state.adultPassengers)
                .setChildPassengersCount(this.state.childPassengers)
                .setBabyPassengersCount(this.state.babyPassengers)
                .setServiceClass(this.state.serviceClass)
        );

        return this;
    }

    render() {
        return (
            <div className="search__route route">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="route__form d-flex">
                                <div className="route__inputs d-flex w-100">
                                    <DeparturePoint
                                        getItemsByQuery={this._getItemsByQuery}
                                        setAirportCode={this._setDeparturePoint}
                                        airport={this.state.departurePoint}
                                    />

                                    <ArrivalPoint
                                        getItemsByQuery={this._getItemsByQuery}
                                        setAirportCode={this._setArrivalPoint}
                                        airport={this.state.arrivalPoint}
                                    />

                                    {/*<span onClick={this._swapPoints}>x</span>*/}

                                    <ArrivalDate
                                        setDate={this._setArrivalDate}
                                    />

                                    <DepartureDate
                                        setDate={this._setDepartureDate}
                                    />

                                    <Passengers
                                        setServiceClass={this._setServiceClass}
                                        setBabyPassengers={this._setBabyPassengersCount}
                                        setChildPassengers={this._setChildPassengersCount}
                                        setAdultPassengers={this._setAdultPassengersCount}
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
                    </div>
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
