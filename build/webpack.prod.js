const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseConfig = require('./webpack.base');

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(),
  ],

  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  // },

});
webpack(webpackConfig, () => {});
