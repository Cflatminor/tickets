import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Accordion from "components/accordion/Accordion";

class FAQ extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;
    }

    /**
     * @method _hasTitle
     * @return {boolean}
     * @private
     */
    _hasTitle() {
        return Boolean(this.props.title);
    }

    /**
     * @private
     * @method _getItems
     * @returns {Array}
     */
    _getItems() {
        return this.props.items;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className={classnames("faq", this.props.className)}>
                {this._hasTitle() && (
                    <div className="faq__header">
                        <h2 className="faq__title color-black f-weight-5">
                            {this.props.title}
                        </h2>
                    </div>
                )}

                <div className="faq__body">
                    <Accordion
                        items={this._getItems()}
                        asHtml
                        panelProps={{
                            iconOpen: this.props.iconOpen,
                            iconClose: this.props.iconClose
                        }}
                    />
                </div>
            </section>
        );
    }
}

FAQ.propTypes = {
    items: PropTypes.instanceOf(Array),
    iconOpen: PropTypes.string,
    iconClose: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string
};

FAQ.defaultProps = {
    items: [],
    iconOpen: "icon-plus",
    iconClose: "icon-minus",
    className: "",
    title: ""
};

export default FAQ;
