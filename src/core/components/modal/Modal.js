import _ from "lodash";
import React from "react";
import classnames from "classnames";

import Dom from "app/core/utilities/dom";
import ModalDialog from "app/core/services/modalDialog";

class Modal extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property ref
         * @type {Object}
         */
        this.ref = {
            modal: React.createRef()
        };

        this.state = {
            isOpen: false,
            config: {
                title: "",
                className: "",
                size: "",
                type: "",
                html: false,
                confirm: {
                    title: "",
                    callback: () => {}
                },
                cancel: {
                    title: "",
                    callback: () => {}
                },
                body: null
            }
        };

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialog.getInstance();

        this.toCancel = this.toCancel.bind(this);
        this.toConfirm = this.toConfirm.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.closeDialogByOverlay = this.closeDialogByOverlay.bind(this);
    }

    /**
     * @protected
     * @returns {void}
     */
    componentDidMount() {
        this.modalDialogService
            .on("open", this.openDialog)
            .on("close", this.closeDialog);
    }

    /**
     * @private
     * @method isOpen
     * @returns {boolean}
     */
    isOpen() {
        return this.state.isOpen;
    }

    /**
     * @private
     * @method isHtmlBody
     * @returns {boolean}
     */
    isHtmlBody() {
        return Boolean(this.state.config.html);
    }

    /**
     * @private
     * @method hasFooter
     * @returns {boolean}
     */
    hasFooter() {
        return this.hasConfirmAction() || this.hasCancelAction();
    }

    /**
     * @private
     * @method hasConfirmAction
     * @returns {boolean}
     */
    hasConfirmAction() {
        let {confirm} = this.state.config;

        return Boolean(confirm && confirm.title && _.isFunction(confirm.callback));
    }

    /**
     * @private
     * @method hasCancelAction
     * @returns {boolean}
     */
    hasCancelAction() {
        let {cancel} = this.state.config;

        return Boolean(cancel && cancel.title && _.isFunction(cancel.callback));
    }

    /**
     * @private
     * @method toggleScroll
     * @param state {boolean}
     * @returns {Modal}
     */
    toggleScroll(state) {
        this.dom.toggleScroll(state);

        return this;
    }

    /**
     * @private
     * @method buildConfirmButton
     * @returns {string}
     */
    buildConfirmButton() {
        return (
            <button type="button" className="text-uppercase btn-default btn-md" onClick={this.toConfirm}>
                {this.state.config.confirm.title}
            </button>
        );
    }

    /**
     * @private
     * @method buildCancelButton
     * @returns {string}
     */
    buildCancelButton() {
        return (
            <button type="button" className="text-uppercase btn-default btn-md" onClick={this.toCancel}>
                {this.state.config.cancel.title}
            </button>
        );
    }

    /**
     * @private
     * @method getModalClassName
     * @returns {Array}
     */
    getModalClassName() {
        let result = [`modal-${this.state.config.size}`, this.state.config.className];

        if (this.state.config.type) {
            result.push(`modal-${this.state.config.type}`);
        }

        return result;
    }

    /**
     * @private
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.state.config.title;
    }

    /**
     * @private
     * @method getModalBody
     * @returns {*}
     */
    getModalBody() {
        let body = this.state.config.body;

        return this.isHtmlBody() ? (<div dangerouslySetInnerHTML={{__html: body}} />) : body;
    }

    /**
     * @private
     * @method openDialog
     * @param opts {Object}
     * @returns {Modal}
     */
    openDialog(opts) {
        this
            .toggleScroll(false)
            .setState(() => ({
                config: opts,
                isOpen: true
            }));

        return this;
    }

    /**
     * @private
     * @method closeDialog
     * @returns {Modal}
     */
    closeDialog() {
        this
            .toggleScroll(true)
            .setState(() => ({
                isOpen: false,
                config: {}
            }));

        return this;
    }

    /**
     * @private
     * @method closeDialogByOverlay
     * @param e {Object}
     * @returns {Modal}
     */
    closeDialogByOverlay(e) {
        e.persist();

        if (e.target === this.ref.modal.current) {
            this.closeDialog();
        }

        return this;
    }

    /**
     * @private
     * @method toConfirm
     * @returns {Modal}
     */
    toConfirm() {
        if (this.hasConfirmAction()) {
            this.state.config.confirm.callback();
        }

        this.closeDialog();

        return this;
    }

    /**
     * @private
     * @method toCancel
     * @returns {Modal}
     */
    toCancel() {
        if (this.hasCancelAction()) {
            this.state.config.cancel.callback();
        }

        this.closeDialog();

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {string|boolean}
     */
    render() {
        return this.isOpen() && (
            <div
                className={classnames("modal d-flex align-items-center justify-content-center", this.getModalClassName())}
                ref={this.ref.modal}
                onClick={this.closeDialogByOverlay}
            >
                <div className="modal-dialog">
                    <div className="modal-content box-shadow-7">
                        <div className="modal__header">
                            <button type="button" className="modal__close" onClick={this.toCancel}>
                                <span className="icon icon-close" />
                            </button>

                            <p className="modal__title clip">{this.getTitle()}</p>
                        </div>

                        <div className="modal__body custom-scroll">
                            {this.getModalBody()}
                        </div>

                        {
                            this.hasFooter() && (
                                <div className="modal__footer text-right">
                                    {this.hasConfirmAction() && this.buildConfirmButton()}
                                    {this.hasCancelAction() && this.buildCancelButton()}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
