// import webpack from 'webpack'
// import CompressionWebpackPlugin from 'compression-webpack-plugin'
// const productionGzipExtensions = ['js', 'css']

import vue from '@vitejs/plugin-vue'
// import babel from '@rollup/plugin-babel'

// import babel from '@rollup/plugin-babel'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  server: {
    port: 8080
  },
  // publicPath: './',
  // productionSourceMap: false,
  // assetsDir: 'static',
  // configureWebpack: {
  //   plugins: [
  //     new CompressionWebpackPlugin({
  //       algorithm: 'gzip',
  //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  //       threshold: 10240,
  //       minRatio: 0.8
  //     }),
  //     new webpack.optimize.LimitChunkCountPlugin({
  //       maxChunks: 5,
  //       minChunkSize: 100
  //     })
  //   ],
  // },
  plugins: [
    vue(),
    // babel(),
    // babel({
    //   // babelHelpers: 'bundled',
    //   plugins: [
    //     ['@babel/plugin-proposal-class-properties', { proposal: 'fsharp' }],
    //     ['@babel/plugin-proposal-private-methods', { proposal: 'fsharp' }],
    //   ]
    // })
  ],
}
