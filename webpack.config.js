const path = require('path');

module.exports = {
    entry  : './src/index.js',
    output : {
        path     : path.resolve(__dirname, 'lib'),
        filename : 'index.js'
    },
    module : {
        rules: [ {
                test   : /.js$/,
                loader : 'babel-loader'
            }
        ]
    }
};

