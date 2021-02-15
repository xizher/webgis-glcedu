import { computed, onUnmounted, reactive, ref, toRaw, toRefs, watch } from 'vue'
import { useLayersVisible, usePixelData, useWebMap, useCustomTool } from '../useWebMap'
import appConfig from '@/config/app.config'
import { useECharts } from '@/wxz/echarts-helper/echarts-hooks'
import { NdbaProfileTool } from '../../tools/ndba-profile-tool'
import { $ext } from '@/wxz/js-ext'

export function useNaturalDifferenceByLongitude () {
  const { esriExt, view, esriUtils } = useWebMap()
  const [layer] = useLayersVisible('经度地带性分异规律.png32')
  view.goTo(layer.fullExtent)
  const [loaded, getPixelData] = usePixelData('经度地带性分异规律.tiff')
  const { minLonLat, maxLonLat, latitude } = useLonlat(layer)

  const dataset = computed(() => {
    if (!loaded.value) {
      return []
    }
    const pixelMatrix = esriUtils.createPixelMatrix(getPixelData())
    const startXY = esriUtils.lonLatToXY([minLonLat[0], latitude.value])
    const endtXY = esriUtils.lonLatToXY([maxLonLat[0], latitude.value])
    const pixels = pixelMatrix.getValueByGeoLine({ x: startXY[0], y: startXY[1] }, { x: endtXY[0], y: endtXY[1] })
    let temp = pixels[0]
    if (typeof temp === 'undefined') {
      return []
    }
    const tempArr = []
    let count = 0
    pixels.forEach((val, index) => {
      if (val === temp) {
        count++
        if (index === pixels.length - 1) {
          if (temp !== 0 && count >= 10) {
            tempArr.push([temp, count])
          }
        }
      } else {
        if (temp !== 0 && count >= 10) {
          tempArr.push([temp, count])
        }
        temp = val
        count = 1
      }
    })
    const result = []
    tempArr.forEach(val => {
      if (result.length > 0 && result[result.length - 1][0] === val[0]) {
        result[result.length - 1][1] += val[1]
      } else {
        result.push(val)
      }
    })
    return result
  })

  return {
    dataset, loaded, minLonLat, maxLonLat, latitude
  }

  /**
   * @param { __esri.Layer } layer
   */
  function useLonlat (layer) {
    const extentExt = esriExt(layer.fullExtent)
    const minLonLat = extentExt.getMinLonLat()
    const maxLonLat = extentExt.getMaxLonLat()
    const latitude = ref(0)
    return { minLonLat, maxLonLat, latitude }
  }
}

/**
 * @returns { [__esri.Layer, import('vue').Ref<boolean>, ...Array<() => __esri.PixelData>] }
 */
