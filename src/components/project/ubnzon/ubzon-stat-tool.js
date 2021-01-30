import { esri, EsriUtils } from '../../../wxz/src/gis/esri'
import { DrawTool } from '../../../wxz/src/gis/esri/map-tools/operation-tools/draw-tool/draw-tool'
import echarts from 'echarts'
import appConfig from '../../../config/app.config'

export class UbnzonStatTool extends DrawTool {

  constructor (map, view, drawState, pixelData2000, pixelData2010, pixelData2020, areaType, statType, yearType, coverType) {
    super(map, view, 'circle')

    this.drawer
      .setDrawingStyle({ color: [0, 0, 0, .2], outline: { color: [0, 0, 0, .2], width: '6px' } })
      .setDrawedStyle({ color: [0, 0, 0, .65], outline: { color: [0, 0, 0, .65], width: '6px' } })

    this.drawState = drawState
    this.pixelData2000 = pixelData2000
    this.pixelData2010 = pixelData2010
    this.pixelData2020 = pixelData2020
    this.areaType = areaType
    this.statType = statType
    this.yearType = yearType
    this.coverType = coverType
  }

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      if (this.areaType.value === '行政单元（市级）') {
        const point = this.view.toScreen(event.geometry)
        const { layerOperation, highlight } = this.view.$owner
        const layer = layerOperation.findLayerByName('长三角市级行政区划')
        this.view.hitTest(point, { include: layer }).then(res => {
          this.drawer.clear()
          highlight.setHighlight(layer, res.results[0].graphic)
          this.showResult(res.results[0].graphic.geometry)
        })
      } else if (this.areaType.value === '行政单元（省级）') {
        const point = this.view.toScreen(event.geometry)
        const { layerOperation, highlight } = this.view.$owner
        const layer = layerOperation.findLayerByName('长三角省级行政区划')
        this.view.hitTest(point, { include: layer }).then(res => {
          this.drawer.clear()
          highlight.setHighlight(layer, res.results[0].graphic)
          this.showResult(res.results[0].graphic.geometry)
        })
      } else {
        this.showResult(event.geometry)
      }
      // EsriUtils.createPixelsMatrix(this.pixelData2020).getByGeoPolygon(event.geometry)
      this.drawState.value = false
      return true
    } else {
      return false
    }
  }

  showResult (geometry) {
    if (this.statType.value === '地表覆盖总量变化') {
      const data2000 = EsriUtils.createPixelsMatrix(this.pixelData2000).getByGeoPolygon(geometry)
      const data2010 = EsriUtils.createPixelsMatrix(this.pixelData2010).getByGeoPolygon(geometry)
      const data2020 = EsriUtils.createPixelsMatrix(this.pixelData2020).getByGeoPolygon(geometry)
      this['地表覆盖总量变化']([data2000, data2010, data2020])
    } else if (this.statType.value === '地表覆盖占比变化') {
      const data2000 = EsriUtils.createPixelsMatrix(this.pixelData2000).getByGeoPolygon(geometry)
      const data2010 = EsriUtils.createPixelsMatrix(this.pixelData2010).getByGeoPolygon(geometry)
      const data2020 = EsriUtils.createPixelsMatrix(this.pixelData2020).getByGeoPolygon(geometry)
      this['地表覆盖占比变化']([data2000, data2010, data2020])
    }
  }
  getNumCount (sourceData) {
    const targetData = sourceData.reduce((total, currentVal) => {
      if (currentVal in total) {
        total[currentVal]++
      } else {
        total[currentVal] = 1
      } return total
    }, {})
    return targetData
  }

  '地表覆盖总量变化' ([data2000, data2010, data2020]) {
    const statData2000 = this.getNumCount(data2000)
    const statData2010 = this.getNumCount(data2010)
    const statData2020 = this.getNumCount(data2020)

    const { glc30Colormap } = appConfig

    const series = parseDataToSeries()

    const legend = {
      data: Object.values(glc30Colormap).map(item => item.name)
    }

    const color = Object.values(glc30Colormap).map(item => item.color)

    function parseDataToSeries () {
      const series = Object.keys(glc30Colormap).map(key => {
        const name = glc30Colormap[key].name
        const data = [
          statData2000[key] || 0,
          statData2010[key] || 0,
          statData2020[key] || 0,
        ]
        return {
          name, type: 'line',
          data,
          lineStyle: { width: 4 }
        }
      })
      return series
    }

    if (!this.chart) {
      this.chart = echarts.init(document.getElementById('ubnzon-stat-chart'))
    }
    this.chart.clear()
    this.chart.setOption({
      legend,
      color,
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '38px',
      },
      xAxis: {
        type: 'category',
        data: ['2000', '2010', '2020']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter (val) {
            return val * 900 / 1000000
          }
        }
      },
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: 0,
          filterMode: 'empty'
        },
      ],
      series,
    })
  }

  '地表覆盖占比变化' ([data2000, data2010, data2020]) {
    const statData2000 = this.getNumCount(data2000)
    const statData2010 = this.getNumCount(data2010)
    const statData2020 = this.getNumCount(data2020)

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
    if (!this.chart) {
      this.chart = echarts.init(document.getElementById('ubnzon-stat-chart'))
    }
    this.chart.clear()
    this.chart.setOption({
      title: [{
        text: ''
      }, {
        subtext: '2000年',
        left: '33%',
        top: '42%',
        textAlign: 'center'
      }, {
        subtext: '2010年',
        left: '66%',
        top: '42%',
        textAlign: 'center'
      }, {
        subtext: '2020年',
        left: '50%',
        top: '75%',
        textAlign: 'center'
      }],
      legend: {},
      tooltip: {},
      dataset,
      series: [{
        type: 'pie',
        radius: 40,
        center: ['33%', '43%'],
        encode: {
          itemName: 'year',
          value: '2000'
        },
        label: {
          show: false
        }
      }, {
        type: 'pie',
        radius: 40,
        center: ['66%', '43%'],
        encode: {
          itemName: 'year',
          value: '2010'
        },
        label: {
          show: false
        }
      }, {
        type: 'pie',
        radius: 40,
        center: ['50%', '76%'],
        encode: {
          itemName: 'year',
          value: '2020'
        },
        label: {
          show: false
        }
      }]
    })

  }

}
