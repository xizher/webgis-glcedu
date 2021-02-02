<template>
  <panel-box
    bottom="50px"
    right="50px"
  >
    <div
      class="ndbl-slider"
      @mousewheel="mouseWheelEvent"
    >
      <a-slider
        v-model:value="latitude"
        vertical
        :min="minLatitude"
        :max="maxLatitude"
        :step="0.01"
        :included="false"
        :marks="marks"
        :tip-formatter="null"
      />
    </div>
  </panel-box>
</template>

<script>
import { watch, ref, onUnmounted } from 'vue'
import { useWebMap } from '../../../project/hooks/useWebMap'
import { esri } from '../../../wxz/gis/esri'
import {
  PanelBox
} from '../../app'
export default {
  name: 'NdblSlider',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    minLonLat: {
      type: Array,
      default: () => [0, 0]
    },
    maxLonLat: {
      type: Array,
      default: () => [0, 0]
    },
  },
  emits: [
    'change',
  ],
  setup (props, { emit }) {
    const { mapElementDisplay } = useWebMap()
    const [minLongitude, minLatitude] = props.minLonLat // eslint-disable-line
    const [maxLongitude, maxLatitude] = props.maxLonLat // eslint-disable-line

    const latitude = ref((minLatitude + maxLatitude) / 2)

    // 滑动条标记
    const marks = {}
    for (let i = 40; i <= 45; i++) {
      marks[i] = `${i}°N`
    }

    // 通过鼠标滚动修改滑动值
    const mouseWheelEvent = event => {
      const step = 0.1
      if (event.deltaY > 0) {
        latitude.value -= step
      } else if (event.deltaY < 0) {
        latitude.value += step
      }
      if (latitude.value > maxLatitude) {
        latitude.value = maxLatitude
      }
      if (latitude.value < minLatitude) {
        latitude.value = minLatitude
      }
    }

    // 监听滑动值，并绘制值所指的经线
    watch(latitude, val => {
      const line = new esri.geometry.Polyline({
        paths: [[minLongitude, val], [maxLongitude, val]]
      })
      const graphic = mapElementDisplay.parseGraphics(line, {
        color: [0, 0, 0, .65],
        width: '8px'
      })
      mapElementDisplay.setGraphics(graphic)
      emit('change', latitude.value)
    }, { immediate: true })

    onUnmounted(() => {
      mapElementDisplay.clear()
    })

    return {
      latitude,
      minLatitude,
      maxLatitude,
      marks,
      mouseWheelEvent,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
