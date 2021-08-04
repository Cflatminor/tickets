import React from "react";
import PropTypes from "prop-types";

import Ticket from "components/ticket/Ticket";

import Filter from "../filter/Filter";

class Offers extends React.Component {
    constructor(props) {
        super(props);

        this._select = this._select.bind(this);
        this._changeFilter = this._changeFilter.bind(this);
    }

    /**
     * @method _hasFilter
     * @returns {boolean}
     * @private
     */
    _hasFilter() {
        return Boolean(this.props.filter);
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
     * @method _select
     * @param ticket {Ticket}
     * @returns {Offers}
     * @private
     */
    _select(ticket) {
        this.props.select(ticket);

        return this;
    }

    /**
     * @method _changeFilter
     * @param attributes {Array}
     * @return {Offers}
     * @private
     */
    _changeFilter(attributes) {
        this.props.changeFilter(attributes);

        return this;
    }

    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this._getTickets().map((item) => (
            <Ticket
                key={item.getId()}
                item={item}
                select={this._select}
            />
        ));
    }

    render() {
        return (
            <div className="search__offers offers">
                <div className="offers__body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3">
                                {this._hasFilter() && (
                                    <Filter
                                        filter={this.props.filter}
                                        change={this._changeFilter}
                                    />
                                )}
                            </div>

                            <div className="col-lg-9">
                                <div className="offers__items">
                                    {this._renderItems()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Offers.propTypes = {
    filter: PropTypes.instanceOf(Object),
    items: PropTypes.instanceOf(Array),
    select: PropTypes.func,
    changeFilter: PropTypes.func
};

Offers.defaultProps = {
    filter: null,
    items: [],
    select: () => {},
    changeFilter: () => {}
};

export default Offers;
