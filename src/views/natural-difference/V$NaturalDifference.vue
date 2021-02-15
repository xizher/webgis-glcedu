<template>
  <div class="vue-view-natural-difference">
    <BackToWelcomeView />
    <TopicHeaderPanel title="自然地理环境的地域差异" />
    <div
      class="sub-topic-natural-difference-grassland pointer-event-auto"
      :style="styleDiffByLon"
      @click="goto('/natural-difference-longitude')"
    >
      <div class="title">
        经度地带性分异规律
      </div>
    </div>
    <div
      class="sub-topic-natural-difference-kilimanjaro pointer-event-auto"
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
import {
  BackToWelcomeView,
  TopicHeaderPanel,
} from '@/components/app'
import useNaturalDifference from '@/project/hooks/topic/useNaturalDifference'
import { useRouter } from 'vue-router'
export default {
  name: 'NaturalDifference',
  components: {
    BackToWelcomeView,
    TopicHeaderPanel,
  },
  setup () {
    const router = useRouter()
    const goto = path => router.push(path)

    return {
      ...useNaturalDifference(),
      goto,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
