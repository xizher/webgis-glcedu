<template>
  <div class="vue-view-natural-difference-altitude">
    <BackToWelcomeView />
    <TopicHeaderPanel
      title="自然地理环境的地域差异"
      sub-title="垂直地带性分异规律"
    />
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '../../components/app'
import { useNaturalDifferenceByAltitude } from '../../project/hooks/useTopic'
export default {
  name: 'NaturalDifferenceByAltitude',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
  },
  setup () {
    useNaturalDifferenceByAltitude()

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
