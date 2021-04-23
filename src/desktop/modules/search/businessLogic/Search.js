class Search {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {};

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
            pageInfo
        };
    }
}

export default Search;
