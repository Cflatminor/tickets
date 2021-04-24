import React from "react";

class Search extends React.Component {
    render() {
        return (
            <section className="search">
                Hello SEARCH PAGE

                <div className="outlined-text-form">
                    <input type="text" className="form-control" required />

                    <label htmlFor="user-name">
                        User name <span className="icon icon-cart-check" />
                    </label>
                </div>
            </section>
        );
    }
}

export default Search;
