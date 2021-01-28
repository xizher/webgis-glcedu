import { DrawTool } from '../../../wxz/src/gis/esri/map-tools/operation-tools/draw-tool/draw-tool'
import appConfig from '../../../config/app.config'
import { EsriUtils } from '../../../wxz/src/gis/esri'
import echarts from 'echarts'

export class NdbaProfileTool extends DrawTool {

  constructor (map, view, pixelDataDEM, pixelDataGLC, chartList, drawState) {
    super(map, view, 'line-faster')

    /** @type { __esri.PixelData } */
    this.pixelDataDEM = pixelDataDEM
    /** @type { __esri.PixelData } */
    this.pixelDataGLC = pixelDataGLC
    /** @type { Array<{ id: string }> } */
    this.chartList = chartList
    /** @type { import('vue').Ref<boolean> } */
    this.drawState = drawState

    this.id = 1

    this.drawer
      .setDrawingStyle({ color: [0, 0, 0, .2], width: '6px' })
      .setDrawedStyle({ color: [0, 0, 0, .65], width: '6px' })
  }

  onDrawEnd (event) {
    const graphics = super.onDrawEnd(event)
    if (graphics) {
      const chartId = this.id++
      const line = event.geometry
      this.chartList.push({ id: chartId, graphics })
      this.drawState.value = false
      this.createChart(line, chartId)

      return true
    } else {
      return false
    }
  }

  createChart (line, chartId) {
    const [startPoint, endPoint] = [
      line.getPoint(0, 0),
      line.getPoint(0, 1),
    ]
    const demData = EsriUtils.createPixelsMatrix(this.pixelDataDEM).getByGeoLine(startPoint, endPoint)
    const glcData = EsriUtils.createPixelsMatrix(this.pixelDataGLC).getByGeoLine(startPoint, endPoint)
    const pieces = []
    const { glc30Colormap } = appConfig
    let tempVal = glcData[0]
    let startIndex = 0
    let endIndex = 0
    for (let i = 0; i < glcData.length; i++) {
      const targetVal = glcData[i]
      if (targetVal !== tempVal) {
        pieces.push({ gt: startIndex, lte: endIndex, color: glc30Colormap[tempVal].color })
        tempVal = targetVal
        startIndex = endIndex++
      } else {
        if (i === glcData.length - 1) {
          pieces.push({ gt: startIndex, lte: endIndex, color: glc30Colormap[targetVal].color })
        } else {
          endIndex++
        }
      }
    }
    const watchHandler = setInterval(() => {
      const elem = document.getElementById(`chart-ndba-profile-${chartId}`)
      if (elem) {
        clearInterval(watchHandler)
        echarts.init(elem).setOption({
          grid: {
            bottom: '30px',
            top: '30px',
            right: 0,
            left: '40px'
          },
          title: {
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: pieces
          },
          series: [
            {
              lineStyle: {
                width: 5
              },
              name: '用电量',
              type: 'line',
              smooth: true,
              data: demData,
              areaStyle: {},
            }
          ]
        })
      }
    }, 200)
  }

}
