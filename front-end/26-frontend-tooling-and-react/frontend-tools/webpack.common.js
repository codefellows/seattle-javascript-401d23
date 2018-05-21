'use strict';

require('dotenv').config();
// Vinicio: These files won't be transpiled

// const HTMLWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

// webpackConfig.plugins = [
//   new HTMLWebpackPlugin({
//     title: '401d23. If we can see this, you copy pasted',
//   }),
// ];

webpackConfig.module = {};
webpackConfig.module.rules = [
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader', // Vinicio - this is transpiling
      options: {
        presets: ['env', 'stage-0', 'react'],
        plugins: ['transform-react-jsx-source'],
        cacheDirectory: true,
      },
    },
  },
];
