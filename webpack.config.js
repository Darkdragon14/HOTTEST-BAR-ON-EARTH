var webpack = require('webpack');
var path = require('path');


module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
       path: path.resolve(__dirname,'build'),
       filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
