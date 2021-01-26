import { onMounted, ref, watch } from 'vue'
import appConfig from '../../config/app.config'
import { WebMap } from '../../wxz/src/gis/esri'

const constants = {
  themeList: {
    '默认': Symbol('默认'),
    '自然地理环境的地域差异': Symbol('自然地理环境的地域差异'),
    '经度地带性分异规律': Symbol('经度地带性分异规律'),
    '垂直地带性分异规律': Symbol('垂直地带性分异规律'),
    '城市与城市化': Symbol('城市与城市化'),
    '城市与城市化之统计分析': Symbol('城市与城市化之统计分析'),
    '城市与城市化之分屏可视化': Symbol('城市与城市化之分屏可视化'),
    '城市与城市化之滑动可视化': Symbol('城市与城市化之滑动可视化'),
  },
}

const state = {

  /**
   * @type { WebMap }
   */
  webMap: null,

  /**
   * @type { {
   *  selectedTheme: import('vue').Ref<Symbol>
   * } }
   */
  hooks: { }
}

class HooksRegister {
  static initHooks () {
    HooksRegister
      .initSelectedTheme()
  }

  static initSelectedTheme () {
    const { themeList } = constants
    const { webMap } = state
    state.hooks.selectedTheme = ref(themeList['默认'])
    watch(state.hooks.selectedTheme, val => {
      switch (val) {
      case themeList['默认']:
      case themeList['自然地理环境的地域差异']:
      case themeList['城市与城市化']:
        webMap.layerOperation.setAllLayersInvisible()
        break
      case themeList['垂直地带性分异规律']:
        webMap.layerOperation
          .setAllLayersInvisible()
          .setLayerVisible('乞力马扎罗数字高程模型.png32', true)
          .setLayerVisible('乞力马扎罗数字高程模型.tiff', true)
          .setLayerVisible('乞力马扎罗地表覆盖.png32', true)
          .setLayerVisibleAndZoomTo('乞力马扎罗地表覆盖.tiff')
        break
      case themeList['经度地带性分异规律']:
        webMap.layerOperation
          .setAllLayersInvisible()
          .setLayerVisible('经度地带性分异规律.png32', true)
          .setLayerVisibleAndZoomTo('经度地带性分异规律.tiff')
        break
      default:
        break
      }
    })
    return HooksRegister
  }
}

export function useCreateWebMap (divId) {
  state.webMap = new WebMap(divId, appConfig.webMapOptions)

  onMounted(() => {
    state.webMap.load()
    HooksRegister.initHooks()
    setGlc30Style('乞力马扎罗地表覆盖.tiff')('经度地带性分异规律.tiff')
  })

  function setGlc30Style (layerName) {
    const { glc30Colormap } = appConfig
    state.webMap.layerOperation.findLayerByName(layerName).renderer = {
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
    return setGlc30Style
  }
}

export function useWebMap () {
  return state.webMap
}

export function useMapHooks () {
  return {
    ...state.hooks,
    ...constants
  }
}
