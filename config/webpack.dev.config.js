'use strict';

let path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FOLDERS = {
    APP: path.join(__dirname, '..', 'app'),
    BUILD: path.join(__dirname, '..', 'dist'),
    NPM: path.join(__dirname, '..', 'node_modules'),
  },
  NODE_ENV = process.env.NODE_ENV,
  APP_ENV = process.env.APP_ENV || NODE_ENV,
  ENV = require('./env')(APP_ENV);

  if (NODE_ENV !== APP_ENV) {
    ENV.BASE_URL = require('./env')(NODE_ENV).BASE_URL;
  }

console.log('--------- ' + APP_ENV + ' --------\n', JSON.stringify(ENV, null, '  '), '\n--------------------------');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(__dirname, '../app/index.js')
    ],
    output: {
      path: FOLDERS.BUILD,
      filename: 'app.bundle.js',
      publicPath: '/'
    },
      resolve: {
      extensions: ['.js', '.jsx', '.css'],
      modules: [
        'node_modules'
      ]
    },
    devServer: {
      inline: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      historyApiFallback: true,
      https: false,
      host: 'localhost',
      port: 3000
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        inject: false,
        favicon: 'app/assets/favicons/favicon.ico'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': NODE_ENV
      })
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'eslint-loader'
          }
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(svg|gif|jpg|png|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            },
          },
          exclude: /(node_modules)/
        }
      ]
    }
};
