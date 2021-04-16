import React from "react";

import Header from "components/header/Header";

class Main extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <>
                <section className="layout layout--main" data-pagetype={this.props.pageType}>
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

// Main.propTypes = {
//     i18n: PropTypes.instanceOf(Object).isRequired
// };
//
// export default withTranslation()(Main);

export default Main;