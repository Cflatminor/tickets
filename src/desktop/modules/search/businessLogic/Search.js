class Filter {
    constructor(entity) {
        this.entity = entity;
    }

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

class Search {
    constructor(props) {
        this._Repository = props.dependencies.Repository;

        this._TicketEntity = props.dependencies.TicketEntity;
    }

    /**
     * @method _buildFilter
     * @returns {Filter}
     * @private
     */
    _buildFilter() {
        return new Filter({
            attributes: [
                {
                    "id": "transfer",
                    "name": "Пересадки",
                    "items": [
                        {
                            "id": "direct_flight",
                            "name": "Без пересадок"
                        },
                        {
                            "id": "one_transfer",
                            "name": "1 пересадка"
                        },
                        {
                            "id": "any_quantity",
                            "name": "Любое количество"
                        }
                    ]
                },
                {
                    "id": "airportDeparture",
                    "name": "Аэропорт вылета",
                    "items": [
                        {
                            "id": "Борисполь",
                            "name": "Борисполь"
                        },
                        {
                            "id": "Жуляны",
                            "name": "Жуляны"
                        }
                    ]
                },
                {
                    "id": "airportArrival",
                    "name": "Аэропорт прилета",
                    "items": [
                        {
                            "id": "Международный аэропорт Стамбул",
                            "name": "Международный аэропорт Стамбул"
                        },
                        {
                            "id": "Сабиха-Гокен",
                            "name": "Сабиха-Гокен"
                        }
                    ]
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
                    "items": [
                        {
                            "id": "SkyUp",
                            "name": "SkyUp"
                        },
                        {
                            "id": "Pegasus",
                            "name": "Pegasus"
                        },
                        {
                            "id": "Qatar Airways",
                            "name": "Qatar Airways"
                        }
                    ]
                }
            ]
        });
    }

    /**
     * @public
     * @method getTicketsByRoute
     * @param route {Route}
     * @param success {Function}
     * @param error {Function}
     * @returns {Search}
     */
    getTicketsByRoute(route, success, error) {
        this._Repository.getTicketsByRoute(route, (items) => {
            setTimeout(() => {
                success(
                    items.map((item) => new this._TicketEntity(item)),
                    this._buildFilter()
                );
            }, 2000);
        }, error);

        return this;
    }

    /**
     * @public
     * @method getTicketRules
     * @param ticket {Ticket}
     * @param success {Function}
     * @param error {Function}
     * @returns {Search}
     */
    getTicketRules(ticket, success, error) {
        this._Repository.getTicketRules(ticket, (rules) => {
            setTimeout(() => {
                success(rules);
            }, 2000);
        }, error);

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {};

        return new Promise((resolve) => {
            Promise.all([
                // this._getReview(result)
            ]).then(resolve);
        })
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            filter: new Filter(initialData.filter),
            pageInfo
        };
    }
}

export default Search;
