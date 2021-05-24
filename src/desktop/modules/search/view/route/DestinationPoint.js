import React from "react";
import classnames from "classnames";

import Autocomplete from "core/components/autocomplete/Autocomplete";

class DestinationPoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        };

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    _getItemsByQuery(query, success) {
        let items = ["qw", "qwe", "qwer", "qwert", "qwerty", "qwertyu"],
            result = items
                .filter((item) => item.includes(query))
                .map((item) => ({getName: () => item}));

        if (query.length > 2) {
            success(result);
        } else {
            success([]);
        }
    }

    _onFocus() {
        this.setState({
            isFocused: true
        });
    }

    _onBlur(event) {
        if (!event.target.value.length) {
            this.setState({
                isFocused: false
            });
        }
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
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                />

                <label>
                    Куда
                </label>
            </div>
        );
    }
}

export default DestinationPoint;
