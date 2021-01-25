<template>
  <div class="vue-view-natural-difference">
    <BackToWelcomeView />
    <ThemeHeaderPanel title="自然地理环境的地域差异" />
    <div
      class="subtheme-natural-difference-grassland pointer-event-auto"
      :style="styleDiffByLon"
      @click="goto('/natural-difference-longitude')"
    >
      <div class="title">
        经度地带性分异规律
      </div>
    </div>
    <div
      class="subtheme-natural-difference-kilimanjaro pointer-event-auto"
      :style="styleDiffByAlt"
      @click="goto('/natural-difference-altitude')"
    >
      <div class="title">
        垂直地带性分异规律
      </div>
    </div>
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  ThemeHeaderPanel,
} from '../../components/app'
import { useNaturalDifference } from '../../project/hooks/useTheme'
import { useRouter } from 'vue-router'
export default {
  name: 'NaturalDifference',
  components: {
    BackToWelcomeView,
    ThemeHeaderPanel,
  },
  setup () {
    const { styleDiffByLon, styleDiffByAlt } = useNaturalDifference()
    const router = useRouter()
    const goto = path => {
      router.push(path)
    }
    return {
      styleDiffByLon,
      styleDiffByAlt,
      goto,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
