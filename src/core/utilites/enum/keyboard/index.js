import Enum from "app/core/utilites/enum/Enum";

let pageTypes = new Enum({
    fields: [
        {key: "enter", value: "13"},
        {key: "esc", value: "27"},
        {key: "tab", value: "9"}
    ]
});

export default {
    getInstance() {
        return pageTypes;
    }
};
