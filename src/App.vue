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
      <!-- 路由转场动画  -->
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useWebMap, useCreateWebMap } from './project/hooks/useWebMap'
export default {
  name: 'App',
  setup () {
    useCreateWebMap('webmap-container')
    const webMap = useWebMap()
    window.webMap = webMap // 方便控制类调试用的

    const loaded = ref(false)
    webMap.on('loaded', () => loaded.value = true)

    return {
      loaded
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
