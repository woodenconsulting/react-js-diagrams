var path = require('path');

module.exports = [{
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    library: 'react-js-diagrams'
  },
  externals: {
    "react": 'react',
    "lodash": {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.js[x]{0,1}$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
},
//for building the demos and tests
{
  entry: {
    'demo1/bundle.js': './demos/demo1/index.js',
    'demo2/bundle.js': './demos/demo2/index.js',
    'demo3/bundle.js': './demos/demo3/index.js',
  },
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  externals: {
    "react-dom": "ReactDOM",
    "react": 'React',
    "lodash": {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.js[x]{0,1}$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
}];
