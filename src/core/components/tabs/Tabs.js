import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Box from "../Box";

class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this._changeTab = this._changeTab.bind(this);
        this._renderTabView = this._renderTabView.bind(this);
        this._renderTabs = this._renderTabs.bind(this);
    }

    /**
     * @private
     * @method _hasItems
     * @returns {boolean}
     */
    _hasItems() {
        return Boolean(this.props.items.length);
    }

    /**
     * @private
     * @method _changeTab
     * @param tab {Object}
     * @returns {Function}
     */
    _changeTab(tab) {
        return (event) => {
            event.preventDefault();
            this.props.onChange(tab);
        };
    }

    /**
     * @private
     * @method _getClassNames
     * @returns {string}
     */
    _getClassNames() {
        return classnames(
            "tabs",
            {
                "tabs--horizontal": this.props.horizontal
            },
            this.props.className
        );
    }

    /**
     * @private
     * @method _getShadowSize
     * @returns {number}
     */
    _getShadowSize() {
        return Number(this.props.type === "shadow");
    }

    /**
     * @private
     * @method _renderTabView
     * @returns {boolean|string}
     */
    _renderTabView() {
        let item = this.props.items.find((tab) => tab.active);

        return Boolean(this._hasItems() && item) && <div key={item.name}>{item.component}</div>;
    }

    /**
     * @private
     * @method _renderTabs
     * @returns {[string]}
     */
    _renderTabs() {
        return this.props.items.map((item) => (
            <li
                className={classnames("items__item", {
                    active: item.active
                })}
                key={item.name}
            >
                {item.href && (
                    <a href={item.href || "#"} onClick={this._changeTab(item)}>
                        {item.description} {item.badge && <span>{item.badge}</span>}
                    </a>
                )}

                {!item.href && (
                    <span className="item__link" onClick={this._changeTab(item)}>
                        {item.description} {item.badge && <span>{item.badge}</span>}
                    </span>
                )}
            </li>
        ));
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={this._getClassNames()}>
                <Box className="tabs__header" shadow={this._getShadowSize()}>
                    <ul className="tabs__items">{this._renderTabs()}</ul>
                </Box>

                <div className={classnames("tabs__body")}>{this._renderTabView()}</div>
            </div>
        );
    }
}

Tabs.propTypes = {
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    type: PropTypes.oneOf(["default", "shadow"]),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            href: PropTypes.string,
            active: PropTypes.bool,
            component: PropTypes.node.isRequired
        })
    ),
    onChange: PropTypes.func
};

Tabs.defaultProps = {
    className: "",
    horizontal: false,
    type: "default",
    items: [],
    onChange() {}
};

export default Tabs;
