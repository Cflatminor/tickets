import React from "react";
import Document, { Html, Main, NextScript } from 'next/document'

import HeadCustom from "components/headCustom/HeadCustom";

class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <HeadCustom />
                <body className="body">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

CustomDocument.getInitialProps = async function (ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {...initialProps};
};

export default CustomDocument;
