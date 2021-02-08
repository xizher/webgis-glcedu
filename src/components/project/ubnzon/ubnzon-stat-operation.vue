<template>
  <panel-box
    top="100px"
    left="100px"
  >
    <div
      class="ubnzon-stat-operation"
    >
      <div class="selector">
        区域选择：
        <a-select
          v-model:value="selectedAreaType"
          style="width: 185px"
        >
          <a-select-option
            v-for="item in areaTypes"
            :key="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
      <div class="selector">
        统计方式：
        <a-select
          v-model:value="selectedStatType"
          style="width: 185px"
        >
          <a-select-option
            v-for="item in statTypes"
            :key="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
      <a-button
        :type="drawState ? 'primary' : 'default'"
        style="width: 260px"
        @click="drawState = !drawState"
      >
        {{ drawState ? '取消' : '' }}绘制
      </a-button>
    </div>
  </panel-box>
</template>

<script>
import {
  PanelBox
} from '../../app'
export default {
  name: 'UbnzonStatOperation',
  components: {
    'panel-box': PanelBox,
  },
  props: {
    useOperation: {
      type: Function,
      default: () => () => null
    },
  },
  setup (props) {
    return props.useOperation()
  }
  // setup (props) {
  //   const areaTypes = [
  //     '范围绘制（圆）', '范围绘制（矩形）', '范围绘制（多边形）',
  //     '行政单元（市级）', '行政单元（省级）',
  //   ]
  //   const selectedAreaType = ref(areaTypes[0])

  //   const statTypes = [
  //     '地表覆盖占比变化', '地表覆盖总量变化',
  //   ]
  //   const selectedStatType = ref(statTypes[0])
  //   const showCoverSelector = computed(() => selectedStatType.value === statTypes[1])
  //   const showYearSelector = computed(() => selectedStatType.value === statTypes[0])

  //   const coverTypes = Object.values(appConfig.glc30Colormap).map(item => ({
  //     name: item.name, key: item.key
  //   }))
  //   const selectedCoverType = ref(coverTypes[0].key)

  //   const yearTypes = [2000, 2010, 2020]
  //   const selectedYearType = ref(yearTypes[0])

  //   const drawState = ref(false)
  //   const { mapTools, map, view, mapElementDisplay, highlight } = useWebMap()
  //   const ubnzonStatTool = new UbnzonStatTool(
  //     map,
  //     view,
  //     drawState,
  //     props.year2000,
  //     props.year2010,
  //     props.year2020,
  //     selectedAreaType,
  //     selectedStatType,
  //     selectedYearType,
  //     selectedCoverType,
  //   )
  //   if (!mapTools.hasTool('ubnzon-stat-tool')) {
  //     mapTools.createCustomTool('ubnzon-stat-tool', ubnzonStatTool)
  //   }
  //   watch(drawState, val => {
  //     if (val) {
  //       mapElementDisplay.clear()
  //       highlight.clearHighlight()
  //       mapTools.setMapTool('ubnzon-stat-tool')
  //     } else {
  //       mapTools.setMapTool('')
  //     }
  //   })
  //   onUnmounted(() => {
  //     mapElementDisplay.clear()
  //     highlight.clearHighlight()
  //   })
  //   watch(selectedAreaType, val => {
  //     switch (val) {
  //     case '范围绘制（圆）':
  //       ubnzonStatTool.drawType = 'circle'
  //       break
  //     case '范围绘制（矩形）':
  //       ubnzonStatTool.drawType = 'rectangle'
  //       break
  //     case '范围绘制（多边形）':
  //       ubnzonStatTool.drawType = 'polygon'
  //       break
  //     case '行政单元（市级）':
  //     case '行政单元（省级）':
  //       ubnzonStatTool.drawType = 'point'
  //       break
  //     default:
  //       break
  //     }
  //   })

  //   return {
  //     areaTypes,
  //     statTypes,
  //     coverTypes,
  //     yearTypes,
  //     selectedAreaType,
  //     selectedStatType,
  //     selectedCoverType,
  //     selectedYearType,
  //     showCoverSelector,
  //     showYearSelector,
  //     drawState,
  //   }
  // }
}
</script>

<style lang="scss" scoped>

</style>
