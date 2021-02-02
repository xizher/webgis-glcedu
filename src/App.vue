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
</template>

<script>
import { useCreateWebMap } from './project/hooks/useWebMap'
export default {
  name: 'App',
  setup () {
    const [loaded, webMap] = useCreateWebMap()
    window.webMap = webMap // 方便调试用的

    return {
      loaded
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
