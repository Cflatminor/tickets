import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Panel from "./panel/Panel";

class Accordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanels: {}
        };
    }

    componentDidMount() {
        if (this.props.isActivePanels) {
            this._toggleActivePanels();
        }
    }

    /**
     * @method _toggleActivePanels
     * @returns {Accordion}
     * @private
     */
    _toggleActivePanels() {
        this.props.items.forEach((item, i) => this._toggleActivePanelsAlone(i));

        return this;
    }

    /**
     * @method _toggleActivePanelsAlone
     * @param id {number}
     * @returns {Accordion}
     * @private
     */
    _toggleActivePanelsAlone(id) {
        this.setState((state) => ({
            activePanels: { ...state.activePanels, [id]: !state.activePanels[id] }
        }));

        return this;
    }

    /**
     * @method _toggleActivePanelsSequentially
     * @param id {number}
     * @returns {Accordion}
     * @private
     */
    _toggleActivePanelsInGroup(id) {
        this.setState(() => ({
            activePanels: { [id]: true }
        }));

        return this;
    }

    /**
     * @method selectItem
     * @param id {number}
     * @returns {Accordion}
     * @public
     */
    selectItem(id) {
        if (this.props.expandable) {
            this._toggleActivePanelsInGroup(id);
        } else {
            this._toggleActivePanelsAlone(id);
        }

        return this;
    }

    /**
     * @method renderPanels
     * @returns {Array}
     */
    renderItems() {
        return this.props.items.map((panel, index) => (
            <Panel
                key={index}
                title={panel.title}
                selectItem={() => this.selectItem(index)}
                active={this.state.activePanels[index]}
                asHtml={this.props.asHtml}
                {...this.props.panelProps}
            >
                {panel.description}
            </Panel>
        ));
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={classnames("accordion", this.props.className)}>
                {this.renderItems()}
            </div>
        );
    }
}

Accordion.propTypes = {
    items: PropTypes.instanceOf(Array),
    panelProps: PropTypes.instanceOf(Object),
    className: PropTypes.string,
    asHtml: PropTypes.bool,
    expandable: PropTypes.bool,
    isActivePanels: PropTypes.bool
};

Accordion.defaultProps = {
    items: [],
    panelProps: {},
    className: "",
    asHtml: false,
    expandable: false,
    isActivePanels: false,
};

export default Accordion;
