let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
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
    //1)源码映射，会单独产生一个sourcemap文件 出错了会表示，当前报错的列和行，大而全
    devtool: 'source-map',
    //2）不会产生单独的文件，但是可以显示行和列
    // devtool: 'eval-source-map',
    //3)不会产生行和列，但是是一个单独的映射文件
    // devtool:'cheap-module-source-map',//单独调试
    //4)不会产生文件 集成在打包后的文件中 不会产生列
    //devtool:'cheap-module-eval-source-map'
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