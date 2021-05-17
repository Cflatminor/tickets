import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import TimeRange from "./TimeRange";

class TimeFilter extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            forwardFlight: true
        };
    }

    /**
     * @method _isActiveForwardFlight
     * @returns {boolean}
     * @private
     */
    _isActiveForwardFlight() {
        return this.state.forwardFlight;
    }

    /**
     * @method
     * @param toForwardFlight {boolean}
     * @returns {TimeFilter}
     * @private
     */
    _toggleFlightDirection(toForwardFlight) {
        this.setState({forwardFlight: toForwardFlight});

        return this;
    }

    _getForwardFlight() {
        return this.props.forwardFlight;
    }

    _getBackwardFlight() {
        return this.props.backwardFlight;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="time-filter">
                <div className="time-filter__header">
                    Время вылета и прибытия

                    <div>
                        <button type="button" className="btn-default btn-md">
                            Туда
                        </button>

                        <button type="button" className="btn-default btn-md">
                            Обратно
                        </button>
                    </div>
                </div>

                <div className="time-filter__body">
                    <div className="time-filter__forward-flight">
                        <TimeRange
                            flight={this._getForwardFlight()}
                        />

                        <TimeRange
                            flight={this._getForwardFlight()}
                        />
                    </div>

                    <div className="time-filter__backward-flight">
                        <TimeRange
                            flight={this._getBackwardFlight()}
                        />

                        <TimeRange
                            flight={this._getBackwardFlight()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

TimeFilter.propTypes = {
    forwardFlight: PropTypes.instanceOf(Object),
    backwardFlight: PropTypes.instanceOf(Object),
    change: PropTypes.func
};

TimeFilter.defaultProps = {
    departure: null,
    arrival: null,
    change: () => {}
};

export default TimeFilter;
