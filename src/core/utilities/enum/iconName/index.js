import Enum from "app/core/utilities/enum/Enum";

let iconName = new Enum({
    fields: [
        {key: "lastArticles", value: "comment-edit"}
    ]
});

export default {
    getInstance() {
        return iconName;
    }
};
