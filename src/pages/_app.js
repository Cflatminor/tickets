import React from "react";
import Head from 'next/head';
import App from "next/app";
import dynamic from "next/dynamic";

import {isNode} from "browser-or-node";

import SourceTypeEnum from "app/core/utilities/enum/sourceType";

// let RosselkhozBank = dynamic(import("components/dynamic/styles/framework/RosselkhozBank")),
//     AlfaBank = dynamic(import("components/dynamic/styles/framework/AlfaBank"));

import "styles/main.module.scss";

class Tickets extends App {
    constructor(props) {
        super(props);

        this.sourceTypeEnum = SourceTypeEnum.getInstance();
    }

    static getInitialProps(params) {
        let {Component, ctx} = params,
            props = {
                hasError: false,
                pageInfo: {
                    language: Tickets.getLanguageByContext(ctx)
                },
                pageProps: {
                    breadcrumbs: [],
                    initialData: {}
                }
            };

        if (isNode && Tickets.ignoredURL.includes(ctx.req.url)) {
            ctx.res.statusCode = 404;

            return Promise.resolve(props);
        }

        return new Promise((resolve) => {
            resolve(props.pageInfo);
        }).then(() => new Promise((resolve) => {
            Promise.resolve(Component.getInitialProps(ctx, props)).then((initialData) => {
                props.pageProps.initialData = Object.assign({}, initialData, props.pageProps.initialData);

                resolve(props);
            });
        }));
    };

    /**
     * @private
     * @method _isRosselkhozBank
     * @returns {boolean}
     */
    _isRosselkhozBank() {
        return this.sourceTypeEnum.isRosselkhozBank(this._getSourceType());
    }

    /**
     * @private
     * @method _isAlfaBank
     * @returns {boolean}
     */
    _isAlfaBank() {
        return this.sourceTypeEnum.isAlfaBank(this._getSourceType());
    }

    /**
     * @private
     * @method _getSourceType
     * @returns {string}
     */
    _getSourceType() {
        return this.props.router.query.sourceType || this.sourceTypeEnum.getRosselkhozBankAsValue();
    }

    render() {
        let {Component, hasError, pageProps, pageInfo} = this.props;

        return (
            <>
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    <title>Tickets</title>
                    {/*<link rel="manifest" href="/manifest.json"/>*/}
                </Head>

                {/*{this._isRosselkhozBank() && (*/}
                {/*    <RosselkhozBank />*/}
                {/*)}*/}

                {/*{this._isAlfaBank() && (*/}
                {/*    <AlfaBank />*/}
                {/*)}*/}

                <Component hasError={hasError} {...pageProps} pageInfo={pageInfo} />
            </>
        );
    }
}

/**
 * @static
 * @method getCurrentUrlByContext
 * @param context {Object}
 * @returns {string}
 */
Tickets.getLanguageByContext = function (context) {
    return "ru";
    // return (context.req && context.req.language) || context.query.subpath || LanguageEnum.getInstance().getRuAsValue();
};

/**
 * @property
 * @type {string[]}
 */
Tickets.ignoredURL = [
    "/json",
    "/uk/json",
    "/favicon.ico",
    "/uk/favicon.ico"
];

export default Tickets;
