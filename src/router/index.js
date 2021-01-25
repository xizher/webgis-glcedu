import { createRouter, createMemoryHistory } from 'vue-router'
import { useMapHooks } from '../project/hooks/useWebMap'

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

router.beforeEach(({ path }) => {
  const { selectedTheme, themeList } = useMapHooks()
  if (path === '/') {
    selectedTheme.value = themeList['默认']
  } else if (path === '/natural-difference') {
    selectedTheme.value = themeList['自然地理环境的地域差异']
  } else if (path === '/urbanization') {
    selectedTheme.value = themeList['城市与城市化']
  }
})

export default router
