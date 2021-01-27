// import { onMounted, onUnmounted } from 'vue'
import { useWebMap } from './useWebMap'

import { esri } from '../../wxz/src/gis/esri'
import { computed, onUnmounted, reactive, toRefs, watch } from 'vue'
import { usePixelData } from '../../wxz/src/gis/esri/esri-hooks/esri-hooks'

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

/**
 * @returns { [(type: 'glc' | 'dem') => __esri.ImageryLayer, import('vue').ComputedRef<boolean>, (type: 'glc' | 'dem') => __esri.PixelData] }
 */
export function useNaturalDifferenceByAltitude () {
  const webMap = useWebMap()
  const layerDEM = webMap.layerOperation.findLayerByName('乞力马扎罗数字高程模型.tiff')
  const layerGLC = webMap.layerOperation.findLayerByName('乞力马扎罗地表覆盖.tiff')


  layerDEM.pixelFilter = pixelData => {
    if (pixelData === null || pixelData.pixelBlock === null || pixelData.pixelBlock.pixels === null) {
      return
    }
    pixelData.pixelBlock.mask = []
    const { pixels, height, width, mask } = pixelData.pixelBlock
    const pixelCount = height * width
    for (let i = 0; i < pixelCount; i++) {
      if (pixels[0][i] === 0) {
        mask[i] = 0
      } else {
        mask[i] = 1
      }
    }
  }

  const [loadedDEM, getPixelDataDEM] = usePixelData(layerDEM)
  const [loadedGLC, getPixelDataGLC] = usePixelData(layerGLC)
  const loaded = computed(() => loadedDEM.value && loadedGLC.value)
  watch(loaded, val => {
    if (val) {
      layerDEM.visible = false
      layerGLC.visible = false
    }
  })
  const getPixelData = type => {
    const _type = type.toLowerCase()
    if (_type === 'dem') {
      return getPixelDataDEM()
    } else if (_type === 'glc') {
      return getPixelDataGLC()
    }
    return null
  }
  const getLayer = type => {
    const _type = type.toLowerCase()
    if (_type === 'dem') {
      return layerDEM
    } else if (_type === 'glc') {
      return layerGLC
    }
    return null
  }

  return [getLayer, loaded, getPixelData]
}

/**
 * @returns { [__esri.ImageryLayer, import('vue').Ref<boolean>, () => __esri.PixelData] }
 */
export function useNaturalDifferenceByLongitude () {
  const { layerOperation } = useWebMap()
  const layer = layerOperation.findLayerByName('经度地带性分异规律.tiff')
  const [loaded, getPixelData] = usePixelData(layer)
  watch(loaded, val => {
    if (val) {
      layer.visible = false
    }
  })
  return [layer, loaded, getPixelData]
}
