import { DrawTool } from '../../wxz/gis/esri/map-tools/tools/draw-tool/draw-tool'
import appConfig from '../../config/app.config'
import { useECharts } from '../../wxz/echarts-helper/echarts-hooks'

export class UbnzonStatTool extends DrawTool {

  //#region 私有方法

  /**
   * 绘制状态
   * @type { import('vue').Ref<boolean> }
   */
  #drawState = null

  /**
   * 2000年像元对象
   * @type { __esri.PixelData }
   */
  #pixelData2000 = null

  /**
   * 2010年像元对象
   * @type { __esri.PixelData }
   */
  #pixelData2010 = null

  /**
   * 2020年像元对象
   * @type { __esri.PixelData }
   */
  #pixelData2020 = null

  /**
   * 区域选择方式
   * @type { import('vue').Ref<string> }
   */
  #areaType = null

  /**
   * 统计方式
   * @type { import('vue').Ref<string> }
   */
  #statType = null

  /**
   * 设置统计图配置
   * @type { Function }
   */
  #setChartOptions = null

  //#endregion

  //#region 构造函数

  constructor (map, view, { drawState, pixelData2000, pixelData2010, pixelData2020, areaType, statType }) {
    super(map, view, 'circle')

    this.#drawState = drawState
    this.#pixelData2000 = pixelData2000
    this.#pixelData2010 = pixelData2010
    this.#pixelData2020 = pixelData2020
    this.#areaType = areaType
    this.#statType = statType

    const [setChartOptions] = useECharts('ubnzon-stat-chart')
    this.#setChartOptions = setChartOptions

    this.drawer.setDrawedStyle({
      color: [0, 255, 255, .25],
      outline: {
        color: [0, 255, 255],
        width: 2
      }
    })
  }

  //#endregion

  //#region 私有方法

  #showResult (geometry) {
    const { esriUtils } = this.view.$owner
    const data2000 = esriUtils.createPixelMatrix(this.#pixelData2000).getValueByGeoPolygon(geometry)
    const data2010 = esriUtils.createPixelMatrix(this.#pixelData2010).getValueByGeoPolygon(geometry)
    const data2020 = esriUtils.createPixelMatrix(this.#pixelData2020).getValueByGeoPolygon(geometry)
    if (this.#statType.value === '地表覆盖总量变化') {
      this.#totalChange([data2000, data2010, data2020])
    } else if (this.#statType.value === '地表覆盖占比变化') {
      this.#percentChange([data2000, data2010, data2020])
    }
  }

  #getNumCount (sourceData) {
    return sourceData.reduce((p, v) => {
      if (v in p) {
        p[v]++
      } else {
        p[v] = 1
      }
      return p
    }, {})
  }

  #totalChange ([data2000, data2010, data2020]) {
    const statData2000 = this.#getNumCount(data2000)
    const statData2010 = this.#getNumCount(data2010)
    const statData2020 = this.#getNumCount(data2020)
    const { glc30Colormap } = appConfig
    const series = parseDataToSeries()
    const legend = {
      data: Object.values(glc30Colormap).map(item => item.name)
    }
    const color = Object.values(glc30Colormap).map(item => item.color)
    this.#setChartOptions({
      legend, color, series,
      tooltip: { trigger: 'axis' },
      grid: { left: '38px', },
      xAxis: { type: 'category', data: ['2000', '2010', '2020'] },
      yAxis: { type: 'value', axisLabel: { formatter: val => val * 900 / 1000000 } },
      dataZoom: [{ type: 'slider', yAxisIndex: 0, filterMode: 'empty' }],
    })


    function parseDataToSeries () {
      const series = Object.keys(glc30Colormap).map(key => {
        const name = glc30Colormap[key].name
        const data = [
          statData2000[key] || 0,
          statData2010[key] || 0,
          statData2020[key] || 0,
        ]
        return { name, data, type: 'line', lineStyle: { width: 4 } }
      })
      return series
    }
  }

  #percentChange ([data2000, data2010, data2020]) {
    const statData2000 = this.#getNumCount(data2000)
    const statData2010 = this.#getNumCount(data2010)
    const statData2020 = this.#getNumCount(data2020)
    const dataset = { source: [['year', '2000', '2010', '2020']] }
    const { glc30Colormap } = appConfig
    Object.values(glc30Colormap).forEach(item => {
      dataset.source.push([
        item.name,
        statData2000[item.key] || 0,
        statData2010[item.key] || 0,
        statData2020[item.key] || 0,
      ])
    })
    const color = Object.values(glc30Colormap).map(item => item.color)
    this.#setChartOptions({
      dataset, color,
      title: [
        { text: '' },
        { subtext: '2000年', left: '33%', top: '42%', textAlign: 'center' },
        { subtext: '2010年', left: '66%', top: '42%', textAlign: 'center' },
        { subtext: '2020年', left: '50%', top: '75%', textAlign: 'center' }
      ],
      legend: {},
      tooltip: {},
      series: [{
        type: 'pie',
        radius: 40,
        center: ['33%', '43%'],
        encode: { itemName: 'year', value: '2000' },
        label: { show: false }
      }, {
        type: 'pie',
        radius: 40,
        center: ['66%', '43%'],
        encode: { itemName: 'year', value: '2010' },
        label: { show: false }
      }, {
        type: 'pie',
        radius: 40,
        center: ['50%', '76%'],
        encode: { itemName: 'year', value: '2020' },
        label: { show: false }
      }]
    })
  }

  //#endregion

  //#region 公有方法

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      if (this.#areaType.value === '行政单元（市级）') {
        const point = this.view.toScreen(event.geometry)
        const { layerOperation } = this.view.$owner
        const layer = layerOperation.findLayerByName('长三角市级行政区划')
        this.view.hitTest(point, { include: layer }).then(res => {
          this.drawer.clear()
          this.drawer.add(res.results[0].graphic.geometry)
          // highlight.setHighlight(layer, res.results[0].graphic)
          this.#showResult(res.results[0].graphic.geometry)
        })
      } else if (this.#areaType.value === '行政单元（省级）') {
        const point = this.view.toScreen(event.geometry)
        const { layerOperation } = this.view.$owner
        const layer = layerOperation.findLayerByName('长三角省级行政区划')
        this.view.hitTest(point, { include: layer }).then(res => {
          this.drawer.clear()
          // highlight.setHighlight(layer, res.results[0].graphic)
          this.drawer.add(res.results[0].graphic.geometry)
          this.#showResult(res.results[0].graphic.geometry)
        })
      } else {
        this.#showResult(event.geometry)
      }
      this.#drawState.value = false
      return true
    } else {
      return false
    }
  }

  onToolActived (event) {
    if (super.onToolActived(event)) {
      this.clearDrawed()
      return true
    } else {
      return false
    }
  }

  //#endregion

}
