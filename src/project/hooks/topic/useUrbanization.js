import { computed, onMounted, onUnmounted, reactive, watchEffect } from 'vue'
import { esri } from '../../../wxz/gis/esri'
import { useWebMap, useLayersVisible } from '../useWebMap'

export default function () {
  const { layerOperation, view } = useWebMap()
  const layer = layerOperation.findLayerByName('长三角省级行政区划')
  view.goTo(layer.fullExtent)
}

export function useUrbanizationSplitSceen () {
  const { layerOperation, divId, map, view, esriUtils, mapElementDisplay } = useWebMap()
  const [layer2010] = useLayersVisible('长三角2010年地表覆盖.png32')
  const layer2000 = layerOperation.cloneLayer('长三角2000年地表覆盖.png32')
  const layer2020 = layerOperation.cloneLayer('长三角2020年地表覆盖.png32')

  onMounted(() => view.goTo(layer2010.fullExtent))

  const $ = document
  const mainViewContainer = $.getElementById(divId)
  const { parentElement } = mainViewContainer
  const leftContainer = $.createElement('div')
  const rightContainer = $.createElement('div')
  parentElement.insertBefore(leftContainer, mainViewContainer)
  parentElement.append(rightContainer)
  onUnmounted(() => {
    leftContainer.remove()
    rightContainer.remove()
  })

  const [leftMap, leftView] = createOtherView(leftContainer, layer2000)
  const [rightMap, rightView] = createOtherView(rightContainer, layer2020)
  onUnmounted(() => {
    leftMap.basemap = {} // 接触引用，防止destroy时连同主图的basemap一起销毁
    rightMap.basemap = {}
    leftMap.destroy()
    leftView.destroy()
    rightMap.destroy()
    rightView.destroy()
  })

  const handler = esriUtils.synchronizeViews([view, leftView, rightView])
  onUnmounted(() => handler.remove())

  function createOtherView (viewContainer, layer) {
    const basemap = map.basemap
    const otherMap = new esri.Map({ basemap })
    otherMap.add(layer)
    const otherView = new esri.views.MapView({
      container: viewContainer,
      map: otherMap,
      ui: { components: [] },
      constraints: { minZoom: 3 },
    })
    layer.visible = true
    otherView.extent = layer.fullExtent
    return [otherMap, otherView]
  }

  return usePixelInteractive()

  function usePixelInteractive () {
    // const [loaded, getPixelData2000, getPixelData2010, getPixelData2020] = usePixelData([
    //   '长三角2000年地表覆盖.tiff',
    //   '长三角2010年地表覆盖.tiff',
    //   '长三角2020年地表覆盖.tiff'
    // ])
    // watch(loaded, val => {
    //   if (!val) {
    //     return
    //   }
    setInteractiveHandler([leftView, view, rightView])
    // })

    /**
     * @param { [import('../../../wxz/gis/esri').$View, import('../../../wxz/gis/esri').$View, import('../../../wxz/gis/esri').$View] } views
     */
    function setInteractiveHandler (views) {
      const handlers = views.map(view => {
        return view.on('pointer-move', event => {
          const point = esriUtils.screenToMapPoint(event)
          const graphic = mapElementDisplay.parseGraphics(point, {
            style: 'cross',
            outline: { color: '#000000', width: 4 }
          })
          views.forEach(v => {
            v.graphics.removeAll()
            v.graphics.add(graphic)
          })
        })
      })
      onUnmounted(() => handlers.forEach(h => h.remove()))
      onUnmounted(() => views.forEach(v => v.graphics.removeAll()))
    }

    return {
      // loaded
    }
  }

}

export function useUrbanizationSwipe () {
  const { view } = useWebMap()
  const [layer2000, layer2010, layer2020] = useLayersVisible([
    '长三角2000年地表覆盖.png32',
    '长三角2010年地表覆盖.png32',
    '长三角2020年地表覆盖.png32'
  ])

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
