const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    target: "web",
    entry: {
        'dcent-provider': './src/index.js'
    },

    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',

    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'this'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),
    ],
}