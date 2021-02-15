
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import babel from '@rollup/plugin-babel'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default defineConfig ({
  server: {
    port: 8080,
  },
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [
    vue(),
    // babel({
    //   // babelHelpers: 'bundled',
    //   plugins: [
    //     ['@babel/plugin-proposal-class-properties', { proposal: 'fsharp' }],
    //     ['@babel/plugin-proposal-private-methods', { proposal: 'fsharp' }],
    //   ]
    // })
  ],
})
