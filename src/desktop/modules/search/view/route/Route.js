import React from "react";

import Destination from "./Destination";
import DeparturePoint from "./DeparturePoint";
import ArrivalDate from "./ArrivalDate";
import DepartureDate from "./DepartureDate";
import Passengers from "./Passengers";

class Route extends React.Component {
    render() {
        return (
            <div className="search__route route">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="route__form d-flex">
                                <div className="route__inputs d-flex w-100">
                                    <DeparturePoint />

                                    <Destination />

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