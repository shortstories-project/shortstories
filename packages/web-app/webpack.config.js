const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: ['sanitize.css', './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      pages: path.join(__dirname, 'src', 'pages'),
      components: path.join(__dirname, 'src', 'components'),
      'higher-order-components': path.join(
        __dirname,
        'src',
        'higher-order-components'
      ),
      images: path.join(__dirname, 'src', 'assets', 'images'),
      fonts: path.join(__dirname, 'src', 'assets', 'fonts'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'src/assets/images/[name].[ext]',
          },
        },
      },
    ],
  },
  devServer: {
    stats: 'errors-only',
    hotOnly: true,
    open: true,
    overlay: true,
    progress: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Short Stories',
      inject: true,
      hash: true,
      template: path.join(__dirname, 'public', 'index.ejs'),
    }),
    new FaviconsWebpackPlugin(path.join(__dirname, 'public', 'favicon.ico')),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
