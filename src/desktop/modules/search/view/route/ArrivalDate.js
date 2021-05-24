import React from "react";
import classnames from "classnames";
import DayPickerInput from 'react-day-picker/DayPickerInput';

import Strings from "core/utilities/strings";

class ArrivalDate extends React.Component {
    constructor(props) {
        super(props);

        this.strings = Strings.getInstance();

        this.state = {
            selectedDate: "",
            isFocused: false,
            isEmpty: true
        };

        this._clearDate = this._clearDate.bind(this);
        this._handleDayChange = this._handleDayChange.bind(this);
        this._inputChange = this._inputChange.bind(this);
        this._toggleDatepicker = this._toggleDatepicker.bind(this);
    }

    _clearDate() {
        this.setState({
            selectedDate: ""
        }, () => {
            // console.log(this.state.selectedDate);
        });

        return this;
    }

    _handleDayChange(selectedDate, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();

        this.setState({
            selectedDate,
            isEmpty: !input.value.trim()
            // isValidDay: typeof selectedDay !== 'undefined',
            // isDisabled: modifiers.disabled === true,
        });
    }

    _inputChange(event) {
        this.setState({
            selectedDate: event.target.value
        });
    }

    _toggleDatepicker(state) {
        this.setState(() => ({
            isFocused: state
        }));

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        const MONTHS = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];
        const WEEKDAYS_LONG = [
            'Воскресение',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];
        const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

        return (
            <div
                className={classnames("outlined-text-form arrival-date", {focused: (this.state.isFocused || !this.state.isEmpty)})}
            >
                <DayPickerInput
                    formatDate={(date) => this.strings.formatShortDate(date)}
                    format="DD-MM-YYYY"
                    value={this.state.selectedDate}
                    onDayChange={this._handleDayChange}
                    selectedDay={this.state.selectedDate}
                    dayPickerProps={{
                        months: MONTHS,
                        weekdaysLong: WEEKDAYS_LONG,
                        weekdaysShort: WEEKDAYS_SHORT
                    }}
                    inputProps={{
                        placeholder: "",
                        onFocus: () => this._toggleDatepicker(true),
                        onBlur: () => this._toggleDatepicker(false)
                    }}
                />

                <label>
                    Туда
                </label>

                {this.state.selectedDate && (
                    <span className="clear-icon" onClick={this._clearDate} />
                )}
            </div>
        );
    }
}

export default ArrivalDate;
