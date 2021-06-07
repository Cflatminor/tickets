import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class TicketRules extends React.Component {
    constructor(props) {
        super(props);

        this.rules = {
            1: `
                16.PENALTIES.
                CHANGES
                ANY TIME
                CHANGES PERMITTED FOR REISSUE/REVALIDATION.
                NOTE - TEXT BELOW NOT VALIDATED FOR AUTOPRICING.
                REPRICING CONDITIONS-
                --------------------
                A-BEFORE DEPARTURE-
                ITINERARY MUST BE RE-PRICED USING CURRENT FARES
                IN EFFECT ON THE DATE THE TICKET IS REISSUED
                THE ITINERARY MUST MEET ALL RULE PROVISIONS OF
                THE NEWLY TICKETED FARE INCLUDING ADVANCE
                PURCHASE
                --AP MEANS-
                TKT MUST BE PURCHASED A MINIMUM NUMBER OF DAYS
                BEFORE THE FLIGHT DEPARTS
                -
                A CHANGE IS A DATE/FLIGHT/ROUTING CHANGE.
                -
                REFUND/REISSUE CHARGE ONLY APPLIES FOR
                ADULT/CHILD AND INFANT OCCUPYING A SEAT. THESE
                CHARGES WILL NOT APPLY FOR INFANT NOT OCCUPYING A
                SEAT. HOWEVER IF NONREF INFORMATION IS AVAILABLE
                ON TICKET THAT MEANS TICKET CANNOT BE REFUNDED.
                -
                NEW FARE MAY BE LOWER EQUAL OR HIGHER. WHEN THE
                NEW
                -
                ITINERARY RESULTS IN A HIGHER
                FARE THE DIFFERENCE WILL BE COLLECTED AND THE
                CHANGE FEE WILL BE APPLIED.
                -
                CHARGES SHALL NOT BE WAIVED FOR MEDICAL
                REASON
                -
                WHERE THIS FARE IS COMBINED WITH ANOTHER FARE AND
                ONLY ONE FARE COMPONENT IS CHANGED THE PENALTY
                CONDITIONS OF THE CHANGED FARE COMPONENT WILL
                APPLY
                WHEN MORE THAN ONE FARE COMPONENT IS BEING
                CHANGED THE HIGHEST PENALTY OF ALL CHANGED FARE
                COMPONENTS WILL APPLY
                -
                FOR DOMESTIC TURKEY SECTORS - WITHOUT CHARGE
                -
                -
                B-AFTER DEPARTURE-
                -
                THE ITINERARY MUST BE RE-PRICED USING HISTORICAL
                FARES IN EFFECT ON THE ORIGINAL TICKETING DATE.
                THE NEW ITINERARY MUST MEET ALL THE RULE
                PROVISIONS OF THE NEWLY TICKETED FARES SUCH THAT
                THE RECALCULATED FARE COULD HAVE BEEN USED FOR
                THE NEW ITINERARY IF PURCHASED ON THE ORIGINAL
                TICKET ISSUE DATE
                - A CHANGE IS A DATE/FLIGHT/ROUTING CHANGE.
                -
                CHARGE APPLIES PER TRANSACTION - PER PERSON FOR
                ADULT CHILD AND INFANT WITH SEAT.
                INFANTS WITHOUT A SEAT ARE NOT CHARGED THE FEE
                -
                NEW FARE MAY BE LOWER EQUAL OR HIGHER. WHEN THE
                NEW
                -
                ITINERARY RESULTS IN A HIGHER
                FARE THE DIFFERENCE WILL BE COLLECTED AND THE
                CHANGE FEE WILL BE APPLIED.
                -
                WHERE THIS FARE IS COMBINED WITH ANOTHER FARE AND
                ONLY ONE FARE COMPONENT IS CHANGED THE PENALTY
                CONDITIONS OF THE CHANGED FARE COMPONENT WILL
                APPLY
                WHEN MORE THAN ONE FARE COMPONENT IS BEING
                CHANGED THE HIGHEST PENALTY OF ALL CHANGED FARE
                COMPONENTS WILL APPLY
                --
                CHARGES SHALL NOT BE WAIVED FOR MEDICAL
                REASON
                -
                -
                FOR DOMESTIC TURKEY SECTORS - WITHOUT CHARGE
                -
                -
                NOTE-
                SEQUENTIAL USE OF FLIGHT COUPONS - THIS FARE IS
                ONLY VALID IF THE FLIGHTS ARE TAKEN IN THE BOOKED
                SEQUENCE. OTHERWISE THE FARE WILL BE RECALCULATED
                BASED ON THE ACTUAL FLIGHT ROUTING.
                --
                ANY TIME-
                --
                REVALIDATION/REBOOKING/REROUTING MUST BE
                FINALIZED BEFORE DEPARTURE OF THE ORIGINAL FLIGHT
                BEING CHANGED PROVIDED ALL CONDITIONS EXCEPT
                ADVANCE PURCHASE ARE COMPLIED WITH.
                --
                REISSUE/REBOOKING-
                --
                RESERVATION NEEDS TO CANCELLED AND TICKET NEEDS
                TO REISSUED BEFORE THE ORIGINAL FLIGHT OTHERWISE
                IS ACCEPTED AS NO SHOW
                --
                REFUND-
                --
                FOR ANY REFUND REQUESTS AFTER SCHEDULED FLIGHT
                DEPARTURE TIME RESERVATION HISTORY SHOULD BE
                CHECKED. IF FLIGHT RESERVATION HAS NOT BEEN
                CANCELLED BEFORE SCHEDULED FLIGHT DEPARTURE TIME
                FARE RULES APPY AND AUTOMATED REFUND CAN BE USED.
                HOWEVER IF FLIGHT RESERVATION HAS BEEN CANCELLED
                BEFORE SCHEDULED FLIGHT DEPARTURE TIME THEN NO
                SHOW PENALTY SHOULD NOT BE CHARGED AND THUS THE
                TICKET SHOULD BE REFUNDED MANUALLY.
                --
                ANY TIME
                CHARGE EUR 60.00 FOR NO-SHOW.
                NOTE - TEXT BELOW NOT VALIDATED FOR AUTOPRICING.
                --
                REISSUE/REBOOKING-
                --
                RESERVATION NEEDS TO CANCELLED AND TICKET NEEDS
                TO REISSUED BEFORE THE ORIGINAL FLIGHT OTHERWISE
                IS ACCEPTED AS NO SHOW
                --
                CHARGES SHALL NOT BE WAIVED FOR MEDICAL REASON -
                --
                WHEN THE CHANGE REQUEST IS MADE IN THE EVENT OF N
                NO SHOW REISSUE AND NO SHOW CHARGES MUST BE C
                COLLECTED TOGETHER
                --
                CANCELLATIONS
                TICKET IS NON-REFUNDABLE IN CASE OF NO-SHOW.
                NOTE - TEXT BELOW NOT VALIDATED FOR AUTOPRICING.
                --
                REFUND-
                --
                FOR ANY REFUND REQUESTS AFTER SCHEDULED FLIGHT
                DEPARTURE TIME RESERVATION HISTORY SHOULD BE
                CHECKED. IF FLIGHT RESERVATION HAS NOT BEEN
                CANCELLED BEFORE SCHEDULED FLIGHT DEPARTURE TIME
                FARE RULES APPY AND AUTOMATED REFUND CAN BE USED.
                HOWEVER IF FLIGHT RESERVATION HAS BEEN CANCELLED
                BEFORE SCHEDULED FLIGHT DEPARTURE TIME THEN NO
                SHOW PENALTY SHOULD NOT BE CHARGED AND THUS THE
                TICKET SHOULD BE REFUNDED MANUALLY.
                --
                NOT PERMITTED EVEN FOR MEDICAL REASON
                FOR NON REFUNDABLE TICKETS THE -YR- SURCHARGE
                WILL NOT BE REFUNDED.
                BEFORE DEPARTURE
                TICKET IS NON-REFUNDABLE IN CASE OF CANCEL/REFUND.
                NOTE - TEXT BELOW NOT VALIDATED FOR AUTOPRICING.
                NOT PERMITTED EVEN FOR MEDICAL REASON
                FOR NON REFUNDABLE TICKETS THE -YR- SURCHARGE
                WILL NOT BE REFUNDED.
                -
                -
                WHEN FARES ARE COMBINED THE MOST RESTRICTIVE
                CONDITIONS APPLY
                -
                THE ORIGINAL NON-REFUNDABLE AMOUNT REMAINS
                NON-REFUNDABLE.
                AFTER DEPARTURE
                TICKET IS NON-REFUNDABLE IN CASE OF CANCEL/REFUND.
                NOTE - TEXT BELOW NOT VALIDATED FOR AUTOPRICING.
                NOT PERMITTED EVEN FOR MEDICAL REASON
                FOR NON REFUNDABLE TICKETS THE -YR- SURCHARGE
                WILL NOT BE REFUNDED.
                -
                -
                WHEN FARES ARE COMBINED THE MOST RESTRICTIVE
                CONDITIONS APPLY
                -
                THE ORIGINAL NON-REFUNDABLE AMOUNT REMAINS
                NON-REFUNDABLE.            
            `,
            2: "правила для рейса Стамбул - Киев"
        };

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
        return this.state.flight ? this.rules[this.state.flight.getId()] : "";
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
    ticket: PropTypes.instanceOf(Object).isRequired
};

// TicketRules.defaultProps = {
//     ticket: []
// };

export default TicketRules;
