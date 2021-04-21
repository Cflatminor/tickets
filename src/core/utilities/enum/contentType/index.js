import Enum from "app/core/utilities/enum/Enum";

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
