const path = require("path");
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["swiper", "dom7"]);
const withSourceMaps = require("@zeit/next-source-maps");

// const { nextI18NextRewrites } = require('next-i18next/rewrites');

// const localeSubpaths = {
//     uk: "uk"
// };

module.exports = withPlugins(
    [
        withBundleAnalyzer({
            enabled: process.env.ANALYZE === "true"
        }),
        withFonts,
        withCSS,
        withSass,
        withTM,
        withSourceMaps
    ],
    {
        trailingSlash: true,
        poweredByHeader: false,
        useFileSystemPublicRoutes: false,
        enableSvg: true, // withFonts
        compress: false,
        serverRuntimeConfig: {
            // Will only be available on the server side
            // mySecret: 'secret',
        },
        // rewrites: async () => nextI18NextRewrites(localeSubpaths),
        publicRuntimeConfig: {
            getPublicHost: process.env.NEXT_PUBLIC_HOST
        },
        assetPrefix: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_STATIC_RESOURCES_HOST : "",
        webpack(config) {
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "url-loader"
                }
            });

            config.module.rules.push({
                test: /\.txt$/,
                use: "raw-loader"
            });

            Object.assign(config.resolve.alias, {
                app: path.resolve(__dirname, "./src"),
                desktop: path.resolve(__dirname, "./src/desktop"),
                components: path.resolve(__dirname, "./src/desktop/components"),
                config: path.resolve(__dirname, "./src/config"),
                pages: path.resolve(__dirname, "./src/pages"),
                styles: path.resolve(__dirname, "./src/styles")
            });

            config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

            return config;
        }
    }
);
