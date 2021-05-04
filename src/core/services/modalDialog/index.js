import Observer from "app/core/utilities/observer/Observer";

import ModalDialog from "./ModalDialog";

let modalDialog = new ModalDialog({
    dependencies: {
        Observer
    }
});

export default {
    getInstance() {
        return modalDialog;
    }
};
