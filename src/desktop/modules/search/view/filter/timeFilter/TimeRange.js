import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import TimeSlider from "components/timeSlider/TimeSlider";

class TimeFilter extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {};
    }

    _getDepartureCityName() {
        return this.props.flight.getDeparture().city.name;
    }

    _getArrivalCityName() {
        return this.props.flight.getArrival().city.name;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="time-range">
                <div className="time-range__header">
                    {this._getDepartureCityName()} &#8212; {this._getArrivalCityName()}
                </div>

                <div className="time-range__body">
                    <TimeSlider />
                </div>
            </div>
        );
    }
}

TimeFilter.propTypes = {
    flight: PropTypes.instanceOf(Object),
    change: PropTypes.func
};

TimeFilter.defaultProps = {
    flight: null,
    change: () => {}
};

export default TimeFilter;
