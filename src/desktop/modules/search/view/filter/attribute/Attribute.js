import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import AttributeValue from "./AttributeValue";

class Attribute extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _minItemsCount
         * @type {number}
         * @private
         */
        this._minItemsCount = 2;

        /**
         * @property _currentAttributeValues
         * @type {Array}
         */
        this._currentAttributeValues = [];

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isOpen: false,
            buttonName: this._getButtonName(false)
        };

        this._toggleCollapse = this._toggleCollapse.bind(this);
        this._change = this._change.bind(this);
    }

    /**
     * @private
     * @method _isShowButton
     * @returns {boolean}
     */
    _isShowButton() {
        return this._getAttribute().getItems().length > this._minItemsCount;
    }

    /**
     * @private
     * @method _toggleCollapse
     * @returns {Attribute}
     */
    _toggleCollapse() {
        this.setState((prevState) => {
            let isOpen = !prevState.isOpen;

            return {
                buttonName: this._getButtonName(isOpen),
                isOpen
            };
        });

        return this;
    }

    /**
     * @method _getAttribute
     * @returns {Object}
     * @private
     */
    _getAttribute() {
        return this.props.attribute;
    }

    /**
     * @private
     * @method _getButtonName
     * @param isOpen {boolean}
     * @returns {string}
     */
    _getButtonName(isOpen) {
        return isOpen ? this._stringsResource.show.less : this._stringsResource.show.all;
    }

    /**
     * @private
     * @method _getItems
     * @returns {Array}
     */
    _getItems() {
        let result = this._getAttribute().getItems();

        if (!this.state.isOpen) {
            result = result.slice(0, this._minItemsCount);
        }

        return result;
    }

    /**
     * @method _getAttributeIndex
     * @param item {Object}
     * @return {number}
     * @private
     */
    _getAttributeIndex(item) {
        return this._currentAttributeValues.findIndex((currentItem) => currentItem.getId() === item.getId());
    }

    /**
     * @method
     * @param item
     * @param isActive
     * @return {Attribute}
     * @private
     */
    _updateAttributeValues(item, isActive) {
        if (isActive) {
            this._addAttributeValue(item);
        } else {
            this._removeAttributeValue(item);
        }

        return this;
    }

    /**
     * @method _addAttributeValue
     * @param item {Object}
     * @return {Attribute}
     * @private
     */
    _addAttributeValue(item) {
        this._currentAttributeValues.push(item);

        return this;
    }

    /**
     * @method _removeAttributeValue
     * @param item {Object}
     * @return {Attribute}
     * @private
     */
    _removeAttributeValue(item) {
        this._currentAttributeValues.splice(this._getAttributeIndex(item), 1);

        return this;
    }

    /**
     * @method _change
     * @param item {Object}
     * @param isActive {boolean}
     * @return {Attribute}
     * @private
     */
    _change(item, isActive) {
        this._updateAttributeValues(item, isActive);

        this.props.change(this._currentAttributeValues, this._getAttribute());

        return this;
    }

    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this._getItems().map((item, i) => (
            <AttributeValue
                item={item}
                key={i}
                change={this._change}
            />
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="attribute">
                <div className="attribute__header">
                    {this._getAttribute().getName()}
                </div>

                <div className="attribute__body">
                    <div className="attribute__items">
                        {this._renderItems()}
                    </div>
                </div>

                {this._isShowButton() && (
                    <div className="attribute__footer">
                        <button
                            type="button"
                            className="btn-link btn-sm"
                            onClick={this._toggleCollapse}
                        >
                            {this.state.buttonName}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

Attribute.propTypes = {
    attribute: PropTypes.instanceOf(Object),
    change: PropTypes.func
};

Attribute.defaultProps = {
    change: () => {}
};

export default Attribute;
