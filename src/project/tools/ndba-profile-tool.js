import { DrawTool } from '../../wxz/gis/esri/map-tools/tools/draw-tool/draw-tool'
import { BaseUtils } from '../../wxz/js-utils'
import appConfig from '../../config/app.config'
import { EChartsHelper } from '../../wxz/echarts-helper/echarts-hepler'

export class NdbaProfileTool extends DrawTool {

  //#region 私有属性

  /**
   * @type { __esri.PixelData }
   */
  #pixelDataDEM = null

  /**
   * @type { __esri.PixelData }
   */
  #pixelDataGLC = null

  /**
   * @type { Array<{ id: string, graphic: __esri.Graphic }> }
   */
  #chartList = []

  /**
   * @type { import('vue').Ref<boolean> }
   */
  #drawState = null

  //#endregion

  constructor (map, view, options) {
    super (map, view, 'line-faster')

    this.#pixelDataDEM = options.pixelDataDEM
    this.#pixelDataGLC = options.pixelDataGLC
    this.#drawState = options.drawState
    this.#chartList = options.chartList

    this.drawer
      .setDrawingStyle({ color: [0, 0, 0, .2], width: '6px' })
      .setDrawedStyle({ color: [0, 0, 0, .65], width: '6px' })
  }

  //#region 私有方法

  /**
   * 创建统计图
   * @param { __esri.Polyline } line 剖面线对象
   * @param { string } id 统计图Id
   */
  #createChart (line, id) {
    const { esriUtils } = this.map.$owner
    const startPoint = line.getPoint(0, 0)
    const endPoint = line.getPoint(0, 1)
    const demData = esriUtils.createPixelMatrix(this.#pixelDataDEM).getValueByGeoLine(startPoint, endPoint)
    const glcData = esriUtils.createPixelMatrix(this.#pixelDataGLC).getValueByGeoLine(startPoint, endPoint)
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
    const echartsHelper = new EChartsHelper(id, {
      grid: { bottom: '30px', top: '30px', right: 0, left: '40px' },
      title: { },
      xAxis: { type: 'category', },
      yAxis: { },
      visualMap: { show: false, dimension: 0, pieces: pieces },
      series: [{
        name: '用电量', type: 'line', smooth: true,
        data: demData, areaStyle: {},
        lineStyle: { width: 5 },
      }]
    })
    const handler = setInterval(() => {
      if (document.getElementById(id)) {
        clearInterval(handler)
        echartsHelper.mount()
      }
    }, 200)
  }

  //#endregion

  onDrawEnd (event) {
    const graphic = super.onDrawEnd(event)
    if (graphic) {
      const id = BaseUtils.guid()
      const line = event.geometry
      this.#chartList.push({ id, graphic })
      this.#drawState.value = false
      this.#createChart(line, id)
      return true
    } else {
      return false
    }
  }

}
