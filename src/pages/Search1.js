import React from "react";
import PropTypes from "prop-types";

import module from "desktop/modules/search";
import MainLayout from "app/desktop/layouts/main/Main";
// import Error from "app/desktop/components/error/Error";
// import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class Search1 extends React.Component {
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
        // return module.getServerSideProps(context, props);

        return Promise.resolve({});
    };

    /**
     * @private
     * @method getView
     * @returns {Object|null}
     */
    getView() {
        return module.getView(
            module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    // render() {
    //     return (
    //         <MainLayout>
    //             { this.getView() }
    //         </MainLayout>
    //     );
    // }

    render() {
        return (
            <MainLayout>
                <div>About</div>
            </MainLayout>
        );
    }
}

Search1.getInitialProps = function (context, props) {
    // return module.getServerSideProps(context, props);

    return Promise.resolve({});
};

export default Search1;
