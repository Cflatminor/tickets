import React from "react";

import Module from "desktop/modules/search";
import MainLayout from "app/desktop/layouts/main/Main";

class Search extends React.Component {
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
        return Module.getServerSideProps(context, props);
    };

    /**
     * @private
     * @method getView
     * @returns {Object|null}
     */
    getView() {
        console.log(this.props);

        return Module.getView(
            Module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
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

export default Search;
