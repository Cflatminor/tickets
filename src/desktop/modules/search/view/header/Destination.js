import React from "react";

class Destination extends React.Component {
    render() {
        return (
            <div className="outlined-text-form">
                <input type="text" className="form-control" required />

                <label>
                    Куда <span className="icon icon-cart-check" />
                </label>
            </div>
        );
    }
}

export default Destination;
