import React from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Transfer extends React.Component {
    constructor(props) {
        super(props);

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method _hasItems
     * @return {boolean}
     * @private
     */
    _hasItems() {
        return Boolean(this._getItemsCount());
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
     * @method
     * @param flight {Flight}
     * @returns {React.element}
     * @private
     */
    _buildTooltipByTransfer(flight) {
        return (
            <div>
                <div className="mb-6">
                    <strong className="text-small">
                        {flight.getArrival().getAirport().getName()} ({flight.getArrival().getCityName()}, {flight.getArrival().getCountryName()})
                    </strong>
                </div>

                <div className="text-small line-height-1-5">
                    Время пересадки: {flight.getTotalTime()}
                </div>

                <div className="text-small line-height-1-5">
                    Прилет: {flight.getArrival().getDate()} {flight.getArrival().getTime()}
                </div>

                <div className="text-small line-height-1-5">
                    Вылет: {flight.getDeparture().getDate()} {flight.getDeparture().getTime()}
                </div>
            </div>
        );
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

                <Tooltip
                    title={this._buildTooltipByTransfer(item)}
                    placement="bottom"
                    arrow
                >
                    <div className="transit-flight-point__airport-code">
                        {item.getArrival().getAirport().getCode()}
                    </div>
                </Tooltip>
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

                    {this._hasItems() && (
                        <div className="flight-transfer__transfer-count">
                            {this._stringsResource.transfers}: {this._getItemsCount()}
                        </div>
                    )}
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
