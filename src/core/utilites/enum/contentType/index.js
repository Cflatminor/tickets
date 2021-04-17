import Enum from "app/core/utilites/enum/Enum";

let contentType = new Enum({
    fields: [
        {key: "default", value: "default"}
    ]
});

export default {
    getInstance() {
        return contentType;
    }
};
