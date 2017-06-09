var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devServer: {
        inline: true,
        hot: true,
        contentBase: './dev'
    },
    //target: 'node',
    devtool: 'source-map',
    debug: true,
    watch: true,
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        //'webpack/hot/only-dev-server',
        './dev/assets/styles/index.less',
        './dev/src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, '/dev'),
        filename: '[name].js',
        library: '[name]',
        publicPath: 'src'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./assets/styles/common.css')
    ],
    module: {
        /*preLoaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],*/
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|svg)$/,
                loader: 'file',
                query: {
                    limit: 30000,
                    name: '[name].[ext]'
                }
            }
        ]
    }
};