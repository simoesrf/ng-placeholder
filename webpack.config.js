var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: ['node_modules', 'tests'] }
        ]
    },
    cache: true,
    entry: {
        "ng-placeholder": './src/ng-placeholder.ts',
        "ng-placeholder.min": './src/ng-placeholder.ts',
    },
    output: {
        path: "./dist",
        filename: '[name].js'
    },
    watch: false,
    // Add minification
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
};