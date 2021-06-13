import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class TicketRules extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flight: this._getDefaultFlight(),
            isActive: false
        };

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._toggleActiveState = this._toggleActiveState.bind(this);
        this._changeFlight = this._changeFlight.bind(this);
    }

    /**
     * @method _isActive
     * @returns {boolean}
     * @private
     */
    _isActive() {
        return this.state.isActive;
    }

    /**
     * @method _isActiveFlight
     * @param flight {Flight}
     * @returns {boolean}
     * @private
     */
    _isActiveFlight(flight) {
        return (this.state.flight && this.state.flight.getId()) === flight.getId();
    }

    /**
     * @method _toggleActiveState
     * @returns {TicketRules}
     * @private
     */
    _toggleActiveState() {
        this.setState({isActive: !this.state.isActive});

        return this;
    }

    /**
     * @method _getDefaultFlight
     * @returns {Flight|null}
     * @private
     */
    _getDefaultFlight() {
        let indexOfFirstFlight = 0

        return this._getTicket().getForwardFlights()[indexOfFirstFlight] || null;
    }

    /**
     * @method _getTicket
     * @returns {Ticket}
     * @private
     */
    _getTicket() {
        return this.props.ticket;
    }

    /**
     * @method _getRules
     * @returns {string}
     * @private
     */
    _getRules() {
        return this.state.flight ? this.props.rules[this.state.flight.getId()] : "";
    }

    /**
     * @method _changeFlight
     * @param flight {Flight}
     * @returns {TicketRules}
     * @private
     */
    _changeFlight(flight) {
        this.setState({flight});

        return this;
    }

    /**
     * @method _renderFlights
     * @param items {Flight[]}
     * @returns {Array}
     * @private
     */
    _renderFlights(items) {
        return items.map((item) => {
            return (
                <li
                    key={item.getId()}
                    className={classNames({active: this._isActiveFlight(item)})}
                    onClick={() => {this._changeFlight(item)}}
                >
                    {`${item.getDeparture().getCityName()} - ${item.getArrival().getCityName()}`}
                </li>
            );
        });
    }

    /**
     * @method _renderForwardFlights
     * @returns {Array}
     * @private
     */
    _renderForwardFlights() {
        return this._renderFlights(this._getTicket().getForwardFlights());
    }

    /**
     * @method _renderBackwardFlights
     * @returns {Array}
     * @private
     */
    _renderBackwardFlights() {
        return this._renderFlights(this._getTicket().getBackwardFlights());
    }

    render() {
        return (
            <div className="booking__ticket-rules">
                <div className="ticket-rules__header" onClick={this._toggleActiveState}>
                    <span className="ticket-rules__title">{this._stringsResource.ticketRules}</span>

                    <span
                        className={classNames("icon", {
                            "icon-chevron-down": !this._isActive(),
                            "icon-chevron-up": this._isActive()
                        })}
                    />
                </div>

                {this._isActive() && (
                    <div className="ticket-rules__body">
                        <ul className="ticket-rules__flights">
                            {this._renderForwardFlights()}
                            {this._renderBackwardFlights()}
                        </ul>

                        <div className="ticket-rules__description">
                            {this._getRules()}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

TicketRules.propTypes = {
    ticket: PropTypes.instanceOf(Object).isRequired,
    rules: PropTypes.instanceOf(Object)
};

TicketRules.defaultProps = {
    rules: {}
};

export default TicketRules;
