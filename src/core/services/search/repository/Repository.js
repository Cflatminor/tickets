class Repository {
    constructor(props) {
        /**
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        /**
         * @property HttpClient
         * @type {HttpClient}
         */
        this.HttpClient = props.dependencies.HttpClient;

        /**
         * @property httpClient
         * @type {HttpClient}
         */
        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getItemsByQuery(query, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getItemsByQuery.domain)
            .request({
                path: this.urls.getItemsByQuery.path,
                method: this.HttpClient.methods.GET,
                query: {query}
            })
            .then((response) => {
                success(response.data || []);
            }, error);
    }
}

export default Repository;