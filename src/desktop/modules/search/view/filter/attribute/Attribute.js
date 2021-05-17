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
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this._getItems().map((item, i) => (
            <AttributeValue
                item={item}
                key={i}
                change={this.props.change}
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
