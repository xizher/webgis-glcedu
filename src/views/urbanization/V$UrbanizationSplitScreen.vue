<template>
  <div class="vue-view-urbanization-split-screen">
    <BackToWelcomeView />
    <ThemeHeaderPanel title="长三角地区城市与城市化" />
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  ThemeHeaderPanel,
} from '../../components/app'
export default {
  name: 'UrbanizationSplitScreen',
  components: {
    BackToWelcomeView,
    ThemeHeaderPanel,
  },
  setup () {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
