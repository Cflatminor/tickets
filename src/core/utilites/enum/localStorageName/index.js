import Enum from "app/core/utilites/enum/Enum";

let localStorageNameEnum = new Enum({
    fields: [
        {key: "token", value: "token"},
        {key: "cookieAgreement", value: "cookieAgreement"}
    ]
});

export default {
    getInstance() {
        return localStorageNameEnum;
    }
};
