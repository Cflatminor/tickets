import React from "react";
import PropTypes from "prop-types";

import Ticket from "components/ticket/Ticket";

import Filter from "../filter/Filter";

class Offers extends React.Component {
    constructor(props) {
        super(props);

        this._select = this._select.bind(this);
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
                                <Filter filter={this.props.filter} />
                            </div>

                            <div className="col-lg-9">
                                {this._renderItems()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Offers.propTypes = {
    filter: PropTypes.instanceOf(Object).isRequired,
    items: PropTypes.instanceOf(Array),
    select: PropTypes.func
};

Offers.defaultProps = {
    items: [],
    select: () => {}
};

export default Offers;