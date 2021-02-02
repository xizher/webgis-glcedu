import { createRouter, createMemoryHistory } from 'vue-router'

/**
 * @type { import('vue-router').RouteRecordRaw[] }
 */
const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/V$Welcome.vue')
  }, {
    path: '/natural-difference',
    name: 'NaturalDifference',
    component: () => import('../views/natural-difference/V$NaturalDifference.vue')
  }, {
    path: '/natural-difference-longitude',
    name: 'NaturalDifferenceByLongitude',
    component: () => import('../views/natural-difference/V$NaturalDifferenceByLongitude.vue')
  }, {
    path: '/natural-difference-altitude',
    name: 'NaturalDifferenceByAltitude',
    component: () => import('../views/natural-difference/V$NaturalDifferenceByAltitude.vue')
  }, {
    path: '/urbanization',
    name: 'Urbanization',
    component: () => import('../views/urbanization/V$Urbanization.vue')
  }, {
    path: '/urbanization-statistics',
    name: 'UrbanizationStatistics',
    component: () => import('../views/urbanization/V$UrbanizationStatistics.vue')
  }, {
    path: '/urbanization-swipe',
    name: 'UrbanizationSwipe',
    component: () => import('../views/urbanization/V$UrbanizationSwipe.vue')
  }, {
    path: '/urbanization-split-screen',
    name: 'UrbanizationSplitScreen',
    component: () => import('../views/urbanization/V$UrbanizationSplitScreen.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

// router.beforeEach(({ path }) => {
//   const { selectedTopic, topicList } = useMapHooks()
//   if (path === '/') {
//     selectedTopic.value = topicList['默认']
//   } else if (path === '/natural-difference') {
//     selectedTopic.value = topicList['自然地理环境的地域差异']
//   } else if (path === '/natural-difference-longitude') {
//     selectedTopic.value = topicList['经度地带性分异规律']
//   } else if (path === '/natural-difference-altitude') {
//     selectedTopic.value = topicList['垂直地带性分异规律']
//   } else if (path === '/urbanization') {
//     selectedTopic.value = topicList['城市与城市化']
//   } else if (path === '/urbanization-statistics') {
//     selectedTopic.value = topicList['城市与城市化之统计分析']
//   } else if (path === '/urbanization-swipe') {
//     selectedTopic.value = topicList['城市与城市化之滑动可视化']
//   } else if (path === '/urbanization-split-screen') {
//     selectedTopic.value = topicList['城市与城市化之分屏可视化']
//   }
// })

export default router
