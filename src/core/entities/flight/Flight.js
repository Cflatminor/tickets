import _ from "lodash";

import Entity from "app/core/entities/Entity";
import AirlineCompany from "app/core/entities/airlineCompany/AirlineCompany";
import FlightPoint from "app/core/entities/flight/FlightPoint";
import Baggage from "app/core/entities/baggage/Baggage";

class Flight extends Entity {
    /**
     * @public
     * @method getAirlineCompany
     * @returns {AirlineCompany}
     */
    getAirlineCompany() {
        return new AirlineCompany(this.entity.airlineCompany);
    }

    /**
     * @method getFlightNumber
     * @returns {string}
     */
    getFlightNumber() {
        return this.entity.flightNumber || "";
    }

    /**
     * @method getAircraftNumber
     * @returns {string}
     */
    getAircraftNumber() {
        return this.entity.aircraftNumber || "";
    }

    /**
     * @public
     * @method getBaggage
     * @returns {Baggage}
     */
    getBaggage() {
        return new Baggage(this.entity.baggage_allowance);
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
     * @method setDeparture
     * @param departure {Object}
     * @returns {Flight}
     */
    setDeparture(departure) {
        if (_.isPlainObject(departure)) {
            this.entity.departure = departure;
        }

        return this;
    }

    /**
     * @public
     * @method getDeparture
     * @returns {FlightPoint}
     */
    getArrival() {
        return new FlightPoint(this.entity.arrival);
    }

    /**
     * @method setArrival
     * @param arrival {Object}
     * @returns {Flight}
     */
    setArrival(arrival) {
        if (_.isPlainObject(arrival)) {
            this.entity.arrival = arrival;
        }

        return this;
    }

    /**
     * @public
     * @method getTransfers
     * @return {Flight[]}
     */
    getTransfers() {
        return (this.entity.transfers || []).map((item) => new Flight(item));
    }

    /**
     * @public
     * @method getTotalTime
     * @return {string}
     */
    getTotalTime() {
        return this.entity.totalTime || "";
    }
}

export default Flight;
