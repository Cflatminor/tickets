import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Price from "components/price/Price";
import Ticket from "components/ticket/Ticket";

import Passengers from "./passengers/Passengers";

class Booking extends React.Component {
    constructor(props) {
        super(props);

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._cancel = this._cancel.bind(this);
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
     * @method _getTitle
     * @returns {string}
     * @private
     */
    _getTitle() {
        return this._hasBackwardFlights() ? this._stringsResource.roundTripFlight : this._stringsResource.oneWayFlight;
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

                                <div className="page-section bg-white">
                                    <Passengers />
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
