import _ from "lodash";

import Entity from "app/core/entities/Entity";
import FlightPoint from "app/core/entities/flight/FlightPoint";

class Route extends Entity {
    constructor(props) {
        super(props);

        this.entity = {
            departure: {
                cityName: "",
                airport: {
                    code: ""
                }
            },
            arrival: {
                cityName: "",
                airport: {
                    code: ""
                }
            },
            passengers: {
                adult: 1,
                child: 0,
                baby: 0
            },
            departureDate: "",
            comebackDate: ""
        };
    }


    /**
     * @method _getPassengers
     * @returns {Object}
     * @private
     */
    _getPassengers() {
        return this.entity.passengers || {};
    }

    /**
     * @method _setPassengers
     * @param passengers {Object}
     * @returns {Object}
     * @private
     */
    _setPassengers(passengers) {
        this.entity.passengers = passengers;

        return this;
    }

    /**
     * @public
     * @method getDeparture
     * @returns {FlightPoint}
     */
    getDeparture() {
        return new FlightPoint(this.entity.departure);
    }

    /**
     * @method setDepartureCityName
     * @param name {string}
     * @returns {Route}
     */
    setDepartureCityName(name) {
        if (_.isString(name)) {
            this.entity.departure.cityName = name;
        }

        return this;
    }

    /**
     * @method setDepartureAirportCode
     * @param code {Object}
     * @returns {Route}
     */
    setDepartureAirportCode(code) {
        if (_.isString(code)) {
            this.entity.departure.airport.code = code;
        }

        return this;
    }

    /**
     * @method setDepartureDate
     * @param date {string}
     * @returns {Route}
     */
    setDepartureDate(date) {
        if (_.isString(date)) {
            this.entity.departureDate = date;
        }

        return this;
    }

    /**
     * @public
     * @method getArrival
     * @returns {FlightPoint}
     */
    getArrival() {
        return new FlightPoint(this.entity.arrival);
    }

    /**
     * @method setDepartureCityName
     * @param name {string}
     * @returns {Route}
     */
    setArrivalCityName(name) {
        if (_.isString(name)) {
            this.entity.arrival.cityName = name;
        }

        return this;
    }

    /**
     * @public
     * @method setArrivalAirportCode
     * @param code {Object}
     * @returns {Route}
     */
    setArrivalAirportCode(code) {
        if (_.isString(code)) {
            this.entity.arrival.airport.code = code;
        }

        return this;
    }

    /**
     * @method getComebackDate
     * @returns {string}
     */
    getComebackDate() {
        return this.entity.comebackDate || "";
    }

    /**
     * @method setComebackDate
     * @param date {string}
     * @returns {Route}
     */
    setComebackDate(date) {
        if (_.isString(date)) {
            this.entity.comebackDate = date;
        }

        return this;
    }

    /**
     * @public
     * @method getServiceClass
     * @returns {number|string}
     */
    getServiceClass() {
        return this.entity.serviceClass || "";
    }

    /**
     * @public
     * @method setServiceClass
     * @param type {number|string}
     * @returns {Route}
     */
    setServiceClass(type) {
        if (type && (_.isNumber(type) || _.isString(type))) {
            this.entity.serviceClass = type;
        }

        return this;
    }

    /**
     * @public
     * @method getAdultPassengersCount
     * @returns {number}
     */
    getAdultPassengersCount() {
        return this._getPassengers().adult;
    }

    /**
     * @public
     * @method setAdultPassengersCount
     * @param count {number}
     * @returns {Route}
     */
    setAdultPassengersCount(count) {
        let result = this._getPassengers();

        if (_.isNumber(count) && count >= 1) {
            result.adult = count;

            this._setPassengers(result);
        }

        return this;
    }

    /**
     * @public
     * @method getChildPassengersCount
     * @returns {number}
     */
    getChildPassengersCount() {
        return this._getPassengers().child;
    }

    /**
     * @public
     * @method setChildPassengersCount
     * @param count {number}
     * @returns {Route}
     */
    setChildPassengersCount(count) {
        let result = this._getPassengers();

        if (_.isNumber(count) && count >= 0) {
            result.child = count;

            this._setPassengers(result);
        }

        return this;
    }

    /**
     * @public
     * @method getChildPassengersCount
     * @returns {number}
     */
    getBabyPassengersCount() {
        return this._getPassengers().baby;
    }

    /**
     * @public
     * @method setChildPassengersCount
     * @param count {number}
     * @returns {Route}
     */
    setBabyPassengersCount(count) {
        let result = this._getPassengers();

        if (_.isNumber(count) && count >= 0) {
            result.baby = count;

            this._setPassengers(result);
        }

        return this;
    }
}

export default Route;
