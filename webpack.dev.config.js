const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dev-bundle.js',
        path: path.resolve(__dirname, './dist'),

    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        port: 8100,
        hot: true,
        writeToDisk: true,

    }

};