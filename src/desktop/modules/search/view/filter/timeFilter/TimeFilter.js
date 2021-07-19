import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilities/strings";

import TimeRange from "./TimeRange";

class TimeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forwardFlight: true
        };

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property _strings
         * @private
         */
        this._strings = Strings.getInstance();

        this._toForwardFlight = this._toForwardFlight.bind(this);
        this._toBackwardFlight = this._toBackwardFlight.bind(this);
    }

    /**
     * @method _hasBackwardFlight
     * @return {boolean}
     * @private
     */
    _hasBackwardFlight() {
        return Boolean(this._getBackwardFlight());
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
     * @method _toggleFlightDirection
     * @param toForwardFlight {boolean}
     * @returns {TimeFilter}
     * @private
     */
    _toggleFlightDirection(toForwardFlight) {
        this.setState({forwardFlight: toForwardFlight});

        return this;
    }

    /**
     * @method _getForwardFlight
     * @return {Object|null}
     * @private
     */
    _getForwardFlight() {
        return this.props.forwardFlight;
    }

    /**
     * @method _getBackwardFlight
     * @return {Object|null}
     * @private
     */
    _getBackwardFlight() {
        return this.props.backwardFlight;
    }

    /**
     * @method _getTitles
     * @return {Object}
     * @private
     */
    _getTitles() {
        let self = this;

        return {
            getForwardFlight() {
                return {
                    getDepartureCityName() {
                        return self._buildTitleForDeparturePoint(self._getForwardFlight());
                    },
                    getArrivalCityName() {
                        return self._buildTitleForArrivalPoint(self._getForwardFlight());
                    }
                };
            },
            getBackwardFlight() {
                return {
                    getDepartureCityName() {
                        return self._buildTitleForDeparturePoint(self._getBackwardFlight());
                    },
                    getArrivalCityName() {
                        return self._buildTitleForArrivalPoint(self._getBackwardFlight());
                    }
                };
            }
        };
    }

    /**
     * @method _buildTitleForDeparturePoint
     * @param flight {Flight}
     * @return {string}
     * @private
     */
    _buildTitleForDeparturePoint(flight) {
        return this._strings.writeLine(
            this._stringsResource.departureFromTheCity,
            [flight.getDeparture().getCityName()]
        );
    }

    /**
     * @method _buildTitleForArrivalPoint
     * @param flight {Flight}
     * @return {string}
     * @private
     */
    _buildTitleForArrivalPoint(flight) {
        return this._strings.writeLine(
            this._stringsResource.arrivalInTheCity,
            [flight.getArrival().getCityName()]
        );
    }

    /**
     * @method _toForwardFlight
     * @return {TimeFilter}
     * @private
     */
    _toForwardFlight() {
        this._toggleFlightDirection(true);

        return this;
    }

    /**
     * @method _toBackwardFlight
     * @return {TimeFilter}
     * @private
     */
    _toBackwardFlight() {
        this._toggleFlightDirection(false);

        return this;
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
                    {this._stringsResource.departureAndArrivalTime}

                    {this._hasBackwardFlight() && (
                        <div className="mt-16 d-flex">
                            <button
                                type="button"
                                className={classNames(
                                    "time-filter__to-forward-flight reset-btn-styles btn-md",
                                    {active: this._isActiveForwardFlight()}
                                )}
                                onClick={this._toForwardFlight}
                            >
                                {this._stringsResource.thitherward}
                            </button>

                            <button
                                type="button"
                                className={classNames("time-filter__to-backward-flight reset-btn-styles btn-md", {
                                    active: !this._isActiveForwardFlight()
                                })}
                                onClick={this._toBackwardFlight}
                            >
                                {this._stringsResource.backward}
                            </button>
                        </div>
                    )}
                </div>

                <div className="time-filter__body">
                    <div
                        className={classNames("time-filter__forward-flight", {
                            "d-none": !this._isActiveForwardFlight()
                        })}
                    >
                        <TimeRange
                            flight={this._getForwardFlight()}
                            title={this._getTitles().getForwardFlight().getDepartureCityName()}
                        />

                        <TimeRange
                            flight={this._getForwardFlight()}
                            title={this._getTitles().getForwardFlight().getArrivalCityName()}
                        />
                    </div>

                    {this._hasBackwardFlight() && (
                        <div
                            className={classNames("time-filter__backward-flight", {
                                "d-none": this._isActiveForwardFlight()
                            })}
                        >
                            <TimeRange
                                flight={this._getBackwardFlight()}
                                title={this._getTitles().getBackwardFlight().getDepartureCityName()}
                            />

                            <TimeRange
                                flight={this._getBackwardFlight()}
                                title={this._getTitles().getBackwardFlight().getArrivalCityName()}
                            />
                        </div>
                    )}
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
    forwardFlight: null,
    backwardFlight: null,
    change: () => {}
};

export default TimeFilter;
