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
    new webpack.HotModuleReplacementPlugin()
  ],
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
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
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
