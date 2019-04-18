const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    devServer: {
        port: 8889,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            filename: 'index.html',

        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ],
    module: {
        noParse: /jquery/, //不去解析jquery中的依赖关系
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.resolve('src'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        }]
    }
}