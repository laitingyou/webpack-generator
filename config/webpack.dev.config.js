const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(common,{
  mode: 'development',
  // devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    rules: [

      // {
      //   test: /\.(js|jsx)$/,
      //   use: [ 'react-hot-loader/babel' ]
      // }

    ]
  }
})
