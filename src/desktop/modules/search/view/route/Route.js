import React from "react";

import DestinationPoint from "./DestinationPoint";
import DeparturePoint from "./DeparturePoint";
import ArrivalDate from "./ArrivalDate";
import DepartureDate from "./DepartureDate";
import Passengers from "./Passengers";

class Route extends React.Component {
    constructor(props) {
        super(props);

        this.airports = [
            {
                country_code: "TR",
                code: "IST",
                name: "Стамбул",
                airports: [
                    {
                        full_name: "Стамбул Новый аэропорт, Стамбул",
                        code: "IST",
                        name: "Стамбул Новый аэропорт"
                    },
                    {
                        full_name: "Сабиха Гёкчен, Стамбул",
                        code: "SAW",
                        name: "Сабиха Гёкчен"
                    }
                ]
            },
            {
                country_code: "RU",
                code: "STW",
                name: "Ставрополь",
                airports: [
                    {
                        full_name: "Ставрополь, Ставрополь",
                        code: "STW",
                        name: "Ставрополь"
                    }
                ]
            },
            {
                country_code: "NO",
                code: "SVG",
                name: "Ставангер",
                airports: [
                    {
                        full_name: "Сула, Ставангер",
                        code: "SVG",
                        name: "Сула"
                    }
                ]
            }
        ];

        // this.state = {
        //     arrivalDate: "",
        //     departureDate: "",
        //     departurePoint: {},
        //     destinationPoint: {},
        //     passengers: {}
        // };

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
    }

    // /**
    //  * @private
    //  * @method _setDeparture
    //  * @param point {Object}
    //  * @returns {Route}
    //  */
    // _setDeparture(point) {
    //     this.setState({
    //         departurePoint: point
    //     });
    //
    //     return this;
    // }
    //
    // /**
    //  * @private
    //  * @method _setDestinationPoint
    //  * @param point {Object}
    //  * @returns {Route}
    //  */
    // _setDestinationPoint(point) {
    //     this.setState({
    //         destinationPoint: point
    //     });
    //
    //     return this;
    // }
    //
    // /**
    //  * @private
    //  * @method _setArrivalDate
    //  * @param date {string}
    //  * @return {Route}
    //  */
    // _setArrivalDate(date) {
    //     this.setState({
    //         arrivalDate: date
    //     });
    //
    //     return this;
    // }
    //
    // /**
    //  * @private
    //  * @method _setDepartureDate
    //  * @param date {string}
    //  * @return {Route}
    //  */
    // _setDepartureDate(date) {
    //     this.setState({
    //         departureDate: date
    //     });
    //
    //     return this;
    // }

    _getItemsByQuery(query, success) {
        if (query.length < 3) {
            success([]);
        }

        if (query.length > 2) {
            let result = this.airports
                .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
                .map((item) => ({ // todo autosuggestEntity
                    getName: () => item.name,
                    getCode: () => item.code,
                    getAirports: () => item.airports.map((airport) => ({
                        getName: () => airport.name,
                        getCode: () => airport.code
                    }))
                }));

            success(result);
        } else {
            success([]);
        }
    }

    render() {
        return (
            <div className="search__route route">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="route__form d-flex">
                                <div className="route__inputs d-flex w-100">
                                    <DeparturePoint getItemsByQuery={this._getItemsByQuery} />

                                    <DestinationPoint getItemsByQuery={this._getItemsByQuery} />

                                    <ArrivalDate />

                                    <DepartureDate />

                                    <Passengers />
                                </div>

                                <button
                                    className="btn-default btn-lg to-search-results"
                                    type="button"
                                >
                                    Найти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Route;
