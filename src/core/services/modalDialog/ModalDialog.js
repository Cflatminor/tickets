class ModalDialog {
    constructor(props) {
        this.observer = new props.dependencies.Observer().installTo(this);
    }

    /**
     * @public
     * @method open
     * @param opts {Object}
     * @returns {ModalDialog}
     */
    open(opts) {
        opts.size = opts.size || this.getSizes().getMd();

        this.observer.trigger("open", opts);

        return this;
    }

    /**
     * @public
     * @method close
     * @returns {ModalDialog}
     */
    close() {
        this.observer.trigger("close");

        return this;
    }

    /**
     * @public
     * @method getSizes
     * @returns {{getMd(): string, getLg(): string, getSm(): string}}
     */
    getSizes() {
        return {
            getSm() {
                return "sm";
            },
            getMd() {
                return "md";
            },
            getLg() {
                return "lg";
            }
        };
    }

    /**
     * @method getTypes
     * @returns {string|{getInfo(): string}}
     */
    getTypes() {
        return {
            getInfo() {
                return "info";
            }
        };
    }
}

export default ModalDialog;
