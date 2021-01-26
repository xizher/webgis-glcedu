<template>
  <div class="vue-view-natural-difference-longitude">
    <BackToWelcomeView />
    <ThemeHeaderPanel
      title="自然地理环境的地域差异"
      sub-title="经度地带性分异规律"
    />
    <NdblSlider
      :min-lon-lat="minLonLat"
      :max-lon-lat="maxLonLat"
      @change="changeHandler"
    />
    <NdblViewer
      v-if="loaded"
      :min-longitude="minLonLat[0]"
      :max-longitude="maxLonLat[0]"
      :dataset="dataset"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import {
  BackToWelcomeView,
  ThemeHeaderPanel,
} from '../../components/app'
import {
  NdblSlider,
  NdblViewer,
} from '../../components/project'
import { useNaturalDifferenceByLongitude } from '../../project/hooks/useTheme'
import { $esriExt, EsriUtils } from '../../wxz/src/gis/esri'
export default {
  name: 'NaturalDifferenceByLongitude',
  components: {
    BackToWelcomeView,
    ThemeHeaderPanel,
    NdblSlider,
    NdblViewer,
  },
  setup () {
    const [layer, loaded, getPixelData] = useNaturalDifferenceByLongitude()
    const extentExt = $esriExt(layer.fullExtent)
    const minLonLat = extentExt.getMinLonLat()
    const maxLonLat = extentExt.getMaxLonLat()
    const latitude = ref(0)

    const dataset = computed(() => {
      if (!loaded.value) {
        return []
      }
      const pixelsMatrix = EsriUtils.createPixelsMatrix(getPixelData())
      const startXY = EsriUtils.lonLatToXY([minLonLat[0], latitude.value])
      const endtXY = EsriUtils.lonLatToXY([maxLonLat[0], latitude.value])
      const pixels = pixelsMatrix.getByGeoLine({ x: startXY[0], y: startXY[1] }, { x: endtXY[0], y: endtXY[1] })
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
      latitude,
      changeHandler (val) {
        latitude.value = val
      },
      minLonLat, maxLonLat,
      loaded,
      dataset,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
