<template>
  <div
    id="view-container"
    style="height: 100vh; width: 100vw"
  />
</template>

<script>
import { onMounted } from 'vue'
import appConfig from './config/app.config'
import { WebMap } from './wxz/src/gis/esri'
export default {
  name: 'App',
  setup () {
    const webMap = new WebMap('view-container', appConfig.webMapOptions)
    onMounted(() => {
      webMap.load()
    })
    window.webMap = webMap // 方便控制类调试用的

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
