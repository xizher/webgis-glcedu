<template>
  <div class="app-container">
    <div class="header-title" />
    <div class="map-box">
      <div id="webmap-container" />
    </div>
    <!-- <div
      v-if="loaded"
      class="operation-container"
    >
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
// import { useWebMap, useCreateWebMap } from './project/hooks/useWebMap'
import {
  WebMap,
  Basemap,
  LayerOperation,
  MapCursor,
  MapElementDisplay,
  EsriUtils,
  esriExt,
  MapTools
} from './wxz/gis/esri'
import appConfig from './config/app.config'
export default {
  name: 'App',
  setup () {

    onMounted(() => {
      const webMap = new WebMap('webmap-container', appConfig.webMapOptions)
        .use(EsriUtils)
        .use(esriExt)
        .use(new Basemap(appConfig.basemapOptions))
        .use(new LayerOperation(appConfig.layerOperationOptions))
        .use(new MapCursor())
        .use(new MapElementDisplay())
        .use(new MapTools())
        .mount()
      window.webMap = webMap // 方便控制类调试用的
    })

    // const loaded = ref(false)
    // webMap.on('loaded', () => loaded.value = true)

    // return {
    //   loaded
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
