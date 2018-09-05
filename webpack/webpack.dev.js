const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.WEB3_PROVIDER': JSON.stringify('https://ropsten.infura.io/'),
      'process.env.ETHERSCAN_URI': JSON.stringify('https://ropsten.etherscan.io/')
    }),
    new Dotenv()
  ]
})
