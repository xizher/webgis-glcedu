import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import appConfig from './config/app.config'
import { EsriModules } from './wxz/src/gis/esri/esri-modules/esri-modules'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './styles/overwrite/overwrite-before.scss'
import './styles/layout/layout.scss'
import './styles/animation/animation.scss'
import './styles/overwrite/overwrite-after.scss'

EsriModules
  .load(appConfig.apiConfig.arcgisJsApiOptions)
  .then(() => {
    createApp(App)
      .use(router)
      .use(Antd)
      .mount('#app')
  })

