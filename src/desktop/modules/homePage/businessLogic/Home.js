class Home {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
    }

    // /**
    //  * @private
    //  * @method _getReview
    //  * @param resultContainer {Object}
    //  * @returns {Promise}
    //  */
    // _getReview(resultContainer) {
    //     return new Promise((resolve) => {
    //         this.Repository.getReview({}, (faq) => {
    //             resultContainer.review = review;
    //
    //             resolve();
    //         }, () => {});
    //     });
    // }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            review: {}
        };

        return new Promise((resolve) => {
            Promise.all([
                // this._getReview(result)
            ]).then(resolve);
        })
            .then(() => result)
            .catch(() => result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            review: initialData.review,
            pageInfo
        };
    }
}

export default Home;
