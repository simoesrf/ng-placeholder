var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common');

module.exports = merge(
    common,
    {
        devtool: 'inline-source-map',
        watch: true
    }
);