export function useNaturalDifferenceByAltitude () {
  const { map, view, esriUtils, esriExt, mapElementDisplay, highlight } = useWebMap()
  const [layer] = useLayersVisible('乞力马扎罗地表覆盖.png32')
  view.goTo(layer.fullExtent)
  const [loaded, getPixelDataDEM, getPixelDataGLC] = usePixelData([
    '乞力马扎罗数字高程模型.tiff',
    '乞力马扎罗地表覆盖.tiff',
  ])
  return { loaded, useSurface, useProfile }

  function useSurface () {
    const { glc30Colormap } = appConfig
    const pixelDataDEM = getPixelDataDEM()
    const pixelMatrixDEM = esriUtils.createPixelMatrix(pixelDataDEM)
    let startHeight = null, startWidth = null, endHeight = null, endWidth = null
    for (let i = 0; i < pixelMatrixDEM.rowCount; i++) {
      for (let j = 0; j < pixelMatrixDEM.colCount; j++) {
        if (pixelMatrixDEM.getValue([i, j]) !== 0) {
          if (startHeight === null) {
            startHeight = i
            startWidth = j
          }
          break
        }
      }
      if (startWidth !== null) {
        break
      }
    }
    for (let i = pixelMatrixDEM.rowCount - 1; i >= 0; i--) {
      for (let j = pixelMatrixDEM.colCount - 1; j >= 0; j--) {
        if (pixelMatrixDEM.getValue([i, j]) !== 0) {
          if (endHeight === null) {
            endHeight = i
            endWidth = j
          }
          break
        }
      }
      if (endHeight !== null) {
        break
      }
    }

    const pixelDataGLC = getPixelDataGLC()
    const pixelMatrixGLC = esriUtils.createPixelMatrix(pixelDataGLC)
    const arr = []
    const arrGlc = []
    for (let i = startHeight; i <= endHeight; i++) {
      const tempArr = []
      const tempArrGlc = []
      for (let j = startWidth; j <= endWidth; j++) {
        tempArr.push(pixelMatrixDEM.getValue([i, j]))
        tempArrGlc.push(pixelMatrixGLC.getValue([i, j]))
      }
      arr.push(tempArr)
      arrGlc.push(tempArrGlc)
    }

    const extentExt = esriExt(layer.fullExtent)
    const [minLongitude, minLatitude] = extentExt.getMinLonLat()
    const [maxLongitude, maxLatitude] = extentExt.getMaxLonLat()

    const echartsOptions = {
      tooltip: {},
      xAxis3D: { type: 'value', name: '经度 (°E)',
        axisLabel: {
          formatter: val => (val * (maxLongitude - minLongitude) / pixelMatrixDEM.colCount + minLongitude).toFixed(2)
        }
      },
      yAxis3D: { type: 'value', name: '纬度 (°S)',
        axisLabel: {
          formatter: val => Math.abs(val * (maxLatitude - minLatitude) / pixelMatrixDEM.rowCount + minLatitude).toFixed(2)
        }
      },
      zAxis3D: { type: 'value', name: '海拔 (m)' },
      grid3D: { bottom: 55, boxHeight: 65, boxWidth: 150, boxDepth : 150, viewControl: {}, light: { main: { alpha: 90, beta: 90, intensity : .5 } } },
      series: [{ type: 'surface', silent: true, wireframe: { show: false },
        shading: 'realistic',
        itemStyle: {
          color: params => {
            let i = params.dataIndex
            const val = arrGlc[arr.length - 1 - Math.floor(i / arr[0].length)][i % arr[0].length]
            return glc30Colormap[val]?.color ?? '#ffffff'
          }
        },
        equation: {
          x: { step: 1, min: 0, max: endWidth - startWidth, },
          y: { step: 1, min: 0, max: endHeight - startHeight, },
          z: (x, y) => {
            if (x < 0 || y < 0) {
              return '-'
            }
            return arr[endHeight - startHeight - y][x] || 0
          }
        }
      }]
    }

    useECharts('chart-ndba-surface', echartsOptions)
  }

  function useProfile () {
    const chartList = reactive([])
    const drawState = ref(false)
    const pixelDataDEM = getPixelDataDEM()
    const pixelDataGLC = getPixelDataGLC()
    const ndbaProfileTool = new NdbaProfileTool(map, view, {
      chartList, drawState, pixelDataGLC, pixelDataDEM
    })
    const [active, deactice] = useCustomTool('ndba-profile-tool', ndbaProfileTool)
    watch(drawState, state => {
      state ? active() : deactice()
    })

    const removeChart = index => {
      mapElementDisplay.removeGraphics(toRaw(chartList)[index].graphic)
      $ext(chartList).remove(index)
    }

    const onTouchChart = index => {
      const graphic = toRaw(chartList)[index].graphic
      highlight.setHighlight(mapElementDisplay.graphicsLayer, graphic)
    }

    const onUntouchChart = () => {
      highlight.clearHighlight()
    }
    return { drawState, chartList, removeChart, onTouchChart, onUntouchChart }
  }
}

export default function () {
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
  const { view, esriUtils } = useWebMap()
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
  function getSceenPoint (longitude, latitude) {
    const point = esriUtils.createPoint({ longitude, latitude })
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
