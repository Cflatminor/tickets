import React from "react";
import classnames from "classnames";

import Autocomplete from "core/components/autocomplete/Autocomplete";

class DeparturePoint extends React.Component {
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
            result = items.filter((item) => item.includes(query)).map((item) => ({getName: () => item}));

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

    _onBlur() {
        this.setState({
            isFocused: false
        });
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className={classnames("outlined-text-form", {focused: this.state.isFocused})}>
                {/*<input type="text" className="form-control" required />*/}
                <Autocomplete
                    getItemsByQuery={this._getItemsByQuery}
                    onFocus={this._onFocus}
                    _onBlur={this._onBlur}
                />

                <label>
                    Откуда <span className="icon icon-cart-check" />
                </label>
            </div>
        );
    }
}

export default DeparturePoint;
