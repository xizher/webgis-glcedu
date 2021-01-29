<template>
  <div class="vue-view-urbanization-statistics">
    <BackToWelcomeView />
    <TopicHeaderPanel title="长三角地区城市与城市化" />
    <UrbanizationStatLayerManager :layers="layers" />
    <UrbanizationStatOperation
      v-if="loaded"
      :year2000="getPixelData(2000)"
      :year2010="getPixelData(2010)"
      :year2020="getPixelData(2020)"
    />
    <UrbanizationStatChart />
  </div>
</template>

<script>
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '../../components/app'
import {
  UrbanizationStatLayerManager,
  UrbanizationStatOperation,
  UrbanizationStatChart,
} from '../../components/project'
import { useUrbanizationStatistics, useUrbanizationStatisticsLayers } from '../../project/hooks/useTopic'
export default {
  name: 'UrbanizationStatistics',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
    UrbanizationStatLayerManager,
    UrbanizationStatOperation,
    UrbanizationStatChart,
  },
  setup () {
    const [loaded, getPixelData] = useUrbanizationStatistics()
    const layers = useUrbanizationStatisticsLayers()

    return {
      layers,
      getPixelData,
      loaded,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
