import React from "react";
import { Head } from "next/document";

// import Env from "app/core/environment";

class HeadCustom extends Head {
    // constructor(props) {
    //     super(props);
    //
    //     this.env = Env.getInstance();
    // }

    getCssLinks(documentFiles) {
        const { assetPrefix } = this.context;
        const allFiles = documentFiles.allFiles;
        const cssFiles = allFiles && allFiles.length ? allFiles.filter((f) => /.*\.css$/.test(f)) : [];

        const cssLinks = [
            // <link
            //     key="preload-img-1"
            //     // rel="stylesheet"
            //     rel="preload"
            //     href="https://s3.eu-west-1.amazonaws.com/031ecbe9-c4f2-11ea-96c2-0635d0043582-large.jpeg"
            //     as="image"
            //     crossOrigin="anonymous"
            // />
        ];

        cssFiles.forEach((file) => {
            cssLinks.push(
                <link
                    key={`${file}-preload`}
                    nonce={this.props.nonce}
                    rel="preload"
                    href={`${assetPrefix}/_next/${encodeURI(file)}`}
                    as="style"
                    crossOrigin={this.props.crossOrigin || process.crossOrigin}
                />
            );

            cssLinks.push(
                <link
                    key={file}
                    nonce={this.props.nonce}
                    rel="stylesheet"
                    href={`${assetPrefix}/_next/${encodeURI(file)}`}
                    crossOrigin={this.props.crossOrigin || process.crossOrigin}
                />
            );
        });

        return cssLinks.length === 0 ? null : cssLinks;
    }

    getPreloadMainLinks() {
        return [
            // <link
            //     key={1}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/lazy.js`}
            //     as="script"
            // />,
            //
            // <link
            //     key={212}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/fonts/Roboto/300/cyrillic-300.woff2`}
            //     as="font"
            //     crossOrigin="anonymous"
            // />
        ];
    }

    getPreloadDynamicChunks() {
        return [];
    }
}

export default HeadCustom;
