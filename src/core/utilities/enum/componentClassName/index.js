import Enum from "app/core/utilities/enum/Enum";

let componentClassNameEnum = new Enum({
    fields: [
        {key: "authorizationModal", value: "authorization-modal"}
    ]
});

export default {
    getInstance() {
        return componentClassNameEnum;
    }
};
