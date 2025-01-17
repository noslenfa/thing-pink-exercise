'use strict';

let path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FOLDERS = {
    APP: path.join(__dirname, '..', 'app'),
    BUILD: path.join(__dirname, '..', 'dist'),
    NPM: path.join(__dirname, '..', 'node_modules')
  },
  NODE_ENV = process.env.NODE_ENV || 'production',
  APP_ENV = process.env.APP_ENV || NODE_ENV,
  ENV = require('./env')(APP_ENV);

  if (NODE_ENV !== APP_ENV) {
    ENV.BASE_URL = require('./env')(NODE_ENV).BASE_URL;
  }

console.log('--------- ' + APP_ENV + ' --------\n', JSON.stringify(ENV, null, '  '), '\n--------------------------');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
      './node_modules/normalize.css',
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
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        publicPath: '/',
        inject: false,
        favicon: 'app/assets/favicons/favicon.ico'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': NODE_ENV,
        'APP_ENV': APP_ENV
      })
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['eslint-loader']
        },
        {
          test: /\.(jsx|js)?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(svg|gif|jpg|png|ico|eot|ttf|woff|woff2)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        }
      ]
    }
};
