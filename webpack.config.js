var webpack = require('webpack');

module.exports = {
    entry: './src/ng-placeholder.ts',
    output: {
        filename: './dist/ng-placeholder.js'
    },
    // Turn on sourcemaps
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    watch: true,
    // Add minification
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}