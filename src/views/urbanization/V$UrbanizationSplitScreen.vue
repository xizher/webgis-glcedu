<template>
  <div class="vue-view-urbanization-split-screen">
    <BackToWelcomeView />
    <TopicHeaderPanel title="长三角地区城市与城市化" />
    <UbnzonSplitScreen />
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '../../components/app'
import {
  UbnzonSplitScreen
} from '../../components/project'
export default {
  name: 'UrbanizationSplitScreen',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
    UbnzonSplitScreen,
  },
  setup () {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
