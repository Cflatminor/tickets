import Entity from "app/core/entities/Entity";
import Airport from "app/core/entities/airport/Airport";

class FlightPoint extends Entity {
    /**
     * @public
     * @method getCountryName
     * @returns {string}
     */
    getCountryName() {
        return this.entity.countryName || "";
    }

    /**
     * @public
     * @method getCityName
     * @returns {string}
     */
    getCityName() {
        return this.entity.cityName || "";
    }

    /**
     * @public
     * @method getAirport
     * @returns {Airport}
     */
    getAirport() {
        return new Airport(this.entity.airport);
    }

    /**
     * @public
     * @method getTime
     * @returns {string}
     */
    getTime() {
        return this.entity.time || "";
    }

    /**
     * @public
     * @method getDate
     * @returns {string}
     */
    getDate() {
        return this.entity.date || "";
    }

    /**
     * @public
     * @method getTotalTime
     * @returns {string}
     */
    getTotalTime() {
        return this.entity.totalTime || "";
    }
}

export default FlightPoint;
