import { onMounted, ref } from 'vue'
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
    state.hooks.selectedTheme = ref(constants.themeList['默认'])
    return HooksRegister
  }
}

export function useCreateWebMap (divId) {
  state.webMap = new WebMap(divId, appConfig.webMapOptions)

  onMounted(() => {
    state.webMap.load()
    HooksRegister.initHooks()
  })
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
