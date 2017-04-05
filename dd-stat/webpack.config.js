const path = require('path')

const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')

//const nodeEnv = progress.env.NODE_ENV || 'development'

module.exports = {
    entry: './lib/index.js',
    output: {
        path: './',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
