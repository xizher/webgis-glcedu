import { esri, EsriUtils } from '../../../wxz/src/gis/esri'
import { DrawTool } from '../../../wxz/src/gis/esri/map-tools/operation-tools/draw-tool/draw-tool'

export class UbnzonStatTool extends DrawTool {

  constructor (map, view, drawState, pixelData2000, pixelData2010, pixelData2020) {
    super(map, view, 'circle')

    this.drawState = drawState
    this.pixelData2000 = pixelData2000
    this.pixelData2010 = pixelData2010
    this.pixelData2020 = pixelData2020
  }

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      EsriUtils.createPixelsMatrix(this.pixelData2020).getByGeoPolygon(event.geometry)
      this.drawState.value = false
      return true
    } else {
      return false
    }
  }

}
