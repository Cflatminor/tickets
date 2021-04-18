import React from "react";
import Head from 'next/head';
import App from "next/app";

import 'styles/main.module.scss';

class Tickets extends App {
    static async getInitialProps(params) {
        let {Component, ctx} = params,
            props = {
                hasError: false,
                pageInfo: {},
                pageProps: {
                    breadcrumbs: [],
                    initialData: {}
                }
            };

        return new Promise((resolve) => {
            resolve(props);
        }).then(() => new Promise((resolve) => {
            Promise.resolve(Component.getInitialProps(ctx, props)).then((initialData) => {
                props.pageProps.initialData = Object.assign(initialData, props.pageProps.initialData);

                resolve(props);
            });
        }));
    };

    render() {
        let {Component, pageProps} = this.props;

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

                <Component {...pageProps} />
            </>
        );
    }
}

export default Tickets;
