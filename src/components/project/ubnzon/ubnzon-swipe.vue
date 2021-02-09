<template>
  <panel-box
    bottom="16px"
    right="120px"
  >
    <div
      class="ubnzon-swipe"
    >
      <div class="left-layer-selector">
        左视图年份：
        <a-button
          v-for="(item, index) in layerList"
          :key="item.key"
          :type="index === leftSelectedIndex ? 'primary' : 'default'"
          :disabled="index === rightSelectedIndex"
          size="large"
          @click="leftSelectedIndex = index"
        >
          {{ index === leftSelectedIndex ? '✔' : '' }}
          {{ item.alias }}
        </a-button>
      </div>
      <div class="right-layer-selector">
        右视图年份：
        <a-button
          v-for="(item, index) in layerList"
          :key="item.key"
          :type="index === rightSelectedIndex ? 'primary' : 'default'"
          :disabled="index === leftSelectedIndex"
          size="large"
          @click="rightSelectedIndex = index"
        >
          {{ index === rightSelectedIndex ? '✔' : '' }}
          {{ item.alias }}
        </a-button>
      </div>
    </div>
  </panel-box>
  <div
    :style="style"
    class="ubnzon-swipe-label-panel"
  >
    <div class="ubnzon-swipe-label-panel-item">
      {{ layerList[leftSelectedIndex].alias }}
    </div>
    <div class="ubnzon-swipe-label-panel-item">
      {{ layerList[rightSelectedIndex].alias }}
    </div>
  </div>
</template>

<script>
import {
  PanelBox
} from '../../app'
import { useUrbanizationSwipe } from '../../../project/hooks/topic/useUrbanization'
import { toRefs } from 'vue'
export default {
  name: 'UbnzonSwipe',
  components: {
    'panel-box': PanelBox,
  },
  setup () {
    const { layerList, state } = useUrbanizationSwipe()

    return {
      layerList, ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
