import Enum from "app/core/utilities/enum/Enum";

let gender = new Enum({
    fields: [
        {key: "female", value: "female"},
        {key: "male", value: "male"}
    ]
});

export default {
    getInstance() {
        return gender;
    }
};
