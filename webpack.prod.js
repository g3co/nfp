var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        //'webpack-dev-server/client?http://localhost:8080',
        //'webpack/hot/only-dev-server',
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
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('./assets/styles/common.css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ],
    module: {loaders: [
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