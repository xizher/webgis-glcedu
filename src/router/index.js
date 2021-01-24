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
    path: '/urbanization',
    name: 'Urbanization',
    component: () => import('../views/urbanization/V$Urbanization.vue')
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
