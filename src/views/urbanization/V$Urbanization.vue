<template>
  <div class="vue-view-urbanization">
    <BackToWelcomeView />
    <ThemeHeaderPanel title="长三角地区城市与城市化" />
    <div class="subtheme-urbanization-selector">
      <div
        v-for="item in items"
        :key="item.name"
        class="subtheme-urbanization-item"
        :class="`subtheme-urbanization-${item.name}`"
        @click="goto(`/urbanization-${item.name}`)"
      >
        <div class="title">
          {{ item.alias }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { } from 'vue'
import {
  BackToWelcomeView,
  ThemeHeaderPanel,
} from '../../components/app'
import { useRouter } from 'vue-router'
export default {
  name: 'Urbanization',
  components: {
    BackToWelcomeView,
    ThemeHeaderPanel,
  },
  setup () {
    const items = [
      { name: 'statistics', alias: '统计分析' },
      { name: 'swipe', alias: '滑动交互' },
      { name: 'split-screen', alias: '地图分屏' },
    ]

    const router = useRouter()
    const goto = path => {
      router.push(path)
    }

    return {
      items,
      goto,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
