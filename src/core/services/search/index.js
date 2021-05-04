import Env from "app/core/environment";

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
                getItemsByQuery: {
                    domain: Env.getInstance().getBitrixHost(),
                    path: "/bitrix/templates/apteka24/ajax.php"
                }
            }
        })
    }
});

export default {
    getInstance() {
        return search;
    }
};
