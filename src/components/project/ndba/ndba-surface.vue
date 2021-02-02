<template>
  <panel-box
    top="150px"
    left="50px"
  >
    <div
      class="ndba-surface"
    >
      <div
        id="chart-ndba-surface"
        class="chart-ndba-surface"
      />
    </div>
  </panel-box>
</template>

<script>
import {
  PanelBox
} from '../../app'
import 'echarts-gl'
export default {
  name: 'NdbaSurface',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    useSurface: {
      type: Function,
      default: () => () => null
    }
  },
  setup (props) {
    props.useSurface()
  }
}
</script>

<style lang="scss" scoped>

</style>
