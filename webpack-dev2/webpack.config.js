let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
    /**一些webpack的小插件
     * 1)cleanWebpackPlugin 清除残留打包文件
     * 2)copyWebpackPlugin 把某个文件打包拷贝到dist文件下
     * 3)bannerPlugin 内置 版权声明
     */
module.exports = {
    devServer: {
        //开发服务器的配置
        port: 8889,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{ from: 'doc', to: './' }]),
        new webpack.BannerPlugin('make 2019 by zhunny')
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}