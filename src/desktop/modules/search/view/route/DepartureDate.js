import React from "react";
import classnames from "classnames";
import Datepicker from "react-day-picker";
import DayPickerInput from 'react-day-picker/DayPickerInput';

import Strings from "core/utilities/strings";

class ArrivalDate extends React.Component {
    constructor(props) {
        super(props);

        this.strings = Strings.getInstance();

        this.ref = {
            datepicker: React.createRef(),
            input: React.createRef()
        };

        this.state = {
            selectedDate: "",
            isFocused: false,
            isSelectingDate: false
        };

        this._onDateSelect = this._onDateSelect.bind(this);
        this._inputChange = this._inputChange.bind(this);
        this._toggleDatepicker = this._toggleDatepicker.bind(this);
        // this._closeByBlur = this._closeByBlur.bind(this);
    }

    componentDidMount() {
        window.document.addEventListener("click", (e) => {
            // e.stopPropagation();
            // console.log(e.target !== this.ref.datepicker.current);
            //
            // if (
            //     e.target !== this.ref.datepicker.current ||
            //     e.target !== this.ref.input.current
            // ) {
            //     this.setState({
            //         isSelectingDate: false
            //     });
            // }
            // console.log(e.target, this.ref.datepicker.current.dayPicker);
            //
            // if (e.target === this.ref.datepicker.current.dayPicker) {
            //     this.setState({
            //         isSelectingDate: true
            //     });
            // } else if (e.target === this.ref.input.current) {
            //     this.setState({
            //         isSelectingDate: true
            //     });
            // } else {
            //     this.setState({
            //         isSelectingDate: false
            //     });
            // }
        });
    }

    _onDateSelect(day/*, modifiers, event*/) {
        this.setState({
            selectedDate: `${day.getDate()}.${day.getMonth() + 1}.${day.getFullYear()}`,
            isSelectingDate: false
        });

        return this;
    }

    _inputChange(event) {
        this.setState({
            selectedDate: event.target.value
        });
    }

    _toggleDatepicker(state) {
        setTimeout(() => {
            this.setState((prevState) => ({
                isFocused: true
            }));
        });

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
                onClick={() => this._toggleDatepicker(true)}
                className={classnames("outlined-text-form arrival-date", {focused: this.state.isFocused})}
            >
                {/*<DayPickerInput component={(props) => (*/}
                {/*    <input*/}
                {/*        // ref={this.ref.input}*/}
                {/*        type="text"*/}
                {/*        className="form-control"*/}
                {/*        required*/}
                {/*        value={this.state.selectedDate}*/}
                {/*        onChange={this._inputChange}*/}
                {/*        onFocus={() => this._toggleDatepicker(true)}*/}
                {/*        // onBlur={(e) => this._closeByBlur(e)}*/}
                {/*        // onBlur={() => this._toggleDatepicker(false)}*/}
                {/*        {...props}*/}
                {/*    />*/}
                {/*)}*/}
                {/*/>*/}

                <DayPickerInput formatDate={(date) => this.strings.formatShortDate(date)} format="DD-MM-YYYY" inputProps={{placeholder: ""}}>
                    <input
                        // ref={this.ref.input}
                        type="text"
                        className="form-control"
                        required
                        value={this.state.selectedDate}
                        onChange={this._inputChange}
                        // onFocus={() => this._toggleDatepicker(true)}
                        // onBlur={(e) => this._closeByBlur(e)}
                        // onBlur={() => this._toggleDatepicker(false)}
                    />
                </DayPickerInput>

                <label>
                    Оттуда <span className="icon icon-cart-check" />
                </label>

                <Datepicker
                    // ref={this.ref.datepicker}
                    className={classnames("", {"d-none": !this.state.isSelectingDate})}
                    onDayFocus={this._onDateSelect}
                    // onFocus={() => this._toggleDatepicker(true)}
                    months={MONTHS}
                    weekdaysLong={WEEKDAYS_LONG}
                    weekdaysShort={WEEKDAYS_SHORT}
                />
            </div>
        );
    }
}

export default ArrivalDate;
