import React from "react";
// import PropTypes from "prop-types";

import HomePage from "desktop/modules/homePage";
import MainLayout from "app/desktop/layouts/main/Main";
// import Error from "app/desktop/components/error/Error";
// import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class Home extends React.Component {
    /**
     * @example
     *
     * props = {
     *   pageInfo: Object,
     *   pageProps: {
     *       breadcrumbs: Array,
     *       initialData: Object
     *   }
     * }
     *
     * @static
     * @method getInitialProps
     * @param context {Object}
     * @param props {Object}
     * @returns {*}
     */
    static getInitialProps (context, props) {
        return HomePage.getServerSideProps(context, props);
    };

    /**
     * @private
     * @method getView
     * @returns {Object|null}
     */
    getView() {
        return HomePage.getView(
            HomePage.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    render() {
        return (
            <MainLayout>
                { this.getView() }
            </MainLayout>
        );
    }
}

export default Home;
