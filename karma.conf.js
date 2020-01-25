module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'src/**/*.js', type: 'module'},
        'node_modules/jasmine-ajax/lib/mock-ajax.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    client: {
      jasmine: {
        random: true,
        seed: '4321',
        oneFailurePerSpec: true,
        failFast: true,
        timeoutInterval: 1000,
        helpers: [
          'node_modules/jasmine-ajax/lib/mack-ajax.js'
        ]
      }
    }
  })
};
