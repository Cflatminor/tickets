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
        return "";
    }

    /**
     * @public
     * @method getTotalTime
     * @returns {string}
     */
    getTotalTime() {
        return "";
    }
}

export default FlightPoint;
