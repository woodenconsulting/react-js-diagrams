var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');

// Update config entry and output
config[1].entry = {
  bundle: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/main.js'
  ],
  demos: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './demos/index.js'
  ],
  demo1: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './demos/demo1/index.js'
  ],
  demo2: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './demos/demo2/index.js'
  ],
  demo3: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './demos/demo3/index.js'
  ]
};
config[1].output.filename = '[name].js';
config[1].output.path = path.join(__dirname, 'demos');
config[1].output.publicPath = '/dist/';
delete config[1].externals;
delete config[1].module.rules[1].loader;

// Add plugins
config[1].plugins = [
  new webpack.HotModuleReplacementPlugin()
];

// Create express application and attach middleware
var app = express();
var compiler = webpack(config[1]);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config[1].output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// Setup main route
app.get('/', function(req, res) {
  var body = fs
    .readFileSync(path.join(__dirname, 'demos/index.html'), 'utf8')
    .replace(
      '${SCRIPTS}',
      '<script src="/dist/bundle.js"></script><script src="/dist/demos.js"></script>'
    );
  res.set('content-type', 'text/html');
  res.send(body);
});

// Setup demo routes
app.get('/demos/:name', (req, res) => {
  var body = fs
    .readFileSync(path.join(__dirname, 'demos/index.html'), 'utf8')
    .replace(
      '${SCRIPTS}',
      '<script src="/dist/bundle.js"></script><script src="/dist/' + req.params.name + '.js"></script>'
    );
  res.set('content-type', 'text/html');
  res.send(body);
});

// Redirect unknown routes
app.get('*', function(req, res) {
  res.redirect('/');
});

// Start the server
app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
