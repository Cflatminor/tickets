import Enum from "app/core/utilities/enum/Enum";

let pageTypes = new Enum({
    fields: [
        {key: "ru", value: "ru"},
        {key: "ua", value: "uk"}
    ]
});

export default {
    getInstance() {
        return pageTypes;
    }
};
