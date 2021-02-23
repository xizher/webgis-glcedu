
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
  optimizeDeps: {
    include: [
      'ol/Map',
      'ol/View',
      'ol/Feature',
      'ol/Collection',
      'ol/source/XYZ',
      'ol/source/OSM',
      'ol/source/Vector',
      'ol/layer/Tile',
      'ol/layer/Group',
      'ol/layer/Base',
      'ol/layer/Vector',
      'ol/geom/Geometry',
      'ol/geom/Point',
      'ol/format/GeoJSON',
      'ol/style',
      'ol/interaction/DragPan',
    ]
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
