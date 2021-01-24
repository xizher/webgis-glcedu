// import { onMounted, onUnmounted } from 'vue'
import { useWebMap } from './useWebMap'

import { esri } from '../../wxz/src/gis/esri'
import { computed, onUnmounted, reactive, toRefs } from 'vue'

export function useWelcome () {
  // const { view } = useWebMap()
  // let handlerId = 0
  // onMounted(() => setAnimation ())
  // onUnmounted(() => clearAnimation())

  // const dragHandler = view.on('drag', ({ action }) => {
  //   if (action === 'start') {
  //     clearAnimation()
  //   } else if (action === 'end') {
  //     setAnimation()
  //   }
  // })
  // onUnmounted(() => dragHandler.remove())

  // function setAnimation () {
  //   handlerId = setInterval(() => {
  //     const { longitude, latitude } = view.center
  //     view.goTo({
  //       center: [longitude + .5, latitude]
  //     }, {
  //       duration: 200,
  //       easing: 'linear'
  //     })
  //   }, 5000)
  // }

  // function clearAnimation () {
  //   clearInterval(handlerId)
  // }
}

export function useNaturalDifference () {
  const state = reactive({
    diffByLon: {
      x: 0, y: 0
    },
    diffByAlt: {
      x: 0, y: 0
    },
    styleDiffByLon: computed(() => ({
      left: `${state.diffByLon.x - 100}px`,
      top: `${state.diffByLon.y - 50}px`,
    })),
    styleDiffByAlt: computed(() => ({
      left: `${state.diffByAlt.x - 100}px`,
      top: `${state.diffByAlt.y - 50}px`,
    })),
  })
  const { view } = useWebMap()
  view.goTo({ center: update(), zoom: 3 })
  const watchHandler = view.watch('extent', update)
  onUnmounted(() => watchHandler.remove())
  function updateDiffByLon () {
    const [x, y, point] = getSceenPoint (105, 43)
    state.diffByLon.x = x
    state.diffByLon.y = y
    return point
  }
  function updateDiffByAlt () {
    const [x, y, point] = getSceenPoint (37, -3)
    state.diffByAlt.x = x
    state.diffByAlt.y = y
    return point
  }
  function getSceenPoint (lon, lat) {
    const point = new esri.geometry.Point({
      longitude: lon, latitude: lat,
      spatialReference: view.spatialReference
    })
    const screenPoint = view.toScreen(point)
    return [screenPoint.x, screenPoint.y, point]
  }
  function update () {
    const pt1 = updateDiffByLon()
    const pt2 = updateDiffByAlt()
    return [
      (pt1.longitude + pt2.longitude) / 2,
      (pt1.latitude + pt2.latitude) / 2,
    ]
  }
  return toRefs(state)
}
