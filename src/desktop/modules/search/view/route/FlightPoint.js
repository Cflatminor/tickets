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

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._selectItem = this._selectItem.bind(this);
        this._changeQueryString = this._changeQueryString.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    /**
     * @public
     * @method componentDidUpdate
     * @return {void}
     */
    componentDidUpdate() {
        if (!_.isEqual(this.props.airport, this.state.selectedItem)) {
            this._setCurrentItem(this.props.airport);
        }
    }

    /**
     * @method _toggleFocusedState
     * @param state {boolean}
     * @return {FlightPoint}
     * @private
     */
    _toggleFocusedState(state) {
        this.setState({
            isFocused: state
        });

        return this;
    }

    /**
     * @method _getEmptyItem
     * @return {{getName: (function(): string), getCode: (function(): string), getAirports: (function(): *[])}}
     * @private
     */
    _getEmptyItem() {
        return {
            getName: () => "",
            getCode: () => "",
            getAirports: () => []
        };
    }

    /**
     * @method _getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @return {FlightPoint}
     * @private
     */
    _getItemsByQuery(query, success) {
        if (query.length !== this.state.selectedItem.getName().length) {
            this._selectItem(this._getEmptyItem());
        }

        this.props.getItemsByQuery(query, success);

        return this;
    }

    /**
     * @method _setCurrentItem
     * @param item {Object}
     * @return {FlightPoint}
     * @private
     */
    _setCurrentItem(item) {
        this.setState({selectedItem: item});

        return this;
    }

    /**
     * @method _selectItem
     * @param item {Object}
     * @return {FlightPoint}
     * @private
     */
    _selectItem(item) {
        this.props.change(item);

        return this;
    }

    /**
     * @method _changeQueryString
     * @param event {Object}
     * @param opts {Object}
     * @return {FlightPoint}
     * @private
     */
    _changeQueryString(event, opts) {
        if (!opts.newValue.length) {
            this._selectItem(this._getEmptyItem());
        }

        return this;
    }

    /**
     * @method _onFocus
     * @return {FlightPoint}
     * @private
     */
    _onFocus() {
        this._toggleFocusedState(true);

        return this;
    }

    /**
     * @method _onBlur
     * @param event {Object}
     * @return {FlightPoint}
     * @private
     */
    _onBlur(event) {
        if (!event.target.value.length) {
            this._toggleFocusedState(false);
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
                    queryString={this.state.selectedItem.getName()}
                    getItemsByQuery={this._getItemsByQuery}
                    selectItem={this._selectItem}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    onChange={this._changeQueryString}
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
