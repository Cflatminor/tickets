import React from "react";

class Search extends React.Component {
    render() {
        return (
            <section className="search">
                <header className="search__header">
                    <div className="temp">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">

                                    <h1 className="search__title text-center">
                                        Поиск и бронирование билетов
                                    </h1>

                                    <div className="temp__data d-flex">
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

                                        <button className="btn-default btn-lg to-search-results">
                                            Найти
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </section>
        );
    }
}

export default Search;
