var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: './dev',
    },
    //target: 'node',
    debug: true,
    watch: true,
    //context: './dev',
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        //'webpack/hot/only-dev-server',
        './dev/assets/styles/index.less',
        './dev/src/app.jsx'
    ],
    output: {
        path: '/dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('/assets/styles/common.css')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url?limit=30000&name=/assets/fonts/[name]-[hash].[ext]'
            }
        ]
    }
};