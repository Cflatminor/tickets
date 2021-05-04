import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class FlightPoint extends React.Component {
    constructor(props) {
        super(props);

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method _getFlightPoint
     * @returns {FlightPoint}
     * @private
     */
    _getFlightPoint() {
        return this.props.flightPoint;
    }

    render() {
        return (
            <div className="flight-point">
                <div className="flight-point__header">
                    <div className="flight-point__time">
                        {this._getFlightPoint().getTime()}
                    </div>

                    <div className="flight-point__date">
                        {this._getFlightPoint().getDate()}
                    </div>
                </div>

                <div className="flight-point__body">
                    <div className="flight-point__location">
                        <span className="flight-point__city-name">
                            {this._getFlightPoint().getCityName()}
                        </span>
                        &nbsp;
                        <span className="flight-point__airport-code">
                            {this._getFlightPoint().getAirport().getCode()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

FlightPoint.propTypes = {
    flightPoint: PropTypes.instanceOf(Object).isRequired
};

export default FlightPoint;
