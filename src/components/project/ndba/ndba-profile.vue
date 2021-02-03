<template>
  <panel-box
    v-for="(item, index) in chartList"
    :key="item.id"
    bottom="20px"
    left="50px"
    @mouseover="onTouchChart(index)"
    @mouseleave="onUntouchChart"
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
        :id="item.id"
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
import {
  PanelBox
} from '../../app'
export default {
  name: 'Profile',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    useProfile: {
      type: Function,
      default: () => () => null
    }
  },
  setup (props) {

    return {
      ...props.useProfile(),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
