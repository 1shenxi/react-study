const { resolve } = require('path');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: resolve(__dirname, '..'),

  entry: {
    index: './src/index.js',
  },

  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, '../dist'),
  },

  plugins: [
    new WebpackBar({
      name: 'SX-CLI',
      profile: true,
      fancy: true,
    }),

    new HtmlWebpackPlugin({
      title: 'React-Study By SX-CLI',
      filename: 'index.html',
      template: resolve(__dirname, '../public/index.html'),
    }),
  ],
};
