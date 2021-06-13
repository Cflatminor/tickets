import Enum from "app/core/utilities/enum/Enum";

let serviceClass = new Enum({
    fields: [
        {key: "economy", value: "1"},
        {key: "comfort", value: "2"},
        {key: "business", value: "3"},
    ]
});

export default {
    getInstance() {
        return serviceClass;
    }
};
