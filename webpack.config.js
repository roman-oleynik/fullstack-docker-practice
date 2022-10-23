const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist"
}

module.exports = {
    mode,
    target,

    entry: "./src/index.tsx",

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/[hash][ext][query]"
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]

            },
            {
                test: /\.tsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(), 
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ],

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },

    devtool: "inline-source-map",

    devServer: {
        static: "./dist",
        port: 8080,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:3000',
        },
    }
}