import tickets from "../fixtures/tickets.json"
import ticketRules from "../fixtures/ticketRules.json"

class Repository {
    constructor(props) {
        this._tickets = tickets;
        this._ticketRules = ticketRules;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();
    }

    /**
     * @method getTicketsByRoute
     * @param route {Route}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getTicketsByRoute(route, success, error) {
        success(this._tickets);

        // return this.httpClient
        //     .setBaseUrl(this.urls.getCatalogByParamsAndQuery.domain)
        //     .request({
        //         path: this.urls.getCatalogByParamsAndQuery.path,
        //         method: this.HttpClient.methods.GET,
        //         query,
        //         params: filters
        //     })
        //     .then((response) => {
        //         success(new this.EntityTransformer(response.data).getFilterValue());
        //     }, error);
    }

    /**
     * @method getTicketRules
     * @param ticket {Ticket}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getTicketRules(ticket, success, error) {
        success(this._ticketRules);

        // return this.httpClient
        //     .setBaseUrl(this.urls.getCatalogByParamsAndQuery.domain)
        //     .request({
        //         path: this.urls.getCatalogByParamsAndQuery.path,
        //         method: this.HttpClient.methods.GET,
        //         query,
        //         params: filters
        //     })
        //     .then((response) => {
        //         success(new this.EntityTransformer(response.data).getFilterValue());
        //     }, error);
    }
}

export default Repository;
