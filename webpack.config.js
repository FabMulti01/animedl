const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
    const config = {
        mode: "production",
        module: {
            rules: [
                {
                    //Typescript
                    test: /\.(ts)|(tsx)$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        output: {
            path: path.resolve(__dirname, "./app"),
        },
    };

    const renderer = merge(config, {
        target: "electron-renderer",
        entry: "./src/renderer.tsx",
        output: {
            filename: "renderer.js",
        },
        module: {
            rules: [
                {
                    //SCSS
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
            }),
        ],
    });

    const main = merge(config, {
        target: "electron-main",
        entry: "./src/main.ts",
        output: {
            filename: "main.js",
        },
    });

    return [renderer, main];
};
