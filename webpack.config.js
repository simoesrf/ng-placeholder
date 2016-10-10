var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./configs/webpack.common');

module.exports = merge(
    common,
    {
        devtool: 'source-map',
        entry: {
            "ng-placeholder": './src/code/ng-placeholder.ts',
            "ng-placeholder.min": './src/code/ng-placeholder.ts',
        },
        output: {
            path: "./dist",
            filename: '[name].js'
        },
        watch: true,
        // Add minification
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true
            })
        ],
    }
);