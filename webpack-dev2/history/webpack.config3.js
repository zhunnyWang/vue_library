let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
    /**一些webpack的小插件
     * 1)cleanWebpackPlugin
     * 2)copyWebpackPlugin
     * 3)bannerPlugin 内置
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
    watch: true,
    watchOptions: {
        //监控选项，实时打包
        poll: 1000, //每秒问1000次
        aggregateTimeout: 500, //防抖 500ms 一直输入代码 不能说写个字母打包一次 一直输入不打包，输入完过500ms打包
        ignored: /node_modules/ //不需要监控哪个文件
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
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