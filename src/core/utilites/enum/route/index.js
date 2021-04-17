import routesConfig from "config/routes";

import Enum from "app/core/utilites/enum/Enum";

let routeNameEnum = new Enum({
    fields: routesConfig.routes.map(function (item) {
        return {key: item.name, value: item.name};
    })
});

export default {
    getInstance() {
        return routeNameEnum;
    }
};
