<template>
  <div class="legend-box">
    <div
      class="title"
      @click="visible = !visible"
    >
      图例
    </div>
    <div
      v-for="item in legends"
      v-show="visible"
      :key="item.key"
      class="item"
    >
      <div
        class="color"
        :style="{ backgroundColor: item.color }"
      />
      <div class="text">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import './legend-box.scss'
import appConfig from '../../../config/app.config'
export default {
  name: 'LegendBox',
  setup () {

    const { glc30Colormap } = appConfig
    const legends = Object.values(glc30Colormap)

    const visible = ref(false)

    return {
      legends,
      visible,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
