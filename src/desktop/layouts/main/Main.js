import React from "react";

import Header from "components/header/Header";

class Main extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                <section className="layout layout--main">
                    <Header />

                    <div className="layout__body">
                        {this.props.children}
                    </div>

                    {/*<Footer />*/}
                </section>

                {/*<CookieAgreement />*/}
                {/*<Modal />*/}
                {/*<Basket />*/}
            </>
        );
    }
}

export default Main;
