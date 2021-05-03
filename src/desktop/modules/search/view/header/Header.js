import React from "react";

// import Datepicker from "t-datepicker";

class Header extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        // console.log(Datepicker);
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <header className="search__header">
                <div className="search__title">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <h1 className="text-center">
                                    Поиск и бронирование билетов
                                </h1>

                                <p className="text-center">
                                    Лучший способ купить авиабилеты дёшево
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="search__temp temp">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="temp__form d-flex">
                                    <div className="temp__inputs d-flex w-100">
                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Откуда <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Куда <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Туда <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                Обратно <span className="icon icon-cart-check" />
                                            </label>
                                        </div>

                                        <div className="outlined-text-form">
                                            <input type="text" className="form-control" required />

                                            <label htmlFor="user-name">
                                                1 пассажир <span className="icon icon-cart-check" />
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        className="btn-default btn-lg to-search-results"
                                        type="button"
                                    >
                                        Найти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
