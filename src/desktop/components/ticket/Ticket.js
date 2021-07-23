import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Price from "components/price/Price";

import FlightPoint from "./FlightPoint";
import Transfer from "./Transfer";

class Ticket extends React.Component {
    constructor(props) {
        super(props);

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._select = this._select.bind(this);
    }

    /**
     * @method _hasBackwardFlights
     * @return {boolean}
     * @private
     */
    _hasBackwardFlights() {
        return Boolean( this._getItem().getBackwardFlights().length);
    }

    /**
     * @method _getItem
     * @returns {Ticket}
     * @private
     */
    _getItem() {
        return this.props.item;
    }

    /**
     * @method _select
     * @returns {Ticket}
     * @private
     */
    _select() {
        this.props.select(this._getItem());

        return this;
    }

    /**
     * @method _renderFlight
     * @param item {Flight}
     * @returns {React.element}
     * @private
     */
    _renderFlight(item) {
        return (
            <div className="ticket__flight flight" key={item.getId()}>
                <div className="flight__header">
                    <div className="flight__airline-company">
                        <img
                            src={item.getAirlineCompany().getLogo().getSrc()}
                            alt={item.getAirlineCompany().getLogo().getAlt()}
                            title={item.getAirlineCompany().getLogo().getTitle()}
                        />
                    </div>

                    <div className={classNames("flight__baggage", {
                            "flight__baggage--allow": item.getBaggage().isAllow()
                        })}
                    >
                        <span className="icon icon-tag" />

                        {item.getBaggage().isAllow() && (
                            this._stringsResource.withBaggage
                        )}

                        {!item.getBaggage().isAllow() && (
                            this._stringsResource.noBaggage
                        )}
                    </div>
                </div>

                <div className="flight__body">
                    <div className="flight__aircraft-identifier">
                        <div className="flight__flight-number">
                            {item.getFlightNumber()}
                        </div>

                        <div className="flight__aircraft-number">
                            {item.getAircraftNumber()}
                        </div>
                    </div>

                    <div className="flight__departure">
                        <FlightPoint flightPoint={item.getDeparture()} />
                    </div>

                    <div className="flight__about-route">
                        <div className="flight__total-time">
                            {this._stringsResource.inTransit}: {item.getTotalTime()}
                        </div>

                        <div className="flight__transfers">
                            <Transfer items={item.getTransfers()} />
                        </div>
                    </div>

                    <div className="flight__arrival">
                        <FlightPoint flightPoint={item.getArrival()} />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @method _renderForwardFlights
     * @returns {Array}
     * @private
     */
    _renderForwardFlights() {
        return this._getItem().getForwardFlights().map((item) => this._renderFlight(item));
    }

    /**
     * @method _renderBackwardFlights
     * @returns {Array}
     * @private
     */
    _renderBackwardFlights() {
        return this._getItem().getBackwardFlights().map((item) => this._renderFlight(item));
    }

    render() {
        return (
            <div className="ticket">
                <div className="ticket__body">
                    <div className="ticket__flights">
                        <div className="ticket__forward-flights">
                            {this._renderForwardFlights()}
                        </div>

                        {this._hasBackwardFlights() && (
                            <div className="ticket__backward-flights">
                                {this._renderBackwardFlights()}
                            </div>
                        )}
                    </div>
                </div>

                <div className="ticket__footer">
                    <div className="ticket__buy-block">
                        <Price
                            value={this._getItem().getPrice().getCurrent()}
                            currency={this._getItem().getPrice().getCurrency()}
                        />

                        <button
                            type="button"
                            className="btn-default btn-md ticket__to-buy"
                            onClick={this._select}
                        >
                            {this._stringsResource.buy}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Ticket.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    select: PropTypes.func
};

Ticket.defaultProps = {
    select: () => {}
};

export default Ticket;
