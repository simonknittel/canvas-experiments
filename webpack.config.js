const path = require('path')
const webpack = require('webpack')


module.exports = {
  mode: 'development',
  entry: {
    global: './src/assets/scripts/global.bundle.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/assets/js'),
    publicPath: '/assets/js/',
  },
  resolve: {
    extensions: [ '.js', '.ts', '.tsx' ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_module/,
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
  node: false,
}
