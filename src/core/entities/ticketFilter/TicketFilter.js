import Flight from "app/core/entities/flight/Flight";

class TicketFilter {
    constructor(entity) {
        this.entity = entity;
    }

    /**
     * @method getForwardFlight
     * @return {Flight}
     */
    getForwardFlight() {
        return new Flight(this.entity.time?.forwardFlight);
    }

    /**
     * @method getBackwardFlight
     * @return {Flight|null}
     */
    getBackwardFlight() {
        return this.entity.time?.backwardFlight ? new Flight(this.entity.time.backwardFlight) : null;
    }

    /**
     * @method getAttributes
     * @return {Array}
     */
    getAttributes() {
        return this.entity.attributes.map(function (attribute) {
            return {
                getId() {
                    return attribute.id || "";
                },
                getName() {
                    return attribute.name || "";
                },
                getItems() {
                    return attribute.items.map(function (item) {
                        return {
                            getId() {
                                return item.id || "";
                            },
                            getName() {
                                return item.name || "";
                            }
                        };
                    });
                }
            };
        });
    }
}

export default TicketFilter;
