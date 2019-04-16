//webpack是用node写的
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //压缩js
let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
module.exports = {
    devServer: { //开发服务器的配置
        port: 8889,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    mode: 'development', //模式 生产环境production 开发模式development
    entry: './src/index.js', //入口
    output: { //出口
        filename: 'bundle.[hash:8].js', //打包后的文件名,[hash]每次打包生成新的文件
        //__dirname以当前目录解析成绝对路径
        path: path.resolve(__dirname, 'dist'), ///路径必须是绝对路径，因此需要一个node模块来辅助配置 path.resolve把相对路径解析成绝对路径
        publicPath: 'http://www.hellp.com'

    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true, //缓存
                parallel: true, //并发压缩
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 去除双引号
                collapseWhitespace: true, //变成一行

            },
            hash: true //添加一个hash戳
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ],
    module: {
        rules: [ //css-loader 主要是解析css文件中的@import语法的
            //style-loader 把css插入到head的标签中
            //loader的特点 希望单一
            //loader的用法。字符串只用一个loader 多个loader需要用数组 loader的顺序 默认从右向左 从下往上执行
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { "legacy": true }], //装饰器
                            ['@babel/plugin-proposal-class-properties', { "loose": true }], //class
                            ['@babel/plugin-transform-runtime'] //generator
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre' //在普通loader之前执行
            //         }
            //     },

            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: '/img/'
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            }
        ]
    }
}