class FilterBuilder {
    constructor(props) {
        this._TicketFilter = props.dependencies.TicketFilterEntity;
        this._FlightEntity = props.dependencies.FlightEntity;
    }

    /**
     * @method _hasDirectFlight
     * @param items {Flight[]}
     * @return {boolean}
     * @private
     */
    _hasDirectFlight(items) {
        return items.some((item) => !item.getTransfers().length);
    }

    /**
     * @method _hasOneTransfer
     * @param items {Flight[]}
     * @return {boolean}
     * @private
     */
    _hasOneTransfer(items) {
        return items.some((item) => item.getTransfers().length === 1);
    }

    /**
     * @method _hasAnyTransfers
     * @param items {Flight[]}
     * @return {boolean}
     * @private
     */
    _hasAnyTransfers(items) {
        return items.some((item) => item.getTransfers().length > 1);
    }

    /**
     * @method _getAllForwardFlights
     * @param items {Ticket[]}
     * @return {Array}
     * @private
     */
    _getAllForwardFlights(items) {
        let result = [];

        items.forEach((item) => {
            result = result.concat(item.getForwardFlights());
        });

        return result;
    }

    /**
     * @method _getAllBackwardFlights
     * @param items {Ticket[]}
     * @return {Array}
     * @private
     */
    _getAllBackwardFlights(items) {
        let result = [];

        items.forEach((item) => {
            result = result.concat(item.getBackwardFlights());
        });

        return result;
    }

    /**
     * @method _getAllFlights
     * @param items {Ticket[]}
     * @return {Flight[]}
     * @private
     */
    _getAllFlights(items) {
        return this._getAllForwardFlights(items).concat(this._getAllBackwardFlights(items));
    }

    /**
     * @method _getUniqueAirports
     * @param items {FlightPoint[]}
     * @return {Airport[]}
     * @private
     */
    _getUniqueAirports(items) {
        let container = {},
            result = [];

        items.forEach(function (item) {
            let airport = item.getAirport();

            container[airport.getCode()] = airport;
        });

        Object.keys(container).forEach((key) => {
            result.push(container[key]);
        });

        return result;
    }

    /**
     * @method _getUniqueAirlines
     * @param items {Flight[]}
     * @return {*[]}
     * @private
     */
    _getUniqueAirlines(items) {
        let container = {},
            result = [];

        items.forEach(function (item) {
            let company = item.getAirlineCompany();

            container[company.getName()] = company;
        });

        Object.keys(container).forEach((key) => {
            result.push(container[key]);
        });

        return result;
    }

    /**
     * @method _buildForwardFlight
     * @param route {Route}
     * @returns {Object}
     * @private
     */
    _buildForwardFlight(route) {
        return new this._FlightEntity()
            .setDeparture(route.getDeparture().getEntity())
            .setArrival(route.getArrival().getEntity())
            .getEntity();
    }

    /**
     * @method _buildBackwardFlight
     * @param route {Route}
     * @returns {Object|null}
     * @private
     */
    _buildBackwardFlight(route) {
        let result = null;

        if (route.getComebackDate()) {
            result = new this._FlightEntity()
                .setDeparture(route.getArrival().getEntity())
                .setArrival(route.getDeparture().getEntity())
                .getEntity()
        }

        return result;
    }

    /**
     * @method _buildTransferAttributes
     * @param items {Ticket[]}
     * @return {Array}
     * @private
     */
    _buildTransferAttributes(items) {
        let directFlight = {
                "id": "direct_flight",
                "name": "Без пересадок"
            },
            oneTransfer = {
                "id": "one_transfer",
                "name": "1 пересадка"
            },
            anyQuantity = {
                "id": "any_quantity",
                "name": "Любое количество"
            },
            flights = this._getAllFlights(items),
            result = [];

        if (this._hasDirectFlight(flights)) {
            result.push(directFlight);
        }

        if (this._hasOneTransfer(flights)) {
            result.push(oneTransfer);
        }

        if (this._hasAnyTransfers(flights)) {
            result.push(anyQuantity);
        }

        return result;
    }

    /**
     * @method _buildDepartureAirportAttributes
     * @param items {Ticket[]}
     * @return {Array}
     * @private
     */
    _buildDepartureAirportAttributes(items) {
        return this
            ._getUniqueAirports(this._getAllForwardFlights(items).map((item) => item.getDeparture()))
            .map(function (item) {
                return {
                    id: item.getCode(),
                    name: item.getName()
                }
            });
    }

    /**
     * @method _buildArrivalAirportAttributes
     * @param items {Ticket[]}
     * @return {Array}
     * @private
     */
    _buildArrivalAirportAttributes(items) {
        return this
            ._getUniqueAirports(this._getAllForwardFlights(items).map((item) => item.getArrival()))
            .map(function (item) {
                return {
                    id: item.getCode(),
                    name: item.getName()
                }
            });
    }

    /**
     * @method _buildAirlineAttributes
     * @param items {Ticket[]}
     * @return {Array}
     * @private
     */
    _buildAirlineAttributes(items) {
        return this._getUniqueAirlines(this._getAllFlights(items)).map(function (item) {
            return {
                "id": item.getName(),
                "name": item.getName()
            }
        });
    }

    /**
     * @method buildFilter
     * @param route {Route}
     * @param items {Ticket[]}
     * @returns {Filter}
     * @public
     */
    buildFilter(route, items) {
        return new this._TicketFilter({
            time: {
                forwardFlight: this._buildForwardFlight(route),
                backwardFlight: this._buildBackwardFlight(route)
            },
            attributes: [
                {
                    "id": "transfer",
                    "name": "Пересадки",
                    "items": this._buildTransferAttributes(items)
                },
                {
                    "id": "airportDeparture",
                    "name": "Аэропорт вылета",
                    "items": this._buildDepartureAirportAttributes(items)
                },
                {
                    "id": "airportArrival",
                    "name": "Аэропорт прилета",
                    "items": this._buildArrivalAirportAttributes(items)
                },
                {
                    "id": "baggage",
                    "name": "Багаж",
                    "items": [
                        {
                            "id": "allow",
                            "name": "Есть багаж"
                        },
                        {
                            "id": "not_allow",
                            "name": "Нет багажа"
                        }
                    ]
                },
                {
                    "id": "airline",
                    "name": "Авиакомпании",
                    "items": this._buildAirlineAttributes(items)
                }
            ]
        });
    }
}

export default FilterBuilder;
