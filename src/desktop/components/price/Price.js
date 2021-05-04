import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Numbers from "app/core/utilities/numbers";

class Price extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property format
         * @type {string}
         */
        this.format = "en-US";

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();

        /**
         * @property classes
         * @type {Object}
         */
        this.classes = {
            price: true,
            "price--old": props.oldPrice,
            [props.className]: true
        };
    }

    /**
     * @private
     * @method hasPrice
     * @return {boolean}
     */
    hasPrice() {
        return Boolean(this.props.value);
    }

    /**
     * @private
     * @method hasCurrency
     * @return {boolean}
     */
    hasCurrency() {
        return !this.props.hideCurrency;
    }

    /**
     * @private
     * @method getPrice
     * @returns {string}
     */
    getPrice() {
        return this.numbers.toLocaleString(this.props.value, this.format);
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return this.hasPrice() && (
            <div className={classNames(this.classes)}>
                <span className="price__value">{ this.getPrice() }</span>
                { this.hasCurrency() && <span className="price__currency">{ this.props.currency }</span> }
            </div>
        );
    }
}

Price.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    oldPrice: PropTypes.bool,
    hideCurrency: PropTypes.bool,
    className: PropTypes.string
};

Price.defaultProps = {
    value: 0,
    currency: "грн",
    oldPrice: false,
    hideCurrency: false,
    className: ""
};

export default Price;
