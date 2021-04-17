import "isomorphic-fetch";
import "es6-promise/auto";
import "abort-controller/polyfill";

import _ from "lodash";

import AbortController from "abort-controller";
import AbstractAdapter from "./AbstractAdapter";

class FetchAdapter extends AbstractAdapter {
    /**
     * @method
     * @returns {void}
     */
    async makeRequest() {
        let controller = new AbortController(),
            signal = controller.signal;

        this.request.on("cancel", function () {
            controller.abort();
        });

        setTimeout(() => {
            controller.abort();
        }, this.request.getTimeoutValue());

        try {
            let response = await fetch(this.request.getUrl(), {
                method: this.request.getMethod().getName(),
                headers: this.request.getHeaders(),
                body: this.request.getBody(),
                signal,
                ...this.request.getAdapterOptions()
            });

            if (response.ok) {
                let result = null;

                if (this.request.getResponseType().isJSON()) {
                    result = await response.json();
                } else if (this.request.getResponseType().isTEXT()) {
                    result = await response.text();
                }

                this.success(
                    response.status,
                    typeof window !== "undefined" ? _.fromPairs(response.headers.entries()) : response.headers,
                    result
                );
            } else {
                this.error(await response.text(), response.status);
            }
        } catch (error) {
            this.error(error.message);
        }
    }
}

export default FetchAdapter;
