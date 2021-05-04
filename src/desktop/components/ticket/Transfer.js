import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Transfer extends React.Component {
    constructor(props) {
        super(props);

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method _getItems
     * @returns {Flight[]}
     * @private
     */
    _getItems() {
        return this.props.items;
    }

    /**
     * @method _getItemsCount
     * @returns {number}
     * @private
     */
    _getItemsCount() {
        return this.props.items.length;
    }

    /**
     * @method _renderTransfers
     * @returns {Array}
     * @private
     */
    _renderTransfers() {
        return this._getItems().map((item) => (
            <div className="flight-transfer__transit-flight-point" key={item.getId()}>
                <div className="transit-flight-point__marker" />

                <div className="transit-flight-point__airport-code">
                    {item.getArrival().getAirport().getCode()}
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className="flight-transfer">
                <div className="flight-transfer__body">
                    <div className="flight-transfer__route">
                        <div className="flight-transfer__start-flight-point" />

                        {this._renderTransfers()}

                        <div className="flight-transfer__end-flight-point" />
                    </div>

                    <div className="flight-transfer__transfer-count">
                        {this._stringsResource.transfers}: {this._getItemsCount()}
                    </div>
                </div>
            </div>
        );
    }
}

Transfer.propTypes = {
    items: PropTypes.instanceOf(Array)
};

Transfer.defaultProps = {
    items: []
};

export default Transfer;
