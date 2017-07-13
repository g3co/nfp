var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './dev/index.html',
        './dev/assets/styles/index.less',
        './dev/src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'src/[name].js',
        library: '[name]'
    },
    plugins: [
        new ExtractTextPlugin('./assets/styles/common.css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false
        })
    ],
    module: {
        loaders: [
            {
                test: /\.html/,
                loader: 'file?name=[name].[ext]'
            },
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
            }
        ]
    }
};