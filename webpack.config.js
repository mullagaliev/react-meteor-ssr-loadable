const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');
const path = require('path');
const ReactLoadablePlugin  = require('react-loadable/webpack').ReactLoadablePlugin;

const clientConfig = {
  entry: './client/main.js',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/main.html',
      // filename: '/dist/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new ReactLoadablePlugin({
    //   filename: './dist/react-loadable.json',
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      name: 'manifest',
      maxSize: 1,
      cacheGroups: {
        vendors: false,
        default: false
      }
    }
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  externals: [
    meteorExternals()
  ],
  // output: {
  //   path: path.resolve(__dirname, '/dist'),
  //   publicPath: '/',
  //   filename: 'bundle.js'
  // },
  devServer: {
    // contentBase: './dist',
    hot: true
  }
};

const serverConfig = {
  entry: './server/main.js',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }]
  },
  target: 'node',
  plugins: [
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
  ],
  externals: [
    meteorExternals()
  ]
};

module.exports = [clientConfig, serverConfig];
