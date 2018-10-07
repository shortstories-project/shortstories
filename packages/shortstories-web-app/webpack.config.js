const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: [
    'modern-normalize',
    'bulma/css/bulma.css',
    '@babel/polyfill',
    './src/index.tsx',
  ],
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
      /* Fix error: Can't reexport the namespace object from non EcmaScript module (only default export is available) */
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { browsers: 'last 2 version' },
                  useBuiltIns: 'entry',
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'react-hot-loader/babel',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  devServer: {
    stats: 'errors-only',
    open: true,
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/img': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Shortstories',
      inject: true,
      hash: true,
      template: path.join(__dirname, 'public', 'index.ejs'),
    }),
    new FaviconsWebpackPlugin(path.join(__dirname, 'public', 'favicon.ico')),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src', 'assets'),
        to: path.join(__dirname, 'dist', 'assets'),
      },
    ]),
    new webpack.NamedModulesPlugin(),
  ],
}
