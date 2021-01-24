<template>
  <div class="vue-view-natural-difference">
    <BackToWelcomeView />
    <ThemeHeaderPanel title="自然地理环境的地域差异" />
    <div
      class="subtheme-natural-difference-grassland pointer-event-auto"
      :style="styleDiffByLon"
    />
    <div
      class="subtheme-natural-difference-kilimanjaro pointer-event-auto"
      :style="styleDiffByAlt"
    />
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  ThemeHeaderPanel,
} from '../../components/app'
import { useNaturalDifference } from '../../project/hooks/useTheme'
export default {
  name: 'NaturalDifference',
  components: {
    BackToWelcomeView,
    ThemeHeaderPanel,
  },
  setup () {
    const { styleDiffByLon, styleDiffByAlt } = useNaturalDifference()

    return {
      styleDiffByLon,
      styleDiffByAlt,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
