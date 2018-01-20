const { resolve } = require('path')

module.exports = {
  entry: {
    admin: './apps/admin/assets/javascripts/main.js'
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
}

