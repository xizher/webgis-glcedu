<template>
  <div class="vue-view-natural-difference-altitude">
    <BackToWelcomeView />
    <ThemeHeaderPanel
      title="自然地理环境的地域差异"
      sub-title="垂直地带性分异规律"
    />
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  ThemeHeaderPanel,
} from '../../components/app'
export default {
  name: 'NaturalDifferenceByAltitude',
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
