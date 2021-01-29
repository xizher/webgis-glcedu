<template>
  <panel-box
    top="100px"
    right="100px"
  >
    <div
      class="ubnzon-stat-layer-manager"
    >
      <div class="title">
        图层项：
      </div>
      <div
        v-for="(item, index) in items"
        :key="item.key"
        class="item"
      >
        {{ item.alias }}
        <div
          class="visible-ctrl"
          :class="item.visible ? 'visible-true' : 'visible-false'"
          @click="setVisible(index)"
        />
      </div>
    </div>
  </panel-box>
</template>

<script>
import { reactive } from 'vue'
import {
  PanelBox
} from '../../app'
export default {
  name: 'UbnzonStatLayerManager',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    layers: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const items = reactive([
      { key: 0, name: '长三角省级行政区划', alias: '省级行政区划', visible: true },
      { key: 1, name: '长三角市级行政区划', alias: '市级行政区划', visible: true },
      { key: 2, name: '长三角2020年地表覆盖.png32', alias: '2020年', visible: true },
      { key: 3, name: '长三角2010年地表覆盖.png32', alias: '2010年', visible: true },
      { key: 4, name: '长三角2000年地表覆盖.png32', alias: '2000年', visible: true },
    ])

    const setVisible = index => {
      const item = items[index]
      item.visible = !item.visible
      const layer = props.layers[item.name]
      layer.visible = item.visible
    }

    return {
      items,
      setVisible,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
