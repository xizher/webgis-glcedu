<template>
  <div class="vue-view-urbanization-swipe">
    <BackToWelcomeView />
    <TopicHeaderPanel title="长三角地区城市与城市化" />
    <UbnzonSwipe />
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '@/components/app'
import {
  UbnzonSwipe
} from '@/components/project'
export default {
  name: 'UrbanizationSwipe',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
    UbnzonSwipe,
  },
  setup () {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
