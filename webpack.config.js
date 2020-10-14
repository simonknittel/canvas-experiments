const path = require('path')

const config = {
  entry: {
    global: './src/assets/scripts/global.bundle.js',
  },
  output: {
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
  node: false,
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.mode = 'development'

    config.output.filename = '[name].bundle.js'

    config.optimization = {
      moduleIds: 'named'
    }

    config.devtool = 'source-map'
  } else if (argv.mode === 'production') {
    config.mode = 'production'

    config.output.filename = '[name].bundle.[chunkhash].js'
  }

  return config
}
