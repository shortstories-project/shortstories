const { resolve } = require('path')
const StatsPlugin = require("stats-webpack-plugin")

module.exports = {
  entry: {
    admin: './apps/admin/assets/javascripts/main.js'
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name]-[chunkhash].js'
  },

  plugins: [
    new StatsPlugin("webpack_manifest.json")
  ],
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

  devServer: {
    port: 3020,
    publicPath: '/'
  }
}
