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
            forwardFlight: true,
            filter: {
                forwardFlight: {
                    departure: {},
                    arrival: {}
                },
                backwardFlight: {
                    departure: {},
                    arrival: {}
                }
            }
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
        this._changeTimeForDepartureForwardFlight = this._changeTimeForDepartureForwardFlight.bind(this);
        this._changeTimeForDepartureBackwardFlight = this._changeTimeForDepartureBackwardFlight.bind(this);
        this._changeTimeForArrivalForwardFlight = this._changeTimeForArrivalForwardFlight.bind(this);
        this._changeTimeForArrivalBackwardFlight = this._changeTimeForArrivalBackwardFlight.bind(this);
        this._change = this._change.bind(this);
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
     * @method _changeTimeForDepartureForwardFlight
     * @param range {Object}
     * @return {TimeFilter}
     * @private
     */
    _changeTimeForDepartureForwardFlight(range) {
        let filter = this.state.filter;

        filter.forwardFlight.departure = range;

        this.setState({filter}, this._change);

        return this;
    }

    /**
     * @method _changeTimeForDepartureBackwardFlight
     * @param range {Object}
     * @return {TimeFilter}
     * @private
     */
    _changeTimeForDepartureBackwardFlight(range) {
        let filter = this.state.filter;

        filter.backwardFlight.departure = range;

        this.setState({filter}, this._change);

        return this;
    }

    /**
     * @method _changeTimeForArrivalForwardFlight
     * @param range {Object}
     * @return {TimeFilter}
     * @private
     */
    _changeTimeForArrivalForwardFlight(range) {
        let filter = this.state.filter;

        filter.forwardFlight.arrival = range;

        this.setState({filter}, this._change);

        return this;
    }

    /**
     * @method _changeTimeForArrivalBackwardFlight
     * @param range {Object}
     * @return {TimeFilter}
     * @private
     */
    _changeTimeForArrivalBackwardFlight(range) {
        let filter = this.state.filter;

        filter.backwardFlight.arrival = range;

        this.setState({filter}, this._change);

        return this;
    }

    /**
     * @method _change
     * @return {TimeFilter}
     * @private
     */
    _change() {
        this.props.change(this.state.filter);

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
                            title={this._getTitles().getForwardFlight().getDepartureCityName()}
                            change={this._changeTimeForDepartureForwardFlight}
                        />

                        <TimeRange
                            title={this._getTitles().getForwardFlight().getArrivalCityName()}
                            change={this._changeTimeForArrivalForwardFlight}
                        />
                    </div>

                    {this._hasBackwardFlight() && (
                        <div
                            className={classNames("time-filter__backward-flight", {
                                "d-none": this._isActiveForwardFlight()
                            })}
                        >
                            <TimeRange
                                title={this._getTitles().getBackwardFlight().getDepartureCityName()}
                                change={this._changeTimeForDepartureBackwardFlight}
                            />

                            <TimeRange
                                title={this._getTitles().getBackwardFlight().getArrivalCityName()}
                                change={this._changeTimeForArrivalBackwardFlight}
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
