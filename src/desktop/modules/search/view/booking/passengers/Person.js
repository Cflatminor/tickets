import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import GenderEnum from "app/core/utilities/enum/gender";

class Person extends React.Component {
    constructor(props) {
        super(props);

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._genderEnum = GenderEnum.getInstance();
    }

    /**
     * @method _getTitle
     * @returns {string}
     */
    _getTitle() {
        return this.props.title;
    }

    render() {
        return (
            <div className="person">
                <div className="person__header">
                    <strong>{this._getTitle()}</strong>
                </div>

                <div className="person__body">
                    <div className="person__fields">
                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input type="text" className="form-control" required />

                                <label>
                                    {this._stringsResource.name}
                                </label>
                            </div>
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input type="text" className="form-control" required />

                                <label>
                                    {this._stringsResource.lastName}
                                </label>
                            </div>
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input type="text" className="form-control" required />

                                <label>
                                    {this._stringsResource.birthday}
                                </label>
                            </div>
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input type="text" className="form-control" required />

                                <label>
                                    {this._stringsResource.nationality}
                                </label>
                            </div>
                        </div>

                        <div className="person__field">
                            <select className="form-control">
                                <option>
                                    {this._stringsResource.selectYourGender}
                                </option>

                                <option value={this._genderEnum.getMaleAsValue()}>
                                    {this._stringsResource.male}
                                </option>

                                <option value={this._genderEnum.getFemaleAsValue()}>
                                    {this._stringsResource.female}
                                </option>
                            </select>
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input type="text" className="form-control" required />

                                <label>
                                    Серия, № документа
                                    {/*{this._stringsResource.lastName} */}
                                </label>
                            </div>
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input type="text" className="form-control" required />

                                <label>
                                    {/*{this._stringsResource.birthday}*/}
                                    Срок действия
                                </label>
                            </div>
                        </div>

                        <div className="person__field">
                            <div className="outlined-text-form">
                                <input type="text" className="form-control" required />

                                <label>
                                    {/*{this._stringsResource.nationality}*/}
                                    Мильная карта
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Person.propTypes = {
    title: PropTypes.string
};

Person.defaultProps = {
    title: ""
};

export default Person;

// <div className="row">
//     <div className="col-lg-3">
//         <div className="outlined-text-form">
//             <input type="text" className="form-control" required />
//
//             <label>
//                 {this._stringsResource.name}
//             </label>
//         </div>
//     </div>
//
//     <div className="col-lg-3">
//         <div className="outlined-text-form">
//             <input type="text" className="form-control" required />
//
//             <label>
//                 {this._stringsResource.lastName}
//             </label>
//         </div>
//     </div>
//
//     <div className="col-lg-3">
//         <div className="outlined-text-form">
//             <input type="text" className="form-control" required />
//
//             <label>
//                 {this._stringsResource.birthday}
//             </label>
//         </div>
//     </div>
//
//     <div className="col-lg-3">
//         <div className="outlined-text-form">
//             <input type="text" className="form-control" required />
//
//             <label>
//                 {this._stringsResource.nationality}
//             </label>
//         </div>
//     </div>
// </div>
//
// <div className="row">
//     <div className="col-lg-3">
//         <select className="form-control">
//             <option>
//                 {this._stringsResource.selectYourGender}
//             </option>
//
//             <option>
//                 Мужской
//             </option>
//
//             <option>
//                 Женский
//             </option>
//         </select>
//     </div>
//
//     <div className="col-lg-3">
//         <div className="outlined-text-form">
//             <input type="text" className="form-control" required />
//
//             <label>
//                 Серия, № документа
//                 {/*{this._stringsResource.lastName} */}
//             </label>
//         </div>
//     </div>
//
//     <div className="col-lg-3">
//         <div className="outlined-text-form">
//             <input type="text" className="form-control" required />
//
//             <label>
//                 {/*{this._stringsResource.birthday}*/}
//                 Срок действия
//             </label>
//         </div>
//     </div>
//
//     <div className="col-lg-3">
//         <div className="outlined-text-form">
//             <input type="text" className="form-control" required />
//
//             <label>
//                 {/*{this._stringsResource.nationality}*/}
//                 Мильная карта
//             </label>
//         </div>
//     </div>
// </div>
