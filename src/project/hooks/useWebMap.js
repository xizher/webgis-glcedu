import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  WebMap,
  EsriUtils,
  esriExt,
  esriHooks,
  Basemap,
  LayerOperation,
  MapCursor,
  MapElementDisplay,
  MapTools,
  esri,
  Highlight,
} from '@/wxz/gis/esri'
import appConfig from '@/config/app.config'
import { useLoading } from './useLoading'

/**
 * 状态
 */
const state = {
  /**
   * WebGIS应用程式
   * @type { WebMap }
   */
  webMap: null
}

/**
 * 初始化钩子
 */
export function useCreateWebMap () {
  esri.config.request.timeout = 600000
  const [, setLoading] = useLoading(true)
  const loaded = ref(false)
  const webMap = new WebMap('webmap-container', appConfig.webMapOptions)
  webMap.on('mounted', () => loaded.value = true)
  onMounted(() => {
    state.webMap = webMap
      .use(EsriUtils)
      .use(esriExt)
      .use(esriHooks)
      .use(new Basemap(appConfig.basemapOptions))
      .use(new LayerOperation(appConfig.layerOperationOptions))
      .use(new MapCursor())
      .use(new MapElementDisplay())
      .use(new MapTools())
      .use(new Highlight())
      .mount()
    setLoading(false)
  })
  return [loaded, webMap]
}

/**
 * WebGIS应用程式钩子
 */
export function useWebMap () {
  return state.webMap
}

/**
 * 设置图层可见钩子
 * @param { string | string[] } names 图层名
 */
export function useLayersVisible (names) {
  const { layerOperation } = state.webMap
  const layerNames = Array.isArray(names) ? names : [names]
  const layers = layerNames.map(n => {
    const lyr = layerOperation.findLayerByName(n)
    lyr.visible = true
    return lyr
  })
  onUnmounted(() => layers.forEach(lyr => lyr.visible = false))
  return layers
}

/**
 * 创建读取栅格DN值数据钩子
 * @param { string | string[] } names 图层名
 * @returns { [import('vue').Ref<boolean>, ...Array<() => __esri.PixelData>] }
 */
export function usePixelData (names) {
  const [, setLoading] = useLoading(true)
  const { layerOperation, esriHooks } = useWebMap()
  const layerNames = Array.isArray(names) ? names : [names]
  const { glc30Colormap } = appConfig
  const layers = layerNames.map(n => {
    const lyr = layerOperation.findLayerByName(n)
    lyr.visible = true
    lyr.renderer = {
      type: 'unique-value',
      field: 'Value',
      defaultSymbol: { type: 'simple-fill' },
      uniqueValueInfos: Object.keys(glc30Colormap).map(value => ({
        value,
        symbol: {
          type: 'simple-fill',
          color: glc30Colormap[value].color
        }
      }))
    }
    return lyr
  })
  const pixelDatas = layers.map(lyr => esriHooks.usePixelData(lyr))
  const loaded = computed(() => {
    for (let i = 0; i < pixelDatas.length; i++) {
      if (!pixelDatas[i][0].value) {
        return false
      }
    }
    return true
  })
  watch(loaded, val => {
    if (val) {
      setLoading(false)
      layers.forEach(lyr => lyr.visible = false)
    }
  })
  return [loaded, ...pixelDatas.map(([, getPixelData]) => getPixelData)]
}

/**
 * 创建自定义工具
 * @param { string } toolKey 工具名
 * @param { import('@/wxz/gis/esri/map-tools/base-tool/base-tool').BaseTool } toolObject 工具对象
 */
export function useCustomTool (toolKey, toolObject) {
  const { mapTools } = state.webMap
  if (!mapTools.hasTool(toolKey)) {
    mapTools.createCustomTool(toolKey, toolObject)
  }
  onUnmounted(() => {
    toolObject.clearDrawed()
    mapTools.deleteTool(toolKey)
    mapTools.setMapTool('')
  })
  return [
    () => mapTools.setMapTool(toolKey),
    () => mapTools.setMapTool(''),
  ]
}

