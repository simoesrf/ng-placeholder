module.exports = function (config) {
  config.set({
    files: [
      {
        pattern: './node_modules/angular/angular.js',
        watched: false
      },
      {
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
    browsers: ['Chrome'],
    reporters: ['dots', 'karma-typescript', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcovonly', subdir: '.' },
        { type: 'json', subdir: '.' },
      ]
    },
  });
};