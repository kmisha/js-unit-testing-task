module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/**/*.spec.js'],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap', 'coverage'],
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: {
      module: {
        rules: [
          {
            test: /.js$/,
            loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|\.spec\.js$)/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post',
            options: {
              esModules: true
            }
          }
        ]
      },
      mode: 'development',
      devtool: 'source-map'
    },
    reporters: ['progress', 'coverage-istanbul'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
};
