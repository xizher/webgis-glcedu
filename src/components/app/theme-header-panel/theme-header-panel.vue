<template>
  <div class="theme-header-panel pointer-event-auto">
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { } from 'vue'
export default {
  name: 'ThemeHeaderPanel',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
  setup () {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
