const path = require('path')
module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'src/**/*.js', type: 'module'},
        'node_modules/jasmine-ajax/lib/mock-ajax.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['karma-coverage-istanbul-instrumenter']
    },
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulInstrumenter: {
      esModules: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      reports: ['lcov'],
      dir: path.join(__dirname, 'coverage'),
    }
  })
}
