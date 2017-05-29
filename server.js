import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import config from './webpack.config';

const hotEntries = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client'
];

// Update config entry and output
config[1].entry = {
  bundle: [
    ...hotEntries,
    './src/main.js'
  ],
  demos: [
    ...hotEntries,
    './demos/index.js'
  ],
  demo1: [
    ...hotEntries,
    './demos/demo1/index.js'
  ],
  demo2: [
    ...hotEntries,
    './demos/demo2/index.js'
  ],
  demo3: [
    ...hotEntries,
    './demos/demo3/index.js'
  ],
  demo4: [
    ...hotEntries,
    './demos/demo4/index.js'
  ],
  demo5: [
    ...hotEntries,
    './demos/demo5/index.js'
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
const app = express();
const compiler = webpack(config[1]);
app.use(webpackMiddleware(compiler, {
  publicPath: config[1].output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}));
app.use(webpackHot(compiler));

// Setup main route
app.get('/', (req, res) => {
  const body = fs
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
  const body = fs
    .readFileSync(path.join(__dirname, 'demos/index.html'), 'utf8')
    .replace(
      '${SCRIPTS}',
      '<script src="/dist/bundle.js"></script><script src="/dist/' + req.params.name + '.js"></script>'
    );
  res.set('content-type', 'text/html');
  res.send(body);
});

// Redirect unknown routes
app.get('*', (req, res) => res.redirect('/'));

// Start the server
app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
