// import { onMounted, onUnmounted } from 'vue'
import { useWebMap } from './useWebMap'

import { esri, EsriUtils } from '../../wxz/src/gis/esri'
import { computed, onMounted, onUnmounted, reactive, toRefs, watch, watchEffect } from 'vue'
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


export function useUrbanization () {
  const webMap = useWebMap()
  webMap.zoomToLayer('长三角省级行政区划')
}

export function useUrbanizationSwipe () {
  const { layerOperation, view } = useWebMap()
  const layer2000 = layerOperation.findLayerByName('长三角2000年地表覆盖.png32')
  const layer2010 = layerOperation.findLayerByName('长三角2010年地表覆盖.png32')
  const layer2020 = layerOperation.findLayerByName('长三角2020年地表覆盖.png32')

  const layerList = [
    { key: 0, layer: layer2000, alias: '2000年' },
    { key: 1, layer: layer2010, alias: '2010年' },
    { key: 2, layer: layer2020, alias: '2020年' },
  ]

  const state = reactive({
    leftSelectedIndex: 0,
    rightSelectedIndex: 1,
    leftPosition: 50,
    style: computed(() => ({
      left: `${state.leftPosition}%`,
      bottom: '25px'
    }))
  })

  const swipe = new esri.widgets.Swipe({
    position: state.leftPosition,
    view,
  })
  const watchHandler = swipe.watch('position', position => {
    state.leftPosition = position
  })
  onUnmounted(() => {
    watchHandler.remove()
    view.ui.remove(swipe)
    swipe.destroy()
  })
  view.ui.add(swipe)

  watchEffect(() => {
    layerList.forEach(item => item.layer.visible = false)
    const leftLayer = layerList[state.leftSelectedIndex].layer
    const rightLayer = layerList[state.rightSelectedIndex].layer
    leftLayer.visible = true
    rightLayer.visible = true
    swipe.leadingLayers.removeAll()
    swipe.leadingLayers.add(leftLayer)
    swipe.trailingLayers.removeAll()
    swipe.trailingLayers.add(rightLayer)
  })


  return {
    layerList, state
  }
}

export function useUrbanizationSplitSceen () {
  const { layerOperation, divId, map, view } = useWebMap()
  const layer2000 = layerOperation.findLayerByName('长三角2000年地表覆盖.png32')
  const layer2010 = layerOperation.findLayerByName('长三角2010年地表覆盖.png32')
  const layer2020 = layerOperation.findLayerByName('长三角2020年地表覆盖.png32')
  layer2010.visible = true

  const dom = document
  const mainViewContainer = dom.getElementById(divId)
  const { parentElement } = mainViewContainer
  const leftContainer = dom.createElement('div')
  const rightContainer = dom.createElement('div')
  parentElement.insertBefore(leftContainer, mainViewContainer)
  parentElement.append(rightContainer)
  onUnmounted(() => {
    leftContainer.remove()
    rightContainer.remove()
  })

  const [leftMap, leftView] = createOtherView(leftContainer, layer2000)
  const [rightMap, rightView] = createOtherView(rightContainer, layer2020)
  onUnmounted(() => {
    map.add(layer2000)
    map.add(layer2020)
    leftMap.basemap = {} // 接触引用，防止destroy时连同主图的basemap一起销毁
    rightMap.basemap = {}
    leftMap.destroy()
    leftView.destroy()
    rightMap.destroy()
    rightView.destroy()
  })

  function createOtherView (viewContainer, layer) {
    layer.visible = true
    const basemap = map.basemap
    const otherMap = new esri.Map({ basemap })
    otherMap.add(layer)
    const otherView = new esri.views.MapView({
      container: viewContainer,
      map: otherMap,
      ui: { components: [] },
      constraints: { minZoom: 3 },
    })
    otherView.extent = layer.fullExtent
    return [otherMap, otherView]
  }

  const handler = EsriUtils.synchronizeViews([view, leftView, rightView])
  onUnmounted(() => handler.remove())

  onMounted(() => {
    view.goTo(layer2010.fullExtent)
  })

}
