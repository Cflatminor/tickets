import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Autocomplete from "core/components/autocomplete/Autocomplete";

class FlightPoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: this.props.airport,
            isFocused: false
        };

        this._setEmptyItem = this._setEmptyItem.bind(this);
        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._selectItem = this._selectItem.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _getItemsByQuery(query, success) {
        if (query.length !== this.state.selectedItem.getName().length) {
            this._setEmptyItem();
        }

        return this.props.getItemsByQuery(query, success);
    }

    _setEmptyItem() {
        this.props.change({
            getName: () => "",
            getCode: () => "",
            getAirports: () => []
        });

        return this;
    }

    _selectItem(item) {
        this.props.change(item);

        return this;
    }

    _onFocus() {
        this.setState({
            isFocused: true
        });

        return this;
    }

    _onBlur(event) {
        if (!event.target.value.length) {
            this.setState({
                isFocused: false
            });
        }

        return this;
    }

    _onChange(event, opts) {
        if (!opts.newValue.length) {
            this._setEmptyItem();
        }

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className={classnames("outlined-text-form", {focused: this.state.isFocused})}>
                <Autocomplete
                    placeholder=""
                    getItemsByQuery={this._getItemsByQuery}
                    selectItem={this._selectItem}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    onChange={this._onChange}
                />

                <label>
                    {this.props.title}
                </label>

                <span className="city-code">
                    { this.props.airport.getCode() }
                </span>
            </div>
        );
    }
}

FlightPoint.propTypes = {
    title: PropTypes.string,
    getItemsByQuery: PropTypes.func,
    change: PropTypes.func,
    airport: PropTypes.instanceOf(Object).isRequired
};

FlightPoint.defaultProps = {
    title: "",
    getItemsByQuery: () => {},
    change: () => {}
};

export default FlightPoint;
