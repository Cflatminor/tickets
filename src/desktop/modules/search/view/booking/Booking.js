import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Price from "components/price/Price";
import Ticket from "components/ticket/Ticket";

import TicketRules from "./ticketRules/TicketRules";
import Passengers from "./passengers/Passengers";

class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forceValidate: false
        };

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._forceChangePassengers = this._forceChangePassengers.bind(this);
        this._changePassengers = this._changePassengers.bind(this);
        this._cancel = this._cancel.bind(this);
        this._toBuy = this._toBuy.bind(this);
    }

    /**
     * @method _hasBackwardFlights
     * @returns {boolean}
     * @private
     */
    _hasBackwardFlights() {
        return Boolean(this._getTicket().getBackwardFlights().length);
    }

    /**
     * @method _isForceValidate
     * @returns {boolean}
     * @private
     */
    _isForceValidate() {
        return this.state.forceValidate;
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
     * @private
     * @method _getTickets
     * @returns {Ticket[]}
     */
    _getTickets() {
        return this.props.items;
    }

    /**
     * @method _setForceValidateState
     * @param state {boolean}
     * @param callback {Function}
     * @returns {Booking}
     * @private
     */
    _setForceValidateState(state, callback = () => {}) {
        this.setState({forceValidate: state}, callback);

        return this;
    }

    /**
     * @method _getTitle
     * @returns {string}
     * @private
     */
    _getTitle() {
        return this._hasBackwardFlights() ? this._stringsResource.roundTripFlight : this._stringsResource.oneWayFlight;
    }

    _getPassengers(callback) {

    }

    /**
     * @method _changePassengers
     * @param passengers {Object}
     * @param email {string}
     * @returns {Booking}
     * @private
     */
    _forceChangePassengers(passengers, email) {
        console.log("_forceChangePassengers", passengers, email);

        return this;
    }

    /**
     * @method _changePassengers
     * @param passengers {Object}
     * @param email {string}
     * @returns {Booking}
     * @private
     */
    _changePassengers(passengers, email) {
        console.log(passengers, email);

        return this;
    }

    /**
     * @method _cancel
     * @returns {Booking}
     * @private
     */
    _cancel() {
        this.props.cancel();

        return this;
    }

    /**
     * @method _toBuy
     * @returns {Booking}
     * @private
     */
    _toBuy() {
        this._setForceValidateState(true, () => {
            this._setForceValidateState(false);
        });

        return this;
    }

    render() {
        return (
            <div className="search__booking booking">
                <div className="booking__body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="page-section bg-white">
                                    <div className="booking__about-flight">
                                        <div className="about-flight__header">
                                            <button
                                                type="button"
                                                className="booking__to-cancel reset-btn-styles"
                                                onClick={this._cancel}
                                            >
                                                <span className="icon icon-arrow-left" />
                                            </button>

                                            <span className="about-flight__title">
                                                {this._getTitle()}:
                                            </span>
                                        </div>

                                        <div className="about-flight__body">
                                            <Ticket item={this._getTicket()} />
                                        </div>
                                    </div>
                                </div>

                                <div className="page-section p-0 bg-white">
                                    <TicketRules ticket={this._getTicket()} />
                                </div>

                                <div className="page-section bg-white">
                                    <Passengers
                                        forceValidate={this._isForceValidate()}
                                        change={this._changePassengers}
                                        forceChange={this._forceChangePassengers}
                                    />
                                </div>

                                <div className="page-section bg-white">
                                    <div className="booking__checkout">
                                        <div>
                                            <span className="checkout__total">
                                                {this._stringsResource.total}:
                                            </span>

                                            <Price value={this._getTicket().getPrice().getCurrent()} />
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn-success btn-md"
                                                onClick={this._toBuy}
                                            >
                                                {this._stringsResource.buy}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="booking__footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Booking.propTypes = {
    ticket: PropTypes.instanceOf(Object).isRequired,
    cancel: PropTypes.func
};

Booking.defaultProps = {
    cancel: () => {}
};

export default Booking;
