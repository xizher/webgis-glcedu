import { createApp } from 'vue'
import App from './App.vue'

import { EsriModules } from './wxz/src/gis/esri/esri-modules/esri-modules'
console.log('ready')
EsriModules.load({
  url: 'http://localhost/arcgis/api/4.17/init.js',
  css: 'http://localhost/arcgis/api/4.17/esri/themes/light/main.css',
}).then(esri => {
  console.log(esri)
  createApp(App)
    .mount('#app')
})

