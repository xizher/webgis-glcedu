<template>
  <div class="vue-view-urbanization-statistics">
    <BackToWelcomeView />
    <TopicHeaderPanel title="长三角地区城市与城市化" />
    <UrbanizationStatLayerManager :layers="layers" />
    <UrbanizationStatOperation
      v-if="loaded"
      :use-operation="useOperation"
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
import { useUrbanizationStatistics } from '../../project/hooks/topic/useUrbanization'
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

    return useUrbanizationStatistics()
  }
}
</script>

<style lang="scss" scoped>

</style>
