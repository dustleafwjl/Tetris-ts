const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve("./dist"),
        filename: "script/bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {test: /.ts$/, use: {
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }} // webpack不能解析TS，交给loader解析
        ]
    },
    resolve: {
        extensions: [".ts", ".js"], // 让webpack查找文件时，查找ts和js
    }
}