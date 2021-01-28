import webpack from 'webpack'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
const productionGzipExtensions = ['js', 'css']

// import babel from '@rollup/plugin-babel'

export default {
  port: 8080,
  publicPath: './',
  productionSourceMap: false,
  assetsDir: 'static',
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ],
  },
  // plugins: [
  //   babel()
  // ]
}
