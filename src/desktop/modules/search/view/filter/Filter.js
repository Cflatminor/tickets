import React from "react";
import PropTypes from "prop-types";

import TimeFilter from "./timeFilter/TimeFilter";
import Attribute from "./attribute/Attribute";

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    _getForwardFlight() {
        return {
            getDeparture() {
                return {
                    city: {
                        name: "Киев"
                    }
                };
            },
            getArrival() {
                return {
                    city: {
                        name: "Стамбул"
                    }
                };
            }
        };
    }

    _getBackwardFlight() {
        return {
            getDeparture() {
                return {
                    city: {
                        name: "Стамбул"
                    }
                };
            },
            getArrival() {
                return {
                    city: {
                        name: "Киев"
                    }
                };
            }
        };
    }

    /**
     * @method _renderAttributes
     * @returns {Array}
     * @private
     */
    _renderAttributes() {
        return this.props.filter.getAttributes().map((item) => (
            <Attribute key={item.getId()} attribute={item} />
        ));
    }

    render() {
        return (
            <div className="search__filter filter">
                <div className="filter__body">
                    <strong>FILTER</strong>

                    <div className="filter__time">
                        <TimeFilter
                            forwardFlight={this._getForwardFlight()}
                            backwardFlight={this._getBackwardFlight()}
                        />
                    </div>

                    <div className="filter__attributes">
                        {this._renderAttributes()}
                    </div>
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    filter: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.func
};

Filter.defaultProps = {
    change: () => {}
};

export default Filter;
