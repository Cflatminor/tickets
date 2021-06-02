import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Validator from "app/core/utilities/validator/Validator";
import Algorithms from "app/core/utilities/validator/Algorithms";

import Person from "./Person";

class Passengers extends React.Component {
    constructor(props) {
        super(props);

        this._passengers = {
            adult: 1,
            child: 1,
            baby: 0
        };

        /**
         * @property _passengerAlias
         * @type {{baby: string, adult: string, child: string}}
         * @private
         */
        this._passengerAlias = {
            adult: "adult",
            child: "child",
            baby: "baby"
        };

        /**
         * @private
         * @property _validationErrors
         * @type {Object}
         */
        this._validationErrors = {
            email: {
                selector: ".error-email-field"
            }
        };

        this.state = {
            passengers: {},
            email: ""
        };

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property _Validator
         * @type {Validator}
         * @private
         */
        this._Validator = Validator;

        /**
         * @property _Algorithms
         * @type {Algorithms}
         * @private
         */
        this._Algorithms = Algorithms;

        this._change = this._change.bind(this);
        this._changeEmail = this._changeEmail.bind(this);
        this._forceChangePassenger = this._forceChangePassenger.bind(this);
        this._changePassenger = this._changePassenger.bind(this);
        this._validateEmail = this._validateEmail.bind(this);
    }

    componentDidUpdate() {
        if (this._isForceValidate()) {
            this._validateEmail();
        }
    }

    /**
     * @method _hasAllPassengers
     * @returns {boolean}
     * @private
     */
    _hasAllPassengers() {
        let counts = this._getPassengerCounts(),
            hasAllAdults = counts[this._passengerAlias.adult] === this._passengers.adult,
            hasAllChild = counts[this._passengerAlias.child] === this._passengers.child,
            hasAllBabies = counts[this._passengerAlias.baby] === this._passengers.baby;

        return hasAllAdults && hasAllChild && hasAllBabies;
    }

    /**
     * @method _isForceValidate
     * @returns {boolean}
     * @private
     */
    _isForceValidate() {
        return this.props.forceValidate;
    }

    /**
     * @method _isValidEmail
     * @returns {boolean}
     * @private
     */
    _isValidEmail() {
        let report = new this._Validator({email: this.state.email}, this._getAlgorithms()).validate();

        this._Validator.toggleValidateErrors(report, this._getRootElement());

        return !report.hasError();
    }

    /**
     * @private
     * @method _getRootElement
     * @returns {Object}
     */
    _getRootElement() {
        return this._rootElementRef && this._rootElementRef.current;
    }

    /**
     * @method _getAlgorithms
     * @return {Object}
     * @private
     */
    _getAlgorithms() {
        return new this._Algorithms().getAlgorithms([
            {
                type: "email",
                name: "email",
                selector: this._validationErrors.email.selector
            }
        ]);
    }

    /**
     * @method _getPassengerAliasByTitle
     * @param title {string}
     * @returns {string}
     * @private
     */
    _getPassengerAliasByTitle(title) {
        let currentTitle = title.toLowerCase(),
            result = "";

        if (currentTitle.includes(this._stringsResource.adult.toLowerCase())) {
            result = this._passengerAlias.adult;
        }

        if (currentTitle.includes(this._stringsResource.child.toLowerCase())) {
            result = this._passengerAlias.child;
        }

        if (currentTitle.includes(this._stringsResource.baby.toLowerCase())) {
            result = this._passengerAlias.baby;
        }

        return result;
    }

    /**
     * @method {_getPassengerCounts}
     * @returns {Object}
     * @private
     */
    _getPassengerCounts() {
        let counts = {
                [this._passengerAlias.adult]: 0,
                [this._passengerAlias.child]: 0,
                [this._passengerAlias.baby]: 0
            },
            keys = Object.keys(this.state.passengers);

        keys.forEach((key) => {
            let alias = this._getPassengerAliasByTitle(key);

            counts[alias] = counts[alias] + 1;
        });

        return counts;
    }

