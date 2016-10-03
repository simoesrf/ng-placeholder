var webpack = require('webpack');
var merge   = require('webpack-merge');
var common  = require('./dev_configs/webpack.common');

module.exports = merge(
    common,
    {
        devtool: 'source-map',
        entry: './src/code/ng-placeholder.ts',
        output: {
            filename: './dist/ng-placeholder.js'
        },
        watch: true,
        // Add minification
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ],
    }
);