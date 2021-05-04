import React from "react";

class Passengers extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="outlined-text-form">
                <input type="text" className="form-control" required />

                <label>
                    1 пассажир <span className="icon icon-cart-check" />
                </label>
            </div>
        );
    }
}

export default Passengers;
