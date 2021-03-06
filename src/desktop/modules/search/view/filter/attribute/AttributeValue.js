import React from "react";
import PropTypes from "prop-types";

class AttributeValue extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @method _getItem
     * @returns {Object}
     * @private
     */
    _getItem() {
        return this.props.item;
    }

    /**
     * @private
     * @method _change
     * @param item {Object}
     * @param isActive {boolean}
     * @returns {AttributeValue}
     */
    _change(item, isActive) {
        this.props.change(item, isActive);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        let item = this.props.item;

        return (
            <div className="item">
                <label className="custom-input--checkbox">
                    <input
                        type="checkbox"
                        onChange={(e) => this._change(item, e.target.checked)}
                    />

                    <span className="custom-input__state">
                        <span className="custom-input__animation-bg" />
                    </span>

                    <span className="custom-input__name">
                        {item.getName()}
                    </span>
                </label>
            </div>
        );
    }
}

AttributeValue.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.func
};

AttributeValue.defaultProps = {
    change: () => {}
};

export default AttributeValue;
