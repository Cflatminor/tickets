import Env from "app/core/environment";
import Resource from "app/core/resource";
import Strings from "app/core/utilites/strings";

import Translator from "./Translator";

let translator = new Translator({
    dependencies: {
        Resource,
        Env: Env.getInstance(),
        Strings: Strings.getInstance()
    }
});

export default {
    stringKeys: translator.getStringKeys(),
    getInstance() {
        return translator;
    }
};
