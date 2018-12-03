const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack')
const minimist = require('minimist')

const args = minimist(process.argv.slice(2) || 'pro')

const config = require(`./webpack.${args.env}.config.js`)
const options = {
  contentBase: '../dist',
  hot: true,
  host: 'localhost',
  inline: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