    /**
     * @method _setPassenger
     * @param title {string}
     * @param passenger {Object}
     * @param [callback] {Function}
     * @returns {Passengers}
     * @private
     */
    _setPassenger(title, passenger, callback = () => {}) {
        let passengers = this.state.passengers;

        passengers[title] = passenger;

        this.setState({passengers}, callback);

        return this;
    }

    /**
     * @method
     * @param email {string}
     * @param callback {Function}
     * @returns {Passengers}не то
     * @private
     */
    _setEmail(email, callback = () => {}) {
        this.setState({email}, callback);

        return this;
    }

    /**
     * @method _forceChange
     * @returns {Passengers}
     * @private
     */
    _forceChange() {
        this.props.forceChange(this.state.passengers, this.state.email);

        return this;
    }

    /**
     * @method _change
     * @returns {Passengers}
     * @private
     */
    _change() {
        this.props.change(this.state.passengers, this.state.email);

        return this;
    }

    /**
     * @method _forceChangePassenger
     * @param title {string}
     * @param passenger {Object}
     * @returns {Passengers}
     * @private
     */
    _forceChangePassenger(title, passenger) {
        this._setPassenger(title, passenger, () => {
            if (this._hasAllPassengers() && this._isValidEmail()) {
                this._forceChange();
            }
        });

        return this;
    }

    /**
     * @method _changePassenger
     * @param title {string}
     * @param passenger {Object}
     * @returns {Passengers}
     * @private
     */
    _changePassenger(title, passenger) {
        this._setPassenger(title, passenger, this._change);

        return this;
    }

    /**
     * @method _changeEmail
     * @param e {Object}
     * @param name {string}
     * @returns {Person}
     * @private
     */
    _changeEmail(e, name) {
        e.persist();

        this._setEmail(e.target.value);

        return this;
    }

    /**
     * @method _validateEmail
     * @returns {Passengers}
     * @private
     */
    _validateEmail() {
        if (this._isValidEmail()) {
            this._change();
        }

        return this;
    }

    /**
     * @method _renderPerson
     * @param title {string}
     * @param index {number}
     * @returns {React.element}
     * @private
     */
    _renderPerson(title, index) {
        let newTitle = `${title} #${index}`;

        return (
            <Person
                key={index}
                title={newTitle}
                forceValidate={this._isForceValidate()}
                forceChange={(person) => this._forceChangePassenger(newTitle, person)}
                change={(person) => this._changePassenger(newTitle, person)}
            />
        );
    }

    /**
     * @method _renderPersons
     * @param title {string}
     * @param count {number}
     * @returns {Array}
     * @private
     */
    _renderPersons(title, count) {
        let result = [];

        for (let i = 1; i <= count; i++) {
            result.push(this._renderPerson(title, i));
        }

        return result;
    }

    /**
     * @method _renderAdultsPerson
     * @returns {Array}
     * @private
     */
    _renderAdultsPerson() {
        return this._renderPersons(this._stringsResource.adult, this._passengers.adult);
    }

    /**
     * @method _renderChildrenPerson
     * @returns {Array}
     * @private
     */
    _renderChildrenPerson() {
        return this._renderPersons(this._stringsResource.child, this._passengers.child);
    }

    /**
     * @method _renderBabiesPerson
     * @returns {Array}
     * @private
     */
    _renderBabiesPerson() {
        return this._renderPersons(this._stringsResource.baby, this._passengers.baby);
    }

    render() {
        return (
            <div ref={this._rootElementRef} className="passengers">
                <div className="passengers__header">
                    <strong>Укажите информацию о пассажирах:</strong>
                </div>

                <div className="passengers__body">
                    {this._renderAdultsPerson()}
                    {this._renderChildrenPerson()}
                    {this._renderBabiesPerson()}
                </div>

                <div className="passengers__footer">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.email}
                                    onChange={this._changeEmail}
                                    onBlur={this._validateEmail}
                                />

                                <label>
                                    {this._stringsResource.yourEmail}
                                </label>
                            </div>

                            <div className="error-message error-email-field" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Passengers.propTypes = {
    forceValidate: PropTypes.bool,
    change: PropTypes.func,
    forceChange: PropTypes.func
};

Passengers.defaultProps = {
    forceValidate: false,
    change: () => {},
    forceChange: () => {}
};

export default Passengers;
