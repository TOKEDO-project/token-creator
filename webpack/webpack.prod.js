const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: true // remove console.log
        }
      }
    }),
    new CleanWebpackPlugin(['build']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.WEB3_PROVIDER': JSON.stringify('https://mainnet.infura.io/'),
      'process.env.ETHERSCAN_URI': JSON.stringify('https://etherscan.io/')
    }),
    new webpack.EnvironmentPlugin(['NET'])
  ]
})
