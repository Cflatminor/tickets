import React from "react";
import classnames from "classnames";

import Autocomplete from "core/components/autocomplete/Autocomplete";

class DestinationPoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {
                getName: () => "",
                getCode: () => ""
            },
            isFocused: false
        };

        this._getItemsByQuery = this._getItemsByQuery.bind(this);
        this._selectItem = this._selectItem.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    _getItemsByQuery(query, success) {
        if (query.length < 2) {
            this.setState({
                selectedItem: {
                    getName: () => "",
                    getCode: () => ""
                }
            });
        }

        if (query.length > 2) {
            let items = [
                    {
                        country_code: "TR",
                        code: "IST",
                        name: "Стамбул",
                        airports: [
                            {
                                full_name: "Стамбул Новый аэропорт, Стамбул",
                                code: "IST",
                                name: "Стамбул Новый аэропорт"
                            },
                            {
                                full_name: "Сабиха Гёкчен, Стамбул",
                                code: "SAW",
                                name: "Сабиха Гёкчен"
                            }
                        ]
                    },
                    {
                        country_code: "RU",
                        code: "STW",
                        name: "Ставрополь",
                        airports: [
                            {
                                full_name: "Ставрополь, Ставрополь",
                                code: "STW",
                                name: "Ставрополь"
                            }
                        ]
                    },
                    {
                        country_code: "NO",
                        code: "SVG",
                        name: "Ставангер",
                        airports: [
                            {
                                full_name: "Сула, Ставангер",
                                code: "SVG",
                                name: "Сула"
                            }
                        ]
                    }
                ],
                result = items
                    .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
                    .map((item) => ({
                        getName: () => item.name,
                        getCode: () => item.code
                    }));

            success(result);
        } else {
            success([]);
        }
    }

    _selectItem(item) {
        this.setState({
            selectedItem: item
        });

        return this;
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
                    selectItem={this._selectItem}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                />

                <label>
                    Куда
                </label>

                <span className="city-code">
                    { this.state.selectedItem.getCode() }
                </span>
            </div>
        );
    }
}

export default DestinationPoint;
