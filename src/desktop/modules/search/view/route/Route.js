import React from "react";

import ServiceClassEnum from "app/core/utilities/enum/serviceClass";

import RouteEntity from "app/core/entities/route/Route"

import SearchService from "app/core/services/search"

import DestinationPoint from "./DestinationPoint";
import DeparturePoint from "./DeparturePoint";
import ArrivalDate from "./ArrivalDate";
import DepartureDate from "./DepartureDate";
import Passengers from "./Passengers";
import PropTypes from "prop-types";

class Route extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // arrivalDate: "",
            // departureDate: "",
            departurePoint: {
                getName: () => "",
                getCode: () => "",
                getAirports: () => []
            },
            destinationPoint: {
                getName: () => "",
                getCode: () => "",
                getAirports: () => []
            }
            // passengers: {}
        };

        /**
         * @private
         * @property _searchService
         * @type {Search}
         */
        this._searchService = SearchService.getInstance();

        /**
         * @private
         * @property _serviceClassEnum
         * @type {Enum}
         */
        this._serviceClassEnum = ServiceClassEnum.getInstance();

        /**
         * @private
         * @property _RouteEntity
         * @type {Route}
         */
        this._RouteEntity = RouteEntity;

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._setDeparturePoint = this._setDeparturePoint.bind(this);
        this._setDestinationPoint = this._setDestinationPoint.bind(this);
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
     * @method _setDestinationPoint
     * @param point {Object}
     * @returns {Route}
     */
    _setDestinationPoint(point) {
        this.setState({
            destinationPoint: point
        });

        return this;
    }

    // /**
    //  * @private
    //  * @method _setArrivalDate
    //  * @param date {string}
    //  * @return {Route}
    //  */
    // _setArrivalDate(date) {
    //     this.setState({
    //         arrivalDate: date
    //     });
    //
    //     return this;
    // }
    //
    // /**
    //  * @private
    //  * @method _setDepartureDate
    //  * @param date {string}
    //  * @return {Route}
    //  */
    // _setDepartureDate(date) {
    //     this.setState({
    //         departureDate: date
    //     });
    //
    //     return this;
    // }

    _swapPoints() {
        this.setState((prevState) => ({
            destinationPoint: prevState.departurePoint,
            departurePoint: prevState.destinationPoint
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

                success(result)
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
                .setDepartureDate("20.06.21")
                .setArrivalAirportCode(this.state.destinationPoint.getCode())
                .setArrivalDate("25.06.21")
                .setAdultPassengersCount(2)
                .setChildPassengersCount(1)
                .setBabyPassengersCount(0)
                .setServiceClass(this._serviceClassEnum.getComfortAsValue())
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
                                        setPoint={this._setDeparturePoint}//todo "setPoint" - это что за событие такое ?
                                        point={this.state.departurePoint}
                                    />

                                    <DestinationPoint
                                        getItemsByQuery={this._getItemsByQuery}
                                        setPoint={this._setDestinationPoint}//todo Destination ? серьезно, откуда это взялось ? на всех вокзалах написано Departure и Arrival
                                        point={this.state.destinationPoint}
                                    />

                                    {/*<span onClick={this._swapPoints}>x</span>*/}


                                    <ArrivalDate
                                        //todo где события ?
                                    />

                                    <DepartureDate />

                                    <Passengers />
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
