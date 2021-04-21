import Enum from "app/core/utilities/enum/Enum";

let sourceTypeEnum = new Enum({
    fields: [
        {key: "rosselkhozBank", value: "1"},
        {key: "alfaBank", value: "2"}
    ]
});

export default {
    getInstance() {
        return sourceTypeEnum;
    }
};
