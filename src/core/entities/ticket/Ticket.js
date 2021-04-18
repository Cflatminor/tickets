import Entity from "app/core/entities/Entity";
import Flight from "app/core/entities/flight/Flight";
import Price from "app/core/entities/price/Price";
import Sticker from "app/core/entities/sticker/Sticker";

class Ticket extends Entity {
    /**
     * @public
     * @method hasBackwardFlight
     * @returns {boolean}
     */
    hasBackwardFlight() {
        return Boolean(this.getBackwardFlight().length);
    }

    /**
     * @public
     * @method getSticker
     * @returns {Sticker}
     */
    getSticker() {
        return new Sticker(this.entity.sticker);
    }

    /**
     * @public
     * @method getForwardFlight
     * @returns {Flight[]}
     */
    getForwardFlight() {
        return (this.entity.forward || []).map((item) => new Flight(item));
    }

    /**
     * @public
     * @method getBackwardFlight
     * @returns {Flight[]}
     */
    getBackwardFlight() {
        return (this.entity.backward || []).map((item) => new Flight(item));
    }

    /**
     * @public
     * @method getPrice
     * @returns {Price}
     */
    getPrice() {
        return new Price(this.entity.price);
    }
}

export default Ticket;
