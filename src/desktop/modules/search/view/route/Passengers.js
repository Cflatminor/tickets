import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Translator from "app/core/utilities/strings/translator";
import ServiceClassEnum from "app/core/utilities/enum/serviceClass";

class Passengers extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Translator
         * @type {Translator}
         */
        this.Translator = Translator;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = this.Translator.getInstance();

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @private
         * @property _serviceClassEnum
         * @type {Enum}
         */
        this._serviceClassEnum = ServiceClassEnum.getInstance();

        this.ref = {
            parent: React.createRef(),
            input: React.createRef(),
            passengers: React.createRef()
        };

        this._serviceClassTranslations = {
            [this._serviceClassEnum.getEconomyAsValue()]: this._stringsResource.economy,
            [this._serviceClassEnum.getComfortAsValue()]: this._stringsResource.comfort,
            [this._serviceClassEnum.getBusinessAsValue()]: this._stringsResource.business
        };

        this.state = {
            serviceClass: this._serviceClassEnum.getEconomyAsValue(),
            isSelectingPassengers: false,
            adultPassengersCount: 1,
            childPassengersCount: 0,
            babyPassengersCount: 0,
            totalPassengersCount: 1
        };

        this._toggleSelectPassengers = this._toggleSelectPassengers.bind(this);
        this._getPluralTitleOfPassengers = this._getPluralTitleOfPassengers.bind(this);
        this._selectType = this._selectType.bind(this);
        this._increaseAdultCount = this._increaseAdultCount.bind(this);
        this._decreaseAdultCount = this._decreaseAdultCount.bind(this);
        this._increaseChildCount = this._increaseChildCount.bind(this);
        this._decreaseChildCount = this._decreaseChildCount.bind(this);
        this._increaseBabyCount = this._increaseBabyCount.bind(this);
        this._decreaseBabyCount = this._decreaseBabyCount.bind(this);

        this._changePassengers = this._changePassengers.bind(this);
    }

    componentDidMount() {
        this._changePassengers();

        window.document.addEventListener("click", (e) => {
            let form = window.document.querySelector(".outlined-text-form.passengers");

            if (e.target.closest(".outlined-text-form.passengers") !== form) {
                this._toggleSelectPassengers(false);
            }
        });

        window.document.querySelector(".passengers .form-control").addEventListener("click", () => {
            if (this.state.isSelectingPassengers) {
                this._toggleSelectPassengers(false);
            }
        });
    }

    /**
     * @method _getPassengersCount
     * @return {{baby: number, adult: number, child: number}}
     * @private
     */
    _getPassengersCount() {
        return {
            adult: this.state.adultPassengersCount,
            child: this.state.childPassengersCount,
            baby: this.state.babyPassengersCount
        };
    }

    /**
     * @method _getServiceClassDescription
     * @return {string}
     * @private
     */
    _getServiceClassDescription() {
        return this._serviceClassTranslations[this.state.serviceClass];
    }

    _getPluralTitleOfPassengers() {
        return this.translator.plural(this.state.totalPassengersCount, this.Translator.stringKeys.passengers);
    }

    /**
     * @private
     * @method _toggleSelectPassengers
     * @returns {Passengers}
     */
    _toggleSelectPassengers(state) {
        this.setState({
            isSelectingPassengers: state
        });

        return this;
    }

    _increaseAdultCount() {
        this.setState((prevState) => ({
            adultPassengersCount: prevState.adultPassengersCount + 1,
            totalPassengersCount: prevState.totalPassengersCount + 1
        }), this._changePassengers);

        return this;
    }

    _decreaseAdultCount() {
        if (this.state.adultPassengersCount > 0) {
            this.setState((prevState) => ({
                adultPassengersCount: prevState.adultPassengersCount - 1,
                totalPassengersCount: prevState.totalPassengersCount - 1
            }), this._changePassengers);
        }

        return this;
    }

    _increaseChildCount() {
        this.setState((prevState) => ({
            childPassengersCount: prevState.childPassengersCount + 1,
            totalPassengersCount: prevState.totalPassengersCount + 1
        }), this._changePassengers);

        return this;
    }

    _decreaseChildCount() {
        if (this.state.childPassengersCount > 0) {
            this.setState((prevState) => ({
                childPassengersCount: prevState.childPassengersCount - 1,
                totalPassengersCount: prevState.totalPassengersCount - 1
            }), this._changePassengers);
        }

        return this;
    }

    _increaseBabyCount() {
        this.setState((prevState) => ({
            babyPassengersCount: prevState.babyPassengersCount + 1,
            totalPassengersCount: prevState.totalPassengersCount + 1
        }), this._changePassengers);

        return this;
    }

    _decreaseBabyCount() {
        if (this.state.babyPassengersCount > 0) {
            this.setState((prevState) => ({
                babyPassengersCount: prevState.babyPassengersCount - 1,
                totalPassengersCount: prevState.totalPassengersCount - 1
            }), this._changePassengers);
        }

        return this;
    }

    /**
     * @method _changePassengers
     * @return {Passengers}
     * @private
     */
    _changePassengers() {
        this.props.change({
            counts: this._getPassengersCount(),
            serviceClass: this.state.serviceClass
        });

        return this;
    }

    _selectType(serviceClass) {
        this.setState({
            serviceClass
        }, this._changePassengers);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div
                onClick={() => this._toggleSelectPassengers(true)}
                ref={this.ref.parent}
                className={classnames(
                    "outlined-text-form passengers route__passengers",
                    {focused: this.state.isSelectingPassengers}
                )}
            >
                <div
                    // ref={this.ref.input}
                    className="form-control"
                    // onClick={this._toggleSelectPassengers}
                    // onFocus={() => this._toggleSelectPassengers(true)}
                    // onBlur={() => this._toggleSelectPassengers(false)}
                />

                <label>
                    <p>
                        { this.state.totalPassengersCount } { this._getPluralTitleOfPassengers() }
                    </p>

                    <p>
                        {this._getServiceClassDescription()}
                    </p>
                </label>

                <div
                    // ref={this.ref.passengers}
                    className={classnames("passengers__form form", {"d-none": !this.state.isSelectingPassengers})}
                >
                    <div className="passengers__count count">
                        <div className="count__categories categories">
                            <div className="categories__items">
                                <div className="categories__item d-flex align-items-center justify-content-between">
                                    <p>
                                        <span className="item__title">
                                            Взрослые
                                        </span>

                                        <span className="item__description">
                                            Старше 12 лет
                                        </span>
                                    </p>

                                    <div className="item__counter d-flex align-items-center">
                                        <span className="counter__decrease" onClick={this._decreaseAdultCount}>
                                            -
                                        </span>

                                        <span className="counter__count">
                                            { this.state.adultPassengersCount }
                                        </span>

                                        <span className="counter__increase" onClick={this._increaseAdultCount}>
                                            +
                                        </span>
                                    </div>
                                </div>

                                <div className="categories__item d-flex align-items-center justify-content-between">
                                    <p>
                                        <span className="item__title">
                                            Дети
                                        </span>

                                        <span className="item__description">
                                            Младше 12 лет
                                        </span>
                                    </p>

                                    <div className="item__counter d-flex align-items-center">
                                        <span className="counter__decrease" onClick={this._decreaseChildCount}>
                                            -
                                        </span>

                                        <span className="counter__count">
                                            { this.state.childPassengersCount }
                                        </span>

                                        <span className="counter__increase" onClick={this._increaseChildCount}>
                                            +
                                        </span>
                                    </div>
                                </div>

                                <div className="categories__item d-flex align-items-center justify-content-between">
                                    <p>
                                        <span className="item__title">
                                            Младенцы
                                        </span>

                                        <span className="item__description">
                                            До 2 лет
                                        </span>
                                    </p>

                                    <div className="item__counter d-flex align-items-center">
                                        <span className="counter__decrease" onClick={this._decreaseBabyCount}>
                                            -
                                        </span>

                                        <span className="counter__count">
                                            { this.state.babyPassengersCount }
                                        </span>

                                        <span className="counter__increase" onClick={this._increaseBabyCount}>
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="passengers__type">
                        <div className="position-relative">
                            <label
                                className="custom-input--radio"
                                onClick={() => this._selectType(this._serviceClassEnum.getEconomyAsValue())}
                            >
                                <input type="radio" value="Эконом" name="type" defaultChecked />

                                <span className="custom-input__state">
                                    <span className="custom-input__animation_bg" />
                                </span>

                                <span className="custom-input__name">
                                    {this._stringsResource.economy}
                                </span>
                            </label>
                        </div>

                        <div className="position-relative">
                            <label
                                className="custom-input--radio"
                                onClick={() => this._selectType(this._serviceClassEnum.getComfortAsValue())}
                            >
                                <input type="radio" value="Комфорт" name="type" />

                                <span className="custom-input__state">
                                    <span className="custom-input__animation_bg" />
                                </span>

                                <span className="custom-input__name">
                                    {this._stringsResource.comfort}
                                </span>
                            </label>
                        </div>

                        <div className="position-relative">
                            <label
                                className="custom-input--radio"
                                onClick={() => this._selectType(this._serviceClassEnum.getBusinessAsValue())}
                            >
                                <input type="radio" value="Бизнес" name="type" />

                                <span className="custom-input__state">
                                    <span className="custom-input__animation_bg" />
                                </span>

                                <span className="custom-input__name">
                                    {this._stringsResource.business}
                                </span>
                            </label>
                        </div>

                        {/*<label onClick={() => this._selectType("economy")}>*/}
                        {/*    <input type="radio" name="type" defaultChecked />*/}
                        {/*    Эконом*/}
                        {/*</label>*/}

                        {/*<label onClick={() => this._selectType("comfort")}>*/}
                        {/*    <input type="radio" name="type" />*/}
                        {/*    Комфорт*/}
                        {/*</label>*/}

                        {/*<label onClick={() => this._selectType("business")}>*/}
                        {/*    <input type="radio" name="type" />*/}
                        {/*    Бизнес*/}
                        {/*</label>*/}
                    </div>
                </div>

                <span className="icon icon-chevron-down" />
            </div>
        );
    }
}

Passengers.propTypes = {
    change: PropTypes.func
};

Passengers.defaultProps = {
    change: () => {}
};

export default Passengers;
