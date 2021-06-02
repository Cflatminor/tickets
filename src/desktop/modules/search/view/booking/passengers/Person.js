import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import GenderEnum from "app/core/utilities/enum/gender";

import Validator from "app/core/utilities/validator/Validator";
import Algorithms from "app/core/utilities/validator/Algorithms";

class Person extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @private
         * @property _fieldNames
         * @type {Object}
         */
        this._fieldNames = {
            name: "name",
            lastName: "lastName",
            birthDate: "birthDate",
            citizenship: "citizenship",
            gender: "gender",
            documentSeries: "documentSeries",
            expirationDate: "expirationDate",
            mileCard: "mileCard"
        };

        /**
         * @private
         * @property _validationErrors
         * @type {Object}
         */
        this._validationErrors = {
            [this._fieldNames.name]: {
                selector: ".error-name-field"
            },
            [this._fieldNames.lastName]: {
                selector: ".error-last-name-field"
            },
            [this._fieldNames.birthDate]: {
                selector: ".error-birth-date-field"
            },
            [this._fieldNames.citizenship]: {
                selector: ".error-citizenship-field"
            },
            [this._fieldNames.gender]: {
                selector: ".error-gender-field"
            },
            [this._fieldNames.documentSeries]: {
                selector: ".error-document-series-field"
            },
            [this._fieldNames.expirationDate]: {
                selector: ".error-expiration-date-field"
            }
        };

        /**
         * @private
         * @property
         * @type {Object}
         */
        this._rootElementRef = React.createRef();

        this.state = {
            [this._fieldNames.name]: "",
            [this._fieldNames.lastName]: "",
            [this._fieldNames.birthDate]: "",
            [this._fieldNames.citizenship]: "",
            [this._fieldNames.gender]: "",
            [this._fieldNames.documentSeries]: "",
            [this._fieldNames.expirationDate]: "",
            [this._fieldNames.mileCard]: ""
        }

        /**
         * @property _stringsResource
         * @type {Object}
         * @private
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property _genderEnum
         * @type {Enum}
         * @private
         */
        this._genderEnum = GenderEnum.getInstance();

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

        this._validateFields = this._validateFields.bind(this);
    }

    componentDidUpdate() {
        if (this.props.forceValidate) {
            console.log("this.props.forceValidate", this.props.forceValidate);

            this._validateFields();
        }
    }

    /**
     * @method _isValidDate
     * @param date {string}
     * @returns {boolean}
     * @private
     */
    _isValidDate(date) {
        return (/^\d{2}\.\d{2}\.\d{4}$/).test(date);
    }

    /**
     * @method _isValidFields
     * @param fields {Object}
     * @returns {boolean}
     * @private
     */
    _isValidFields(fields) {
        let report = new this._Validator(fields, this._getAlgorithms()).validate();

        this._Validator.toggleValidateErrors(report, this._getRootElement());

        return !report.hasError();
    }

    /**
     * @method _getSelectorForErrorElement
     * @param name {string}
     * @returns {string}
     * @private
     */
    _getSelectorForErrorElement(name) {
        return this._validationErrors[name].selector;
    }

    /**
     * @method _getAlgorithms
     * @return {Object}
     * @private
     */
    _getAlgorithms() {
        let self = this,
            base = new this._Algorithms().getAlgorithms([
                {
                    type: "text",
                    name: this._fieldNames.name,
                    selector: this._getSelectorForErrorElement(this._fieldNames.name)
                },
                {
                    type: "text",
                    name: this._fieldNames.lastName,
                    selector: this._getSelectorForErrorElement(this._fieldNames.lastName)
                },
                {
                    type: "text",
                    name: this._fieldNames.citizenship,
                    selector: this._getSelectorForErrorElement(this._fieldNames.citizenship)
                },
                {
                    type: "text",
                    name: this._fieldNames.gender,
                    selector: this._getSelectorForErrorElement(this._fieldNames.gender)
                },
                {
                    type: "text",
                    name: this._fieldNames.documentSeries,
                    selector: this._getSelectorForErrorElement(this._fieldNames.documentSeries)
                }
            ]);

        return _.merge({}, base, {
            [this._fieldNames.birthDate]: {
                isValid(value) {
                    return self._isValidDate(value);
                },
                error: {
                    fieldName: this._fieldNames.birthDate,
                    message: "Должно быть заполнено в формате DD.MM.YYYY",
                    selector: this._getSelectorForErrorElement(this._fieldNames.birthDate)
                }
            },
            [this._fieldNames.expirationDate]: {
                isValid(value) {
                    let result = true;

                    if (value) {
                        result = self._isValidDate(value);
                    }

                    return result;
                },
                error: {
                    fieldName: this._fieldNames.expirationDate,
                    message: "Должно быть заполнено в формате DD.MM.YYYY",
                    selector: this._getSelectorForErrorElement(this._fieldNames.expirationDate)
                }
            }
        });
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
     * @method _getTitle
     * @returns {string}
     */
    _getTitle() {
        return this.props.title;
    }

    /**
     * @method _getFields
     * @returns {Object}
     * @private
     */
    _getFields() {
        return _.merge({}, this.state);
    }

    /**
     * @method _change
     * @returns {Person}
     * @private
     */
    _change() {
        this.props.change(this._getFields());

        return this;
    }

    /**
     * @method _forceChange
     * @returns {Person}
     * @private
     */
    _forceChange() {
        this.props.forceChange(this._getFields());

        return this;
    }

    /**
     * @method _changeField
     * @param e {Object}
     * @param name {string}
     * @returns {Person}
     * @private
     */
    _changeField(e, name) {
        e.persist();

        this.setState({[name]: e.target.value});

        return this;
    }

    /**
     * @private
     * @method _validateFields
     * @returns {Person}
     */
    _validateFields() {
        if (this._isValidFields(this.state)) {
            this._forceChange();
        }

        return this;
    }

    /**
     * @private
     * @method _validateField
     * @param name {string}
     * @returns {Person}
     */
    _validateField(name) {
        if (this._isValidFields({[name]: this.state[name]})) {
            this._change();
        }

        return this;
    }

    render() {
        return (
            <div ref={this._rootElementRef} className="person">
                <div className="person__header">
                    <strong>{this._getTitle()}</strong>
                </div>

                <div className="person__body">
                    <div className="person__fields">
                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.name}
                                    onChange={(e) => this._changeField(e, this._fieldNames.name)}
                                    onBlur={() => this._validateField(this._fieldNames.name)}
                                />

                                <label>
                                    {this._stringsResource.name}
                                </label>
                            </div>

                            <div className="error-message error-name-field" />
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.lastName}
                                    onChange={(e) => this._changeField(e, this._fieldNames.lastName)}
                                    onBlur={() => this._validateField(this._fieldNames.lastName)}
                                />

                                <label>
                                    {this._stringsResource.lastName}
                                </label>
                            </div>

                            <div className="error-message error-last-name-field" />
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.birthday}
                                    onChange={(e) => this._changeField(e, this._fieldNames.birthDate)}
                                    onBlur={() => this._validateField(this._fieldNames.birthDate)}
                                />

                                <label>
                                    {this._stringsResource.birthday}
                                </label>
                            </div>

                            <div className="error-message error-birth-date-field" />
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.citizenship}
                                    onChange={(e) => this._changeField(e, this._fieldNames.citizenship)}
                                    onBlur={() => this._validateField(this._fieldNames.citizenship)}
                                />

                                <label>
                                    {this._stringsResource.citizenship}
                                </label>
                            </div>

                            <div className="error-message error-citizenship-field" />
                        </div>

                        <div className="person__field">
                            <select
                                className="form-control"
                                onChange={(e) => this._changeField(e, this._fieldNames.gender)}
                                onBlur={() => this._validateField(this._fieldNames.gender)}
                            >
                                <option value="">
                                    {this._stringsResource.selectYourGender}
                                </option>

                                <option value={this._genderEnum.getMaleAsValue()}>
                                    {this._stringsResource.male}
                                </option>

                                <option value={this._genderEnum.getFemaleAsValue()}>
                                    {this._stringsResource.female}
                                </option>
                            </select>

                            <div className="error-message error-gender-field" />
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.documentSeries}
                                    onChange={(e) => this._changeField(e, this._fieldNames.documentSeries)}
                                    onBlur={() => this._validateField(this._fieldNames.documentSeries)}
                                />

                                <label>
                                    Серия, № документа
                                    {/*{this._stringsResource.lastName} */}
                                </label>
                            </div>

                            <div className="error-message error-document-series-field" />
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.expirationDate}
                                    onChange={(e) => this._changeField(e, this._fieldNames.expirationDate)}
                                    onBlur={() => this._validateField(this._fieldNames.expirationDate)}
                                />

                                <label>
                                    {/*{this._stringsResource.birthday}*/}
                                    Срок действия
                                </label>
                            </div>

                            <div className="error-message error-expiration-date-field" />
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.mileCard}
                                    onChange={(e) => this._changeField(e, this._fieldNames.mileCard)}
                                />

                                <label>
                                    {/*{this._stringsResource.nationality}*/}
                                    Мильная карта
                                </label>
                            </div>

                            <div className="error-message error-mile-card-field" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Person.propTypes = {
    title: PropTypes.string,
    change: PropTypes.func,
    forceChange: PropTypes.func,
    forceValidate: PropTypes.bool,
};

Person.defaultProps = {
    title: "",
    change: () => {},
    forceChange: () => {},
    forceValidate: false
};

export default Person;
