import React from "react";

import TicketEntity from "app/core/entities/ticket/Ticket";

import Ticket from "components/ticket/Ticket";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.tickets = [
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
                                    "countryName": "",
                                    "cityName": "",
                                    "airport": {
                                        "name": "",
                                        "code": ""
                                    },
                                    "time": "",
                                    "date": ""
                                },
                                "arrival": {
                                    "countryName": "",
                                    "cityName": "",
                                    "airport": {
                                        "name": "",
                                        "code": "DDD"
                                    },
                                    "time": "",
                                    "date": ""
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
                                    "countryName": "",
                                    "cityName": "",
                                    "airport": {
                                        "name": "",
                                        "code": ""
                                    },
                                    "time": "",
                                    "date": ""
                                },
                                "arrival": {
                                    "countryName": "",
                                    "cityName": "",
                                    "airport": {
                                        "name": "",
                                        "code": "RGK"
                                    },
                                    "time": "",
                                    "date": ""
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
                                    "countryName": "",
                                    "cityName": "",
                                    "airport": {
                                        "name": "",
                                        "code": ""
                                    },
                                    "time": "",
                                    "date": ""
                                },
                                "arrival": {
                                    "countryName": "",
                                    "cityName": "",
                                    "airport": {
                                        "name": "",
                                        "code": "fff"
                                    },
                                    "time": "",
                                    "date": ""
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
        return this.tickets.map((item) => new TicketEntity(item));
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
                <header className="search__header">
                    <div className="temp">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">

                                    <h1 className="search__title text-center">
                                        Поиск и бронирование билетов
                                    </h1>

                                    <div className="temp__data d-flex">
                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Откуда <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Куда <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Туда <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Обратно <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                1 пассажир <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <button className="btn-default btn-lg to-search-results">
                                            Найти
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {this._renderTickets()}
            </section>
        );
    }
}

export default Search;
