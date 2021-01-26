<template>
  <div
    class="panel-box pointer-event-auto"
    :style="style"
  >
    <div
      class="drap-box"
      @mousemove="drapHandler"
      @mousedown="setDrap"
      @mouseup="draping = false"
      @mouseleave="draping = false"
    />
    <slot />
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'PanelBox',
  props: {
    left: {
      type: String,
      default: 'auto'
    },
    top: {
      type: String,
      default: 'auto'
    },
    bottom: {
      type: String,
      default: 'auto'
    },
    right: {
      type: String,
      default: 'auto'
    },
  },
  setup (props) {
    const draping = ref(false)
    let offsetX = 0, offsetY = 0
    /**
     * @param { MouseEvent } event
     */
    const setDrap = event => {
      offsetX = event.offsetX
      offsetY = event.offsetY
      draping.value = true
    }

    const style = reactive({
      left: props.left,
      top: props.top,
      bottom: props.bottom,
      right: props.right,
    })


    /**
     * @param { MouseEvent } event
     */
    const drapHandler = event => {
      if (draping.value) {
        const { clientX, clientY } = event
        style.left = `${clientX - offsetX}px`
        style.top = `${clientY - offsetY}px`
        style.bottom = 'auto'
        style.right = 'auto'
      }
    }

    return {
      style,
      drapHandler,
      draping,
      setDrap,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
