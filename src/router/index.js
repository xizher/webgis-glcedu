import { createRouter, createMemoryHistory } from 'vue-router'
import { useWebMap } from '@/project/hooks/useWebMap'

/**
 * @type { import('vue-router').RouteRecordRaw[] }
 */
const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/V$Welcome.vue')
  }, {
    path: '/natural-difference',
    name: 'NaturalDifference',
    component: () => import('@/views/natural-difference/V$NaturalDifference.vue')
  }, {
    path: '/natural-difference-longitude',
    name: 'NaturalDifferenceByLongitude',
    component: () => import('@/views/natural-difference/V$NaturalDifferenceByLongitude.vue')
  }, {
    path: '/natural-difference-altitude',
    name: 'NaturalDifferenceByAltitude',
    component: () => import('@/views/natural-difference/V$NaturalDifferenceByAltitude.vue')
  }, {
    path: '/urbanization',
    name: 'Urbanization',
    component: () => import('@/views/urbanization/V$Urbanization.vue')
  }, {
    path: '/urbanization-statistics',
    name: 'UrbanizationStatistics',
    component: () => import('@/views/urbanization/V$UrbanizationStatistics.vue')
  }, {
    path: '/urbanization-swipe',
    name: 'UrbanizationSwipe',
    component: () => import('@/views/urbanization/V$UrbanizationSwipe.vue')
  }, {
    path: '/urbanization-split-screen',
    name: 'UrbanizationSplitScreen',
    component: () => import('@/views/urbanization/V$UrbanizationSplitScreen.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach(({ path }) => {
  const { mapTools, layerOperation } = useWebMap()
  const tool = mapTools.getTool('zoom-home')
  const lyrLongitude = layerOperation.findLayerByName('经度地带性分异规律.png32')
  const lyrAltitude = layerOperation.findLayerByName('乞力马扎罗地表覆盖.png32')
  const lyrUrbanization = layerOperation.findLayerByName('长三角市级行政区划')
  switch (path) {
  case '/':
    tool.setHomeExtent({ center: [118, 34], zoom: 3})
    break
  case '/natural-difference':
    tool.setHomeExtent({ center: [71, 20], zoom: 3})
    break
  case '/natural-difference-longitude':
    tool.setHomeExtent(lyrLongitude.fullExtent)
    break
  case '/natural-difference-altitude':
    tool.setHomeExtent(lyrAltitude.fullExtent)
    break
  case '/urbanization':
  case '/urbanization-statistics':
  case '/urbanization-swipe':
  case '/urbanization-split-screen':
    tool.setHomeExtent(lyrUrbanization.fullExtent)
    break
  default:
    break
  }
  mapTools.setMapTool('zoom-home')
})

export default router
