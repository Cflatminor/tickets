import React from "react";

import MainLayout from "app/desktop/layouts/main/Main";

class About extends React.Component {
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
        return Promise.resolve({});
    };

    render() {
        return (
            <MainLayout>
                <div>About</div>
            </MainLayout>
        );
    }
}

export default About;