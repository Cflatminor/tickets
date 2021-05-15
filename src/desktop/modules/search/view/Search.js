import React from "react";

import TicketEntity from "app/core/entities/ticket/Ticket";

import Ticket from "components/ticket/Ticket";

import Header from "./header/Header";
import Filter from "./filter/Filter";

class Search extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _filter
         * @type {Filter}
         */
        this._filter = props.options.initialData.filter;

        this._tickets = [
            {
                "id": "jbdfklm",
                "sticker": {
                    "description": "ЛОУКОСТ|ЛУЧШАЯ ЦЕНА|САМЫЙ БЫСТРЫЙ"
                },
                "forward": [
                    {
                        "id": 1,
                        "airlineCompany": {
                            "logo": {
                                src: {
                                    original: "https://static.tickets.ua/img/logos_s/TK.png?780da6a93cce40cbc11d59f963a7272c454c4d6a"
                                },
                                alt: "Turkish Airlines",
                                title: "Turkish Airlines"
                            },
                            "name": "Turkish Airlines",
                            "description": "",
                            "rating": 5
                        },
                        "flightNumber": "PC-1552",
                        "aircraftNumber": "Airbus A321",
                        "baggage": {},
                        "departure": {
                            "countryName": "Украина",
                            "cityName": "Киев",
                            "airport": {
                                "name": "Борисполь",
                                "code": "КВР"
                            },
                            "time": "12:45",
                            "date": "12.04.21"
                        },
                        "arrival": {
                            "countryName": "Турция",
                            "cityName": "Стамбул",
                            "airport": {
                                "name": "Аэропорт Стамбула",
                                "code": "IST"
                            },
                            "time": "15:45",
                            "date": "12.04.21"
                        },
                        "transfers": [
                            {
                                "id": 3,
                                "airlineCompany": {
                                    "logo": {},
                                    "name": "",
                                    "description": "",
                                    "rating": 5
                                },
                                "flightNumber": "PC-1552",
                                "aircraftNumber": "Airbus A321",
                                "baggage": {},
                                "departure": {
                                    "countryName": "Страна вылета",
                                    "cityName": "Город вылета",
                                    "airport": {
                                        "name": "Название аэропорта",
                                        "code": "DDD"
                                    },
                                    "time": "17:45",
                                    "date": "23.05.2021"
                                },
                                "arrival": {
                                    "countryName": "Страна прибытия",
                                    "cityName": "Город прибытия",
                                    "airport": {
                                        "name": "Название аэропорта",
                                        "code": "DDD"
                                    },
                                    "time": "15:45",
                                    "date": "23.05.2021"
                                },
                                "totalTime": "2ч (общее время пересадки)"
                            },
                            {
                                "id": 5,
                                "airlineCompany": {
                                    "logo": {},
                                    "name": "",
                                    "description": "",
                                    "rating": 5
                                },
                                "flightNumber": "PC-1552",
                                "aircraftNumber": "Airbus A321",
                                "baggage": {},
                                "departure": {
                                    "countryName": "Страна вылета",
                                    "cityName": "Город вылета",
                                    "airport": {
                                        "name": "Название аэропорта",
                                        "code": "RGK"
                                    },
                                    "time": "20:45",
                                    "date": "23.05.2021"
                                },
                                "arrival": {
                                    "countryName": "Страна прибытия",
                                    "cityName": "Город прибытия",
                                    "airport": {
                                        "name": "Airport name",
                                        "code": "RGK"
                                    },
                                    "time": "18:45",
                                    "date": "23.05.2021"
                                },
                                "totalTime": "2ч (общее время пересадки)"
                            }
                        ],
                        "totalTime": "18ч 45мин"
                    }
                ],
                "backward": [
                    {
                        "id": 2,
                        "airlineCompany": {
                            "logo": {
                                src: {
                                    original: "https://static.tickets.ua/img/logos_s/TK.png?780da6a93cce40cbc11d59f963a7272c454c4d6a"
                                },
                                alt: "Turkish Airlines",
                                title: "Turkish Airlines"
                            },
                            "name": "Turkish Airlines",
                            "description": "",
                            "rating": 5
                        },
                        "flightNumber": "PC-1552",
                        "aircraftNumber": "Airbus A321",
                        "baggage": {},
                        "departure": {
                            "countryName": "Турция",
                            "cityName": "Стамбул",
                            "airport": {
                                "name": "Аэропорт Стамбула",
                                "code": "IST"
                            },
                            "time": "12:45",
                            "date": "12.04.21"
                        },
                        "arrival": {
                            "countryName": "Украина",
                            "cityName": "Киев",
                            "airport": {
                                "name": "Борисполь",
                                "code": "КВР"
                            },
                            "time": "10:45",
                            "date": "15.04.21"
                        },
                        "transfers": [
                            {
                                "id": 4,
                                "airlineCompany": {
                                    "logo": {},
                                    "name": "",
                                    "description": "",
                                    "rating": 5
                                },
                                "flightNumber": "PC-1552",
                                "aircraftNumber": "Airbus A321",
                                "baggage": {},
                                "departure": {
                                    "countryName": "Страна вылета",
                                    "cityName": "Город вылета",
                                    "airport": {
                                        "name": "Название аэропорта",
                                        "code": "fff"
                                    },
                                    "time": "20:45",
                                    "date": "28.05.2021"
                                },
                                "arrival": {
                                    "countryName": "Страна прибытия",
                                    "cityName": "Город прибытия",
                                    "airport": {
                                        "name": "Название аэропорта",
                                        "code": "fff"
                                    },
                                    "time": "18:45",
                                    "date": "28.05.2021"
                                },
                                "totalTime": "2ч (общее время пересадки)"
                            }
                        ],
                        "totalTime": "18ч 45мин"
                    }
                ],
                "price": {
                    "current": 3000,
                    "old": 3450,
                    "currency": {
                        "code": "uah",
                        "description": "грн"
                    }
                }
            }
        ];
    }

    /**
     * @private
     * @method _getTickets
     * @returns {Ticket[]}
     */
    _getTickets() {
        return this._tickets.map((item) => new TicketEntity(item));
    }

    /**
     * @method _renderTickets
     * @returns {Array}
     * @private
     */
    _renderTickets() {
        return this._getTickets().map((item) => (
            <Ticket key={item.getId()} item={item} />
        ));
    }

    render() {
        return (
            <section className="search">
                <Header />

                <div className="search__body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3">
                                <Filter filter={this._filter} />
                            </div>

                            <div className="col-lg-9">
                                {this._renderTickets()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Search;
