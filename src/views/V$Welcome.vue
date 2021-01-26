<template>
  <div class="vue-view-welcome">
    <div class="signalizer">
      <div class="title">
        主题
      </div>
      <div class="arraw" />
      <div class="item">
        <div class="name">
          自然地理环境的地域差异
        </div>
        <div class="name">
          城市与城市化
        </div>
      </div>
    </div>
    <div class="topic-selector pointer-event-auto">
      <div
        v-for="item in items"
        :key="item"
        :class="`to-${item}`"
        @click="goto(`/${item}`)"
      />
    </div>
  </div>
</template>

<script>
import { } from 'vue'
import { useRouter } from 'vue-router'
import { useWelcome } from '../project/hooks/useTopic'
export default {
  name: 'Welcome',
  setup () {
    const router = useRouter()
    const items = ['natural-difference', 'urbanization']
    useWelcome()

    const goto = (path) => {
      router.push(path)
    }

    return {
      goto, items
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
