const ARCGIS_JS_API = 'http://localhost/arcgis/api/4.17'
const ARCGIS_SERVER_URL = 'http://192.168.0.108:4140/arcgis'

export default {
  apiConfig: {
    arcgisJsApiOptions: {
      url: `${ARCGIS_JS_API}/init.js`,
      css: `${ARCGIS_JS_API}/esri/themes/light/main.css`
    }
  },
  webMapOptions: {
    viewOptions: {
      center: [118, 34],
      zoom: 3,
      ui: {
        components: []
      },
      constraints: {
        minZoom: 3
      },
    },
    basemapOptions: {
      'visible': true,
      'layers': [
        { key: 0, alias: '彩色地图', name: '彩色中文含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{level}/{row}/{col}' } },
        { key: 1, alias: '灰色地图', name: '灰色中文不含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{level}/{row}/{col}' } },
        { key: 2, alias: '蓝黑色地图', name: '蓝黑色中文不含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{level}/{row}/{col}' } },
        { key: 3, alias: '暖色地图', name: '暖色中文不含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{level}/{row}/{col}' } },
        { key: 4, alias: 'OSM', name: 'OpenStreetMap', type: 'webTileLayer', options: { urlTemplate: 'https://{s}.tile.openstreetmap.org/{level}/{col}/{row}.png' } },
        { key: 5, alias: '陆地轮廓地图', name: '陆地轮廓地图', type: 'webTileLayer', options: { opacity: 0.5, urlTemplate: `${ARCGIS_SERVER_URL}//rest/services/GLC30/WorldLand/MapServer/tile/{level}/{row}/{col}` } },
      ],
      selectedKey: 5
    },
  }
}
