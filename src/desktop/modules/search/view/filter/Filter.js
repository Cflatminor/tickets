import React from "react";
import PropTypes from "prop-types";

import TimeFilter from "./timeFilter/TimeFilter";
import Attribute from "./attribute/Attribute";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _timeFilter
         * @type {Object}
         * @private
         */
        this._timeFilter = {};

        /**
         * @property _currentAttributes
         * @type {Array}
         * @private
         */
        this._currentAttributes = [];

        this._changeTime = this._changeTime.bind(this);
        this._changeAttributes = this._changeAttributes.bind(this);
    }

    /**
     * @method _getForwardFlight
     * @return {Flight}
     * @private
     */
    _getForwardFlight() {
        return this.props.filter.getForwardFlight();
    }

    /**
     * @method _getBackwardFlight
     * @return {Flight}
     * @private
     */
    _getBackwardFlight() {
        return this.props.filter.getBackwardFlight();
    }

    /**
     * @method _getAttributeById
     * @param id {string}
     * @return {Object}
     * @private
     */
    _getAttributeById(id) {
        return this._currentAttributes.find((item) => item.id === id);
    }

    /**
     * @method _addAttribute
     * @param attribute {Object}
     * @param values {Array}
     * @return {Filter}
     * @private
     */
    _addAttribute(attribute, values) {
        let attr = this._getAttributeById(attribute.getId());

        if (attr) {
            attr.values = values;
        } else {
            this._currentAttributes.push({
                id: attribute.getId(),
                values
            })
        }

        return this;
    }

    /**
     * @method _changeTime
     * @param filter {Object}
     * @return {Filter}
     * @private
     */
    _changeTime(filter) {
        this._timeFilter = filter;

        this.props.change({
            time: this._timeFilter,
            attributes: this._currentAttributes
        });

        return this;
    }

    /**
     * @method _changeAttributes
     * @param attributeValues {Array}
     * @param attribute {Object}
     * @return {Filter}
     * @private
     */
    _changeAttributes(attributeValues, attribute) {
        this._addAttribute(attribute, attributeValues);

        this.props.change({
            time: this._timeFilter,
            attributes: this._currentAttributes
        });

        return this;
    }

    /**
     * @method _renderAttributes
     * @returns {Array}
     * @private
     */
    _renderAttributes() {
        return this.props.filter.getAttributes().map((item) => (
            <Attribute
                key={item.getId()}
                attribute={item}
                change={this._changeAttributes}
            />
        ));
    }

    render() {
        return (
            <div className="search__filter filter">
                <div className="filter__body">
                    <div className="filter__time">
                        <TimeFilter
                            forwardFlight={this._getForwardFlight()}
                            backwardFlight={this._getBackwardFlight()}
                            change={this._changeTime}
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
