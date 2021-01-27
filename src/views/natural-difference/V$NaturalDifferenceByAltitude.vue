<template>
  <div class="vue-view-natural-difference-altitude">
    <BackToWelcomeView />
    <TopicHeaderPanel
      title="自然地理环境的地域差异"
      sub-title="垂直地带性分异规律"
    />
    <NdbaSurface
      v-if="loaded"
      :pixel-data-d-e-m="getPixelData('DEM')"
      :pixel-data-g-l-c="getPixelData('GLC')"
      :layer="getLayer('GLC')"
    />
    <NdbaProfile
      v-if="loaded"
      :pixel-data-d-e-m="getPixelData('DEM')"
      :pixel-data-g-l-c="getPixelData('GLC')"
    />
  </div>
</template>

<script>
import { watch } from 'vue'
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '../../components/app'
import {
  NdbaSurface,
  NdbaProfile,
} from '../../components/project'
import { useNaturalDifferenceByAltitude } from '../../project/hooks/useTopic'
export default {
  name: 'NaturalDifferenceByAltitude',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
    NdbaSurface,
    NdbaProfile,
  },
  setup () {
    const [getLayer, loaded, getPixelData] = useNaturalDifferenceByAltitude()
    watch(loaded, val => {
      if (val) {
        // console.log(getPixelData('glc'))
      }
    })

    return {
      loaded,
      getPixelData,
      getLayer,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
