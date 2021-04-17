import Observer from "app/core/utilites/observer/Observer";

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
