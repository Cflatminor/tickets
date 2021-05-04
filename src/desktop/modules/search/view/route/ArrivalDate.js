import React from "react";
import classnames from "classnames";
import Datepicker from "react-day-picker";

class ArrivalDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: "",
            isSelectingDate: false
        };

        this._onDateSelect = this._onDateSelect.bind(this);
        this._inputChange = this._inputChange.bind(this);
        this._toggleDatepicker = this._toggleDatepicker.bind(this);
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
                    Туда <span className="icon icon-cart-check" />
                </label>

                <Datepicker
                    className={classnames("", {"d-none": !this.state.isSelectingDate})}
                    onDayClick={this._onDateSelect}
                    months={MONTHS}
                    weekdaysLong={WEEKDAYS_LONG}
                    weekdaysShort={WEEKDAYS_SHORT}
                />
            </div>
        );
    }
}

export default ArrivalDate;
