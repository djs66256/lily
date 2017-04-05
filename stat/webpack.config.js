const path = require('path')

const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')

//const nodeEnv = progress.env.NODE_ENV || 'development'

module.exports = {
    entry: ['babel-polyfill', './lib2/index.js'],
    output: {
        path: path.join(__dirname, 'app', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    /lib/,
                    /app/,
                    /script/,
                    /node_modules(\\|\/)dd-stat/
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.less/,
                loader: 'less-loader'
            },
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
  devtool: "sourcemap",
    plugins: [
      new Copy([
        {
          from: './assets',
          to: './assets'
        }
      ]),
      new webpack.LoaderOptionsPlugin({
       debug: true
     })
  ],
  target: "electron"
}
