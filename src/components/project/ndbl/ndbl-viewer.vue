<template>
  <panel-box
    bottom="50px"
    left="50px"
  >
    <div class="ndbl-viewer">
      <div class="label-box">
        <div
          v-for="(item, index) in Array.from({length:6}, (n, i) => minLongitude + (maxLongitude - minLongitude) / 6 * i)"
          :key="index"
          class="label-item"
        >
          {{ item.toFixed(2) }}°E
        </div>
      </div>
      <a-tooltip
        v-for="(item, index) in dataset"
        :key="index"
        placement="bottom"
      >
        <template #title>
          <span>{{ glc30Colormap[item[0]].name }}</span>
        </template>
        <div
          :style="{
            width: `${100 * item[1] / totalLength}%`,
            backgroundColor: glc30Colormap[item[0]].color,
            height: '100%'
          }"
        />
      </a-tooltip>
    </div>
  </panel-box>
</template>

<script>
import { computed } from 'vue'
import {
  PanelBox
} from '../../app'
import appConfig from '../../../config/app.config'
export default {
  name: 'NdblViewer',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    dataset: {
      type: Array,
      default: () => []
    },
    minLongitude: {
      type: Number,
      default: 0
    },
    maxLongitude: {
      type: Number,
      default: 0
    },
  },
  setup (props) {
    const totalLength = computed(() => {
      let len = 0
      props.dataset.forEach(([_, l]) => len += l) // eslint-disable-line
      return len
    })

    return {
      glc30Colormap: appConfig.glc30Colormap,
      totalLength,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
