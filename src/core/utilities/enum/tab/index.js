import Enum from "app/core/utilities/enum/Enum";

let tabNameEnum = new Enum({
    fields: [
        {key: "main", value: ""},
        {key: "instruction", value: "instruction"},
        {key: "description", value: "description"},
        {key: "returnPolicy", value: "returnPolicy"}
    ]
});

export default {
    getInstance() {
        return tabNameEnum;
    }
};
