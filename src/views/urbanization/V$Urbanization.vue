<template>
  <div class="vue-view-urbanization">
    <BackToWelcomeView />
    <div class="subtheme-urbanization-selector">
      <div
        v-for="item in items"
        :key="item"
        class="subtheme-urbanization-item"
        :class="`subtheme-urbanization-${item}`"
      />
    </div>
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView
} from '../../components/app'
export default {
  name: 'Urbanization',
  components: {
    BackToWelcomeView
  },
  setup () {
    const items = [
      'statistics', 'swipe', 'split-screen'
    ]

    return {
      items
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
