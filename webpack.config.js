const path = require('path');
const webWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


const htmlPlugin = new webWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/index.js',
    // print: './src/print.js'
  },
  devServer:{
    contentBase: './dist',
      hot: true,
      historyApiFallback: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins :[
    // new CleanWebpackPlugin(),
      htmlPlugin,
      new webpack.HotModuleReplacementPlugin()
  ],
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  "style-loader",
                  "css-loader"
              ],
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  "file-loader",
              ]
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
      ],
  },
};