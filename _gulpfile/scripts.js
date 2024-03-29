function webpack(mode, done) {
  const configFunc = require('../webpack.config')
  const config = configFunc(null, { mode: mode })

  const notifier = require('node-notifier')
  const webpack = require('webpack')
  const compiler = webpack(config)

  compiler.run((err, stats) => {
    if (err) {
      console.error(err)

      notifier.notify({
        title: 'scripts:dev - failed',
        message: 'View console for more details.',
        sound: true,
      })

      done()
    }

    const statsFormatted = stats.toString()
    if (stats.hasErrors()) console.error(statsFormatted.errors)
    if (stats.hasWarnings()) console.warn(statsFormatted.warnings)

    console.log(stats.toString({
      chunks: false,
      colors: true,
    }))

    done()
  })
}

exports.dev = function dev(done) {
  webpack('development', done)
}

exports.prod = function prod(done) {
  webpack('production', done)
}
