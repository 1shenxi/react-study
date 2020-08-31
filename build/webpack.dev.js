/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');
const chalk = require('chalk');
const webpackBaseConfig = require('./webpack.base');
const prepareURLs = require('./utils/prepareURLs');

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
});

const server = new WebpackDevServer(webpack(webpackConfig), {
  logLevel: 'silent',
  writeToDisk: false,
});

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  https: false,
};

const urls = prepareURLs('http', defaults.host, defaults.port, '/');

console.log();
console.log('  App running at:');
console.log(`  - Local:   ${chalk.cyan(urls.localUrlForTerminal)}`);
console.log(`  - NetWork:   ${chalk.cyan(urls.lanUrlForTerminal)}`);
console.log();

server.listen(defaults.port, (err) => {
  console.log('err', err);
});
