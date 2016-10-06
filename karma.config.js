module.exports = function (config) {
  config.set({
    basePath: '.',
    files: [
      { pattern: './dev_configs/karma-shim.js', watched: false }
    ],
    preprocessors: {
      './dev_configs/karma-shim.js': ['webpack', 'sourcemap']
    },
    webpack: require('./dev_configs/webpack.test'),
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['dots', 'progress'],
    webpackMiddleware: {
      stats: 'errors-only'
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ]
  });
};