import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import TimeSlider from "components/timeSlider/TimeSlider";

class TimeRange extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
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
                    {this.props.title}
                </div>

                <div className="time-range__body">
                    <TimeSlider />
                </div>
            </div>
        );
    }
}

TimeRange.propTypes = {
    title: PropTypes.string,
    change: PropTypes.func
};

TimeRange.defaultProps = {
    title: "",
    change: () => {}
};

export default TimeRange;
