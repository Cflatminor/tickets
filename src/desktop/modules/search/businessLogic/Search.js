class Search {
    constructor(props) {
        this._Repository = props.dependencies.Repository;
        this._FilterBuilder = props.dependencies.FilterBuilder;

        this._TicketEntity = props.dependencies.TicketEntity;
    }

    /**
     * @method _buildTickets
     * @param items {Array}
     * @return {Ticket[]}
     * @private
     */
    _buildTickets(items) {
        return items.map((item) => new this._TicketEntity(item));
    }

    /**
     * @method _getFAQ
     * @param resultContainer {Object}
     * @return {Promise}
     * @private
     */
    _getFAQ(resultContainer) {
        return new Promise((resolve) => {
            this._Repository.getFAQ().then((items) => {
                resultContainer.FAQ = items;

                resolve();
            }, resolve);
        })
    }

    /**
     * @public
     * @method getTicketsByRoute
     * @param route {Route}
     * @param success {Function}
     * @param error {Function}
     * @returns {Search}
     */
    getTicketsByRoute(route, success, error) {
        this._Repository.getTicketsByRoute(route, (items) => {
            setTimeout(() => {
                success(
                    this._buildTickets(items),
                    this._FilterBuilder.buildFilter(route, this._buildTickets(items))
                );
            }, 2000);
        }, error);

        return this;
    }

    /**
     * @public
     * @method getTicketRules
     * @param ticket {Ticket}
     * @param success {Function}
     * @param error {Function}
     * @returns {Search}
     */
    getTicketRules(ticket, success, error) {
        this._Repository.getTicketRules(ticket, (rules) => {
            setTimeout(() => {
                success(rules);
            }, 2000);
        }, error);

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            FAQ: []
        };

        return new Promise((resolve) => {
            Promise.all([
                this._getFAQ(result)
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
            FAQ: initialData.FAQ,
            pageInfo
        };
    }
}

export default Search;
