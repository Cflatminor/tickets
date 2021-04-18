const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    future: {
        webpack5: true
    },
    webpack(config, { isServer, webpack }) {
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

        if (!isServer) {
            config.module.rules.push({
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    // "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: false
                        }
                    },
                    "sass-loader",
                ],
            });
        }

        Object.assign(config.resolve.alias, {
            app: path.resolve(__dirname, "./src"),
            desktop: path.resolve(__dirname, "./src/desktop"),
            components: path.resolve(__dirname, "./src/desktop/components"),
            config: path.resolve(__dirname, "./src/config"),
            pages: path.resolve(__dirname, "./src/pages"),
            styles: path.resolve(__dirname, "./src/styles")
        });

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: "static/css/[name].css"
            }),
        );

        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

        return config;
    }
}
