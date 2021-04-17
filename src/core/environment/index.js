import LanguageEnum from "app/core/utilites/enum/language";

import Env from "./Env";

let env = new Env({
    dependencies: {
        LanguageEnum: LanguageEnum.getInstance()
    }
});

export default {
    getInstance() {
        return env;
    }
};
