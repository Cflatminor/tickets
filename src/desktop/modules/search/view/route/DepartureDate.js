import React from "react";
import Datepicker from "react-day-picker";
import classnames from "classnames";

class DepartureDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelectingDate: false,
            selectedDate: ""
        };

        this._onDateSelect = this._onDateSelect.bind(this);
        this._toggleDatepicker = this._toggleDatepicker.bind(this);
        this._inputChange = this._inputChange.bind(this);
    }

    _onDateSelect(day/*, modifiers, event*/) {
        this.setState({
            selectedDate: `${day.getDate()}.${day.getMonth()}.${day.getFullYear()}`
        });

        return this;
    }

    _inputChange(event) {
        this.setState({
            selectedDate: event.target.value
        });
    }

    _toggleDatepicker() {
        setTimeout(() => {
            this.setState((prevState) => ({
                isSelectingDate: !prevState.isSelectingDate
            }));
        }, 200);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="outlined-text-form">
                <input
                    type="text"
                    className="form-control"
                    required
                    value={this.state.selectedDate}
                    onChange={this._inputChange}
                    onFocus={this._toggleDatepicker}
                    onBlur={this._toggleDatepicker}
                />

                <label>
                    Обратно <span className="icon icon-cart-check" />
                </label>

                <Datepicker
                    className={classnames("", {"d-none": !this.state.isSelectingDate})}
                    onDayClick={this._onDateSelect}
                />
            </div>
        );
    }
}

export default DepartureDate;
