<template>
  <div class="vue-view-natural-difference-altitude">
    <BackToWelcomeView />
    <TopicHeaderPanel
      title="自然地理环境的地域差异"
      sub-title="垂直地带性分异规律"
    />
    <NdbaSurface
      v-if="loaded"
      :use-surface="useSurface"
    />
    <!-- <NdbaProfile
      v-if="loaded"
      :pixel-data-d-e-m="getPixelData('DEM')"
      :pixel-data-g-l-c="getPixelData('GLC')"
    /> -->
  </div>
</template>

<script>
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '../../components/app'
import {
  NdbaSurface,
  // NdbaProfile,
} from '../../components/project'
import { useNaturalDifferenceByAltitude } from '../../project/hooks/topic/useNaturalDifference'
export default {
  name: 'NaturalDifferenceByAltitude',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
    NdbaSurface,
    // NdbaProfile,
  },
  setup () {

    return useNaturalDifferenceByAltitude()
  }
}
</script>

<style lang="scss" scoped>

</style>
