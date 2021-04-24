class Presenter {
    constructor(props) {
        this.Model = props.dependencies.Model;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return this.Model.normalizeInitialProps(initialData, pageInfo);
    }
}

export default Presenter;
