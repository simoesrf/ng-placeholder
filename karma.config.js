module.exports = function (config) {
    config.set({
        // ... normal karma configuration
        basePath: '.',

        files: [
            // all files ending in "_test"
            { pattern: 'test/*_test.js', watched: false },
            { pattern: 'test/**/*_test.js', watched: false }
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            'test/*_test.js': ['webpack'],
            'test/**/*_test.js': ['webpack']
        },

        webpack: {

        },

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },
        plugins: [
            'karma-spec-reporter',
            'karma-chrome-launcher'
        ]
    });
};