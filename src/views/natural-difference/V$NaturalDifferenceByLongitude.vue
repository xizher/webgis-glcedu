<template>
  <div class="vue-view-natural-difference-longitude">
    <BackToWelcomeView />
    <TopicHeaderPanel
      title="自然地理环境的地域差异"
      sub-title="经度地带性分异规律"
    />
    <NdblSlider
      :min-lon-lat="minLonLat"
      :max-lon-lat="maxLonLat"
      @change="val => latitude = val"
    />
    <NdblViewer
      v-if="loaded"
      :min-longitude="minLonLat[0]"
      :max-longitude="maxLonLat[0]"
      :dataset="dataset"
    />
  </div>
</template>

<script>
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '@/components/app'
import {
  NdblSlider,
  NdblViewer,
} from '@/components/project'
import { useNaturalDifferenceByLongitude } from '@/project/hooks/topic/useNaturalDifference'
export default {
  name: 'NaturalDifferenceByLongitude',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
    NdblSlider,
    NdblViewer,
  },
  setup () {
    return useNaturalDifferenceByLongitude()
  }
}
</script>

<style lang="scss" scoped>

</style>
