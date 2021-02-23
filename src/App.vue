<template>
  <div class="app-container">
    <div class="header-title" />
    <div class="map-box">
      <div id="webmap-container" />
    </div>
    <div
      v-if="loaded"
      class="operation-container"
    >
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <MapTools v-if="loaded" />
  <LegendBox v-if="loaded" />
  <LoadingBox />
  <div
    id="hawkeye-container"
    class="hawkeye-container"
  />
</template>

<script>
import { useCreateWebMap } from '@/project/hooks/useWebMap'
import { MapTools, LegendBox, LoadingBox } from '@/components/app'
export default {
  name: 'App',
  components: {
    MapTools,
    LegendBox,
    LoadingBox,
  },
  setup () {
    const [loaded, webMap] = useCreateWebMap()
    window.webMap = webMap // 方便调试用的

    return {
      loaded
    }
  }
}
</script>

<style scoped>
.hawkeye-container {
  position: fixed;
  right: 8px;
  top: 8px;
  height: 200px;
  width: 400px;
}
</style>
