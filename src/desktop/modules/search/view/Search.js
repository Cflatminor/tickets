import React from "react";

import classNames from "classnames";

import Ticket from "components/ticket/Ticket";

import Header from "./header/Header";
import Filter from "./filter/Filter";
import Offers from "./offers/Offers";
import Booking from "./booking/Booking";
import FAQ from "./faq/FAQ";

class Search extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _filter
         * @type {Filter}
         */
        this._filter = props.options.initialData.filter;

        this.state = {
            loading: false,
            tickets: [],
            filter: null,
            ticket: null
        }

        this._getTicketsByRoute = this._getTicketsByRoute.bind(this);
        this._getTicketRules = this._getTicketRules.bind(this);
        this._toSearchTickets = this._toSearchTickets.bind(this);
        this._selectTicket = this._selectTicket.bind(this);
        this._cancelBooking = this._cancelBooking.bind(this);
    }

    /**
     * @method _hasTicket
     * @returns {boolean}
     * @private
     */
    _hasTicket() {
        return Boolean(this.state.ticket);
    }

    /**
     * @method _hasTickets
     * @returns {boolean}
     * @private
     */
    _hasTickets() {
        return Boolean(this.state.tickets.length);
    }

    /**
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Search}
     * @private
     */
    _toggleLoader(state) {
        this.setState({loading: state});

        return this;
    }

    /**
     * @method _getPresenter
     * @returns {Presenter}
     * @private
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @method _getTicketsByRoute
     * @param route {Route}
     * @returns {Search}
     * @private
     */
    _getTicketsByRoute(route) {
        this
            ._toggleLoader(true)
            ._getPresenter()
            .getTicketsByRoute(route, (items, filter) => {
                this
                    ._setTickets(items)
                    ._setFilter(filter)
                    ._toggleLoader(false);
            }, () => {
                this._toggleLoader(false);
            });

        return this;
    }

    /**
     * @private
     * @method _getTicketsFromState
     * @returns {Ticket[]}
     */
    _getTicketsFromState() {
        return this.state.tickets;
    }

    /**
     * @method _setTickets
     * @param items {Ticket[]}
     * @returns {Search}
     * @private
     */
    _setTickets(items) {
        this.setState({tickets: items});

        return this;
    }

    /**
     * @method _getCurrentTicket
     * @returns {null|Ticket}
     * @private
     */
    _getCurrentTicket() {
        return this.state.ticket;
    }

    /**
     * @method _setCurrentTicket
     * @param ticket {Ticket}
     * @returns {Search}
     * @private
     */
    _setCurrentTicket(ticket) {
        this.setState({ticket});

        return this;
    }

    /**
     * @method _getTicketRules
     * @param ticket {Ticket}
     * @param callback {Function}
     * @returns {Search}
     * @private
     */
    _getTicketRules(ticket, callback) {
        this
            ._toggleLoader(true)
            ._getPresenter()
            .getTicketRules(
                ticket,
                (rules) => {
                    callback(rules);
                    this._toggleLoader(false);
                },
                () => {
                    this._toggleLoader(false);
                }
            );

        return this;
    }

    /**
     * @method
     * @param filter {Filter}
     * @returns {Search}
     * @private
     */
    _setFilter(filter) {
        this.setState({filter});

        return this;
    }

    /**
     * @method _toSearchTickets
     * @param route {Route}
     * @return {Search}
     * @private
     */
    _toSearchTickets(route) {
        this._clearSearchResults()._getTicketsByRoute(route);

        return this;
    }

    /**
     * @method _clearSearchResults
     * @return {Search}
     * @private
     */
    _clearSearchResults() {
        this.setState({
            tickets: [],
            filter: null,
            ticket: null
        });

        return this;
    }

    /**
     * @method _selectTicket
     * @param ticket {Ticket}
     * @returns {Search}
     * @private
     */
    _selectTicket(ticket) {
        this._setCurrentTicket(ticket);

        return this;
    }

    /**
     * @method _cancelBooking
     * @returns {Search}
     * @private
     */
    _cancelBooking() {
        this._setCurrentTicket(null);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="search">
                <Header searchTickets={this._toSearchTickets} />

                <div className={classNames("search__body", {loading: this.state.loading})}>
                    {!this._hasTicket() && this._hasTickets() && (
                        <Offers
                            filter={this.state.filter}
                            items={this._getTicketsFromState()}
                            select={this._selectTicket}
                        />
                    )}

                    {this._hasTicket() && (
                        <Booking
                            ticket={this._getCurrentTicket()}
                            getTicketRules={this._getTicketRules}
                            cancel={this._cancelBooking}
                        />
                    )}
                </div>

                <FAQ />
            </section>
        );
    }
}

export default Search;
