import React from "react";

import Route from "../route/Route";

class Header extends React.Component {
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

                <Route />
            </header>
        );
    }
}

export default Header;
