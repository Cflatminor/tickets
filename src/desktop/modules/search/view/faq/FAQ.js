import React from "react";
import PropTypes from "prop-types";

class FAQ extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search__faq faq">
                <div className="faq__body">
                    <strong>FAQ</strong>
                </div>
            </div>
        );
    }
}

FAQ.propTypes = {
    items: PropTypes.instanceOf(Array)
};

FAQ.defaultProps = {
    items: []
};

export default FAQ;
