import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Person from "./Person";

class Passengers extends React.Component {
    constructor(props) {
        super(props);

        this.passengers = {
            adults: 2,
            children: 2,
            babies: 1
        };

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    _renderPerson(title, index) {
        return (<Person key={index} title={`${title} #${index}`} />);
    }

    _renderPersons(title, count) {
        let result = [];

        for (let i = 1; i <= count; i++) {
            result.push(this._renderPerson(title, i));
        }

        return result;
    }

    _renderAdultsPerson() {
        return this._renderPersons("Взрослый", this.passengers.adults);
    }

    _renderChildrenPerson() {
        return this._renderPersons("Ребенок", this.passengers.children);
    }

    _renderBabiesPerson() {
        return this._renderPersons("Младенец", this.passengers.babies);
    }

    render() {
        return (
            <div className="passengers">
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
                                <input type="text" className="form-control" required />

                                <label>
                                    {this._stringsResource.yourEmail}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Passengers.propTypes = {

};

Passengers.defaultProps = {

};

export default Passengers;
