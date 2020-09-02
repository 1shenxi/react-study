/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');
const minimist = require('minimist');
const chalk = require('chalk');
const webpackBaseConfig = require('./webpack.base');
const prepareURLs = require('./utils/prepareURLs');

const argv = minimist(process.argv.slice(2));

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
});

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
  logLevel: 'silent',
  writeToDisk: argv.watch || argv.w,
});

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  https: false,
};

compiler.hooks.compile.tap('sx-cli dev', () => {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
});

compiler.hooks.done.tap('sx-cli dev', () => {
  const urls = prepareURLs('http', defaults.host, defaults.port, '/');
  console.log('  App running at:');
  console.log(`  - Local:   ${chalk.cyan(urls.localUrlForTerminal)}`);
  console.log(`  - NetWork:   ${chalk.cyan(urls.lanUrlForTerminal)}`);
  console.log();
});

server.listen(defaults.port, () => {});
