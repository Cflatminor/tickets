import React from "react";

import classNames from "classnames";

import ServiceClassEnum from "app/core/utilities/enum/serviceClass";

import RouteEntity from "app/core/entities/route/Route";

import SearchService from "app/core/services/search";

import Ticket from "components/ticket/Ticket";

import Header from "./header/Header";
import Filter from "./filter/Filter";
import Offers from "./offers/Offers";
import Booking from "./booking/Booking";

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

        /**
         * @property _serviceClassEnum
         * @type {Enum}
         */
        this._serviceClassEnum = ServiceClassEnum.getInstance();

        this._getTicketRules = this._getTicketRules.bind(this);
        this._selectTicket = this._selectTicket.bind(this);
        this._cancelBooking = this._cancelBooking.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this._getTickets();

            SearchService
                .getInstance()
                .getFlightPoint(
                    "stambul",
                    (items) => {
                        console.log(items);
                    },
                    (e) => {
                        console.log(e);
                    }
                );
        }, 2000);
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
     * @method _getTickets
     * @returns {Search}
     * @private
     */
    _getTickets() {
        this
            ._toggleLoader(true)
            ._getPresenter()
            .getTicketsByRoute(this._buildRoute(), (items, filter) => {
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
     * @method _buildRoute
     * @returns {Route}
     * @private
     */
    _buildRoute() {
        return new RouteEntity()
            .setDepartureAirportCode("IST")
            .setDepartureDate("20.06.21")
            .setArrivalAirportCode("SVG")
            .setArrivalDate("25.06.21")
            .setAdultPassengersCount(2)
            .setChildPassengersCount(1)
            .setBabyPassengersCount(0)
            .setServiceClass(this._serviceClassEnum.getComfortAsValue());
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
                <Header />

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
            </section>
        );
    }
}

export default Search;
