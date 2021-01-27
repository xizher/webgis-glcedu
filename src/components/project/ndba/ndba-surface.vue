<template>
  <panel-box
    top="150px"
    left="50px"
  >
    <div
      class="ndba-surface"
    >
      <div
        id="chart-ndba-surface"
        class="chart-ndba-surface"
      />
    </div>
  </panel-box>
</template>

<script>
import { onMounted } from 'vue'
import {
  PanelBox
} from '../../app'
import echarts from 'echarts'
import appConfig from '../../../config/app.config'
import { $esriExt, EsriUtils } from '../../../wxz/src/gis/esri'
import 'echarts-gl'
export default {
  name: 'NdbaSurface',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    pixelDataDEM: {
      type: Object,
      default: () => ({})
    },
    pixelDataGLC: {
      type: Object,
      default: () => ({})
    },
    layer: {
      type: Object,
      default: () => ({})
    },
  },
  setup (props) {
    /** @type { __esri.PixelData } */
    const pixelDataDEM = props.pixelDataDEM // eslint-disable-line
    /** @type { __esri.PixelData } */
    const pixelDataGLC = props.pixelDataGLC // eslint-disable-line
    /** @type { __esri.ImageryLayer } */
    const layer = props.layer // eslint-disable-line

    const { glc30Colormap } = appConfig

    const { pixelBlock } = pixelDataDEM
    const pixelsMatrix = EsriUtils.createPixelsMatrix(pixelDataDEM)
    let startHeight = null, startWidth = null, endHeight = null, endWidth = null
    for (let i = 0; i < pixelBlock.height; i++) {
      for (let j = 0; j < pixelBlock.width; j++) {
        if (pixelsMatrix.matrix.getValue([i, j]) !== 0) {
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
    for (let i = pixelBlock.height - 1; i >= 0; i--) {
      for (let j = pixelBlock.width - 1; j >= 0; j--) {
        if (pixelsMatrix.matrix.getValue([i, j]) !== 0) {
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

    const pixelsMatrixGLC = EsriUtils.createPixelsMatrix(pixelDataGLC)


    const arr = []
    const arrGlc = []
    for (let i = startHeight; i <= endHeight; i++) {
      const tempArr = []
      const tempArrGlc = []
      for (let j = startWidth; j <= endWidth; j++) {
        tempArr.push(pixelsMatrix.matrix.getValue([i, j]))
        tempArrGlc.push(pixelsMatrixGLC.matrix.getValue([i, j]))
      }
      arr.push(tempArr)
      arrGlc.push(tempArrGlc)
    }

    const extentExt = $esriExt(layer.fullExtent)
    const [minLongitude, minLatitude] = extentExt.getMinLonLat()
    const [maxLongitude, maxLatitude] = extentExt.getMaxLonLat()

    onMounted(() => {
      const chart = echarts.init(document.getElementById('chart-ndba-surface'))
      chart.setOption({
        tooltip: {},
        xAxis3D: { type: 'value', name: '经度 (°E)',
          axisLabel: {
            formatter: val => (val * (maxLongitude - minLongitude) / pixelBlock.width + minLongitude).toFixed(2)
          }
        },
        yAxis3D: { type: 'value', name: '纬度 (°S)',
          axisLabel: {
            formatter: val => Math.abs(val * (maxLatitude - minLatitude) / pixelBlock.height + minLatitude).toFixed(2)
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
      })



    })


    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
