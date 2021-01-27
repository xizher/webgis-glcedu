<template>
  <panel-box
    v-for="(item, index) in chartList"
    :key="item.id"
    bottom="20px"
    left="50px"
  >
    <div
      class="ndba-profile"
    >
      <a-button
        type="primary"
        shape="circle"
        class="btn-close"
        @click="removeChart(index)"
      >
        ✘
      </a-button>
      <div
        :id="`chart-ndba-profile-${item.id}`"
        class="chart-ndba-profile"
      />
    </div>
  </panel-box>
  <a-button
    :type="drawState ? 'primary' : 'default'"
    class="draw-profile-tool-switch pointer-event-auto"
    size="large"
    @click="drawState = !drawState"
  >
    {{ drawState ? '关闭' : '开启' }}绘制剖面线
  </a-button>
</template>

<script>
import { onUnmounted, reactive, ref, watch, toRaw } from 'vue'
import {
  PanelBox
} from '../../app'
import { useWebMap } from '../../../project/hooks/useWebMap'
import { NdbaProfileTool } from './ndba-profile-tool'
import { $ext } from '../../../wxz/src/js-ext'
export default {
  name: 'Profile',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    pixelDataDEM: {
      type: Object,
      default: () => ({})
    },
    pixelDataGLC: {
      type: Object,
      default: () => ({})
    },
  },
  setup (props) {
    const { mapTools, map, view, mapElementDisplay } = useWebMap()
    const chartList = reactive([])
    const drawState = ref(false)
    const { pixelDataDEM, pixelDataGLC } = props // eslint-disable-line
    const ndbaProfileTool = new NdbaProfileTool(map, view, pixelDataDEM, pixelDataGLC, chartList, drawState)
    if (!mapTools.hasTool('ndba-profile-tool')) {
      mapTools.createCustomTool('ndba-profile-tool', ndbaProfileTool)
    }

    watch(drawState, val => {
      if (val) {
        mapTools.setMapTool('ndba-profile-tool')
      } else {
        mapTools.setMapTool('')
      }
    })

    onUnmounted(() => {
      mapTools.setMapTool('')
      mapElementDisplay.clear()
    })

    const removeChart = index => {
      mapElementDisplay.removeGraphics(toRaw(chartList[index].graphics))
      $ext(chartList).remove(index)
    }

    return {
      chartList,
      drawState,
      removeChart,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
