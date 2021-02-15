<template>
  <div class="map-tools">
    <div
      v-for="item in toolList"
      :key="item.key"
      class="item"
      :class="item.name"
      @click="clickHandler(item.key)"
    />
  </div>
</template>

<script>
import { } from 'vue'
import './map-tools.scss'
import { useWebMap } from '@/project/hooks/useWebMap'
export default {
  name: 'MapTools',
  setup () {
    const toolList = [
      { key: '', name: 'default' },
      { key: 'zoom-home', name: 'zoom-home' },
      { key: 'zoom-in', name: 'zoom-in' },
      { key: 'zoom-out', name: 'zoom-out' },
      { key: 'zoom-in-rect', name: 'zoom-in-rect' },
      { key: 'zoom-out-rect', name: 'zoom-out-rect' },
      { key: 'clear', name: 'clear' },
    ]

    const { mapTools } = useWebMap()
    const clickHandler = key => {
      mapTools.setMapTool(key)
    }

    return {
      toolList, clickHandler
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
