import Env from "app/core/environment";

import AirportEntity from "app/core/entities/airport/Airport";

import HttpClient from "app/core/utilities/httpClient/HttpClient";

import Repository from "./repository/Repository";
import Search from "./Search";

let search = new Search({
    dependencies: {
        Repository: new Repository({
            dependencies: {
                HttpClient
            },
            urls: {
                // getItemsByQuery: {
                //     domain: Env.getInstance().getSearchServiceHost(),
                //     path: "/bitrix/templates/apteka24/ajax.php"
                // },
                getFlightPoint: {
                    domain: Env.getInstance().getSearchServiceHost(),
                    // path: "/flight-point",
                    path: "/users",
                    query: {
                        query: ""
                    }
                }
            }
        }),
        AirportEntity
    }
});

export default {
    getInstance() {
        return search;
    }
};
