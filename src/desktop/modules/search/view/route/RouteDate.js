import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import DayPickerInput from 'react-day-picker/DayPickerInput';

import Strings from "core/utilities/strings";

class RouteDate extends React.Component {
    constructor(props) {
        super(props);

        this.strings = Strings.getInstance();

        this.state = {
            selectedDate: this.props.currentDate,
            isFocused: false,
            isEmpty: true
        };

        this._clearDate = this._clearDate.bind(this);
        this._handleDayChange = this._handleDayChange.bind(this);
        this._inputChange = this._inputChange.bind(this);
        this._toggleDatepicker = this._toggleDatepicker.bind(this);
    }

    componentDidMount() {
        this.setState((prevState) => ({
            isEmpty: !prevState.selectedDate
        }));
    }

    /**
     * @method _isAvailableDeleteAction
     * @return {boolean}
     * @private
     */
    _isAvailableDeleteAction() {
        return Boolean(this.props.deleteable && this.state.selectedDate);
    }

    _clearDate() {
        this.setState({
            isEmpty: true,
            selectedDate: null
        }, () => {
            this.props.change(this.state.selectedDate);
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
        }, () => {
            this.props.change(input.value);
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
            '????????????',
            '??????????????',
            '????????',
            '????????????',
            '??????',
            '????????',
            '????????',
            '????????????',
            '????????????????',
            '??????????????',
            '????????????',
            '??????????????'
        ];
        const WEEKDAYS_LONG = [
            '??????????????????????',
            '??????????????????????',
            '??????????????',
            '??????????',
            '??????????????',
            '??????????????',
            '??????????????'
        ];
        const WEEKDAYS_SHORT = ['????', '????', '????', '????', '????', '????', '????'];

        return (
            <div
                className={classnames(
                    "outlined-text-form",
                    this.props.className,
                    {focused: (this.state.isFocused || !this.state.isEmpty)}
                )}
            >
                <DayPickerInput
                    formatDate={(date) => this.strings.formatShortDate(date)}
                    format="DD-MM-YYYY"
                    value={this.state.selectedDate}
                    onDayChange={this._handleDayChange}
                    dayPickerProps={{
                        months: MONTHS,
                        weekdaysLong: WEEKDAYS_LONG,
                        weekdaysShort: WEEKDAYS_SHORT,
                        modifiers: {
                            disabled: [
                                {
                                    before: this.props.disableDaysBefore
                                }
                            ],
                            selected: [this.state.selectedDate],
                        }
                    }}
                    inputProps={{
                        placeholder: "",
                        onFocus: () => this._toggleDatepicker(true),
                        onBlur: () => this._toggleDatepicker(false)
                    }}
                />

                <label>
                    {this.props.title}
                </label>

                {!this.state.selectedDate && (
                    <span className="calendar-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="3" width="20" height="19" rx="3" stroke="#808080" strokeWidth="1.5" />
                            <path d="M7 1V3" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 1V3" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 8H22" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.5 13H7.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.5 13H12.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.5 13H17.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.5 17H7.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.5 17H12.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.5 17H17.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                )}

                {this._isAvailableDeleteAction() && (
                    <span className="clear-icon" onClick={this._clearDate} />
                )}
            </div>
        );
    }
}

RouteDate.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    currentDate: PropTypes.instanceOf(Date),
    deleteable: PropTypes.bool,
    disableDaysBefore: PropTypes.instanceOf(Date),
    change: PropTypes.func
};

RouteDate.defaultProps = {
    className: "",
    title: "",
    currentDate: new Date(),
    deleteable: false,
    disableDaysBefore: new Date(),
    change: () => {}
};

export default RouteDate;
