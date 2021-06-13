import React from "react";
import PropTypes from "prop-types";

import Route from "../route/Route";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this._searchTickets = this._searchTickets.bind(this);
    }

    /**
     * @method _searchTickets
     * @param route {Route}
     * @return {Header}
     * @private
     */
    _searchTickets(route) {
        this.props.searchTickets(route);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <header className="search__header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h1 className="search__title text-center">
                                Поиск и бронирование билетов
                            </h1>

                            <p className="search__subtitle text-center">
                                Лучший способ купить авиабилеты дёшево
                            </p>
                        </div>
                    </div>
                </div>

                <Route confirm={this._searchTickets} />
            </header>
        );
    }
}

Header.propTypes = {
    searchTickets: PropTypes.func
};

Header.defaultProps = {
    searchTickets: () => {}
};

export default Header;
