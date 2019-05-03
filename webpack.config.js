const webpack = require('webpack');
const basePath = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        base: "./src/images/base.js",
        detail: "./src/images/detail.js"
    },
    mode: 'development',
    output: {
        //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径 
        path: basePath.join(__dirname, 'dist'), //输出位置
        filename: './images/[name].js' //输出文件
    },
    plugins: [
        // 没有这个无法实现热更新
        new HtmlWebpackPlugin({
            chunks: ["base"],
            template: './src/static/index.html',
            filename: './static/index.html',
            // favicon:'./src/images/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            chunks: ["base"],
            template: './src/static/bargain.html',
            filename: './static/bargain.html',
            // favicon:'./src/images/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            chunks: ["base"],
            template: './src/static/hundred.html',
            filename: './static/hundred.html',
            // favicon:'./src/images/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            chunks: ["base"],
            template: './src/static/search.html',
            filename: './static/search.html',
            // favicon:'./src/images/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            chunks: ["detail"],
            template: './src/static/detail.html',
            filename: './static/detail.html',
            // favicon:'./src/images/favicon.ico'
        }),
        // 热更新模块
        new webpack.HotModuleReplacementPlugin(),
        // 在热加载时直接返回更新文件名，而不是文件的id
        new webpack.NamedModulesPlugin(),
        // 用于清理输出目录
        new CleanWebpackPlugin(),
        // 用于处理vue单文件
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        limit: 1024, // size <= 1kib
                        outputPath: "images"
                    }
                }]
            }, {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }, {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        outputPath: "images/fonts/"
                    }
                }]
            }
        ]
    },
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: {
        contentBase: basePath.join(__dirname, "dist/static/"), // 设置服务器目录
        port: 8080,
        open: true, // 自动开启浏览器
        inline: true, // inline模式热更新
        host: '127.0.0.1',
        disableHostCheck: true // 设置host为127.0.0.1和disableHostCheck: true可以解决报错[WDS] Disconnected!
    },
    resolve: {
        alias: {
            // 设置vue别名，设置vue默认引用为runtime模式
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        }
    }

}