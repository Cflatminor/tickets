import React from "react";
import classnames from "classnames";

import Translator from "app/core/utilities/strings/translator";

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

        // this.types = [
        //     "economy", "comfort", "business"
        // ];

        this.ref = {
            parent: React.createRef(),
            input: React.createRef(),
            passengers: React.createRef()
        };

        this.state = {
            type: "Эконом",
            isSelectingPassengers: false,
            adultPassengersCount: 1,
            childPassengersCount: 0,
            babyPassengersCount: 0,
            totalPassengersCount: 1
            // passengersType: ""
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
    }

    componentDidMount() {
        window.document.addEventListener("click", (e) => {
            let form = window.document.querySelector(".outlined-text-form.passengers");

            if (e.target.closest(".outlined-text-form.passengers") !== form) {
                this._toggleSelectPassengers(false);
            }
        });
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
        }));

        return this;
    }

    _decreaseAdultCount() {
        if (this.state.adultPassengersCount > 0) {
            this.setState((prevState) => ({
                adultPassengersCount: prevState.adultPassengersCount - 1,
                totalPassengersCount: prevState.totalPassengersCount - 1
            }));
        }

        return this;
    }

    _increaseChildCount() {
        this.setState((prevState) => ({
            childPassengersCount: prevState.childPassengersCount + 1,
            totalPassengersCount: prevState.totalPassengersCount + 1
        }));

        return this;
    }

    _decreaseChildCount() {
        if (this.state.childPassengersCount > 0) {
            this.setState((prevState) => ({
                childPassengersCount: prevState.childPassengersCount - 1,
                totalPassengersCount: prevState.totalPassengersCount - 1
            }));
        }

        return this;
    }

    _increaseBabyCount() {
        this.setState((prevState) => ({
            babyPassengersCount: prevState.babyPassengersCount + 1,
            totalPassengersCount: prevState.totalPassengersCount + 1
        }));

        return this;
    }

    _decreaseBabyCount() {
        if (this.state.babyPassengersCount > 0) {
            this.setState((prevState) => ({
                babyPassengersCount: prevState.babyPassengersCount - 1,
                totalPassengersCount: prevState.totalPassengersCount - 1
            }));
        }

        return this;
    }

    _selectType(type) {
        let typeTranslated = "";

        switch (type) {
            case "economy": typeTranslated = "Эконом"; break;
            case "business": typeTranslated = "Бизнес"; break;
            case "comfort": typeTranslated = "Комфорт"; break;
            default: typeTranslated = "";
        }

        this.setState({
            type: typeTranslated
        });
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
                className={classnames("outlined-text-form passengers", {focused: this.state.isSelectingPassengers})}
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
                        { this.state.type }
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
                            <label className="custom-input--radio" onClick={() => this._selectType("economy")}>
                                <input type="radio" value="Эконом" name="type" defaultChecked />

                                <span className="custom-input__state">
                                    <span className="custom-input__animation_bg" />
                                </span>

                                <span className="custom-input__name">Эконом</span>
                            </label>
                        </div>

                        <div className="position-relative">
                            <label className="custom-input--radio" onClick={() => this._selectType("comfort")}>
                                <input type="radio" value="Комфорт" name="type" />

                                <span className="custom-input__state">
                                    <span className="custom-input__animation_bg" />
                                </span>

                                <span className="custom-input__name">Комфорт</span>
                            </label>
                        </div>

                        <div className="position-relative">
                            <label className="custom-input--radio" onClick={() => this._selectType("business")}>
                                <input type="radio" value="Бизнес" name="type" />

                                <span className="custom-input__state">
                                    <span className="custom-input__animation_bg" />
                                </span>

                                <span className="custom-input__name">Бизнес</span>
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

export default Passengers;
