module.exports = function (config) {
  config.set({
    // basePath: '.',
    files: [
      {
        pattern: './node_modules/angular/angular.js',
        watched: false
      }, {
        pattern: './node_modules/angular-mocks/angular-mocks.js',
        watched: false
      }, {
        pattern: './src/**/*.ts',
        watched: true
      }, {
        pattern: './tests/**/*.ts',
        watched: true
      }
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    frameworks: ['jasmine', 'karma-typescript'],
    browsers: ['PhantomJS'],
    reporters: ['dots', 'karma-typescript']
  });
};