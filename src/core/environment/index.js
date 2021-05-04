import LanguageEnum from "app/core/utilities/enum/language";

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
