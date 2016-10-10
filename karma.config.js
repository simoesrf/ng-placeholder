module.exports = function (config) {
  config.set({
    basePath: '.',
    files: [
      { pattern: './configs/karma-shim.js', watched: false }
    ],
    preprocessors: {
      './configs/karma-shim.js': ['webpack', 'sourcemap']
    },
    webpack: require('./configs/webpack.test'),
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['dots'],
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