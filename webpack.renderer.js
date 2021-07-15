const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = function (config) {
  if (isDevelopment) {
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
