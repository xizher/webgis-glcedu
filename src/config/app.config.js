const ARCGIS_JS_API = 'http://192.168.0.105/arcgis/api/4.17'
const ARCGIS_SERVER_URL = 'http://192.168.65.134:6080/arcgis'

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
  },
  basemapOptions: {
    'visible': true,
    'layers': [
      { key: 0, alias: '彩色地图', name: '彩色中文含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{level}/{row}/{col}' } },
      { key: 1, alias: '灰色地图', name: '灰色中文不含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{level}/{row}/{col}' } },
      { key: 2, alias: '蓝黑色地图', name: '蓝黑色中文不含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{level}/{row}/{col}' } },
      { key: 3, alias: '暖色地图', name: '暖色中文不含兴趣点版中国基础地图', type: 'webTileLayer', options: { urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{level}/{row}/{col}' } },
      { key: 4, alias: 'OSM', name: 'OpenStreetMap', type: 'webTileLayer', options: { urlTemplate: 'https://{s}.tile.openstreetmap.org/{level}/{col}/{row}.png' } },
      { key: 5, alias: '陆地轮廓地图', name: '陆地轮廓地图', type: 'webTileLayer', options: { opacity: 0.5, urlTemplate: `${ARCGIS_SERVER_URL}//rest/services/GLC30/WorldLand/MapServer/tile/{level}/{row}/{col}`, maxScale: 2311162.217155 } },
    ],
    selectedKey: 5
  },
  glc30Colormap: {
    10: { key: 10, color: '#FAA0FF', name: '耕地', description: '用于种植农作物的土地，包括水田、灌溉旱地、雨养旱地、菜地、牧草种植地、大棚用地、以种植农作物为主间有果树及其他经济乔木的土地，以及茶园、咖啡园等灌木类经济作物种植地' },
    20: { key: 20, color: '#006400', name: '林地', description: '乔木覆盖且树冠盖度超过30%的土地，包括落叶阔叶林、常绿阔叶林、落叶针叶林、常绿针叶林、混交林，以及树冠盖度为10-30%的疏林地' },
    30: { key: 30, color: '#64FF00', name: '草地', description: '天然草本植被覆盖，且盖度大于10%的土地，包括草原、草甸、稀树草原、荒漠草原，以及城市人工草地等' },
    40: { key: 40, color: '#00FF78', name: '灌木地', description: '灌木覆盖且灌丛覆盖度高于30%的土地，包括山地灌丛、落叶和常绿灌丛，以及荒漠地区覆盖度高于10%的荒漠灌丛' },
    50: { key: 50, color: '#0064FF', name: '湿地', description: '位于陆地和水域的交界带，有浅层积水或土壤过湿的土地，多生长有沼生或湿生植物。包括内陆沼泽、湖泊沼泽、河流洪泛湿地、森林/灌木湿地、泥炭沼泽、红树林、盐沼等' },
    60: { key: 60, color: '#0000FF', name: '水体', description: '陆地范围液态水覆盖的区域，包括江河、湖泊、水库、坑塘等' },
    70: { key: 70, color: '#646432', name: '苔原', description: '寒带及高山环境下由地衣、苔藓、多年生耐寒草本和灌木植被覆盖的土地，包括灌丛苔原、禾本苔原、湿苔原、高寒苔原、裸地苔原等' },
    80: { key: 80, color: '#FF0000', name: '人造地表', description: '由人工建造活动形成的地表，包括城镇等各类居民地、工矿、交通设施等，不包括建设用地内部连片绿地和水体' },
    90: { key: 90, color: '#BEBEBE', name: '裸地', description: '植被覆盖度低于10%的自然覆盖土地，包括荒漠、沙地、砾石地、裸岩、盐碱地等' },
    100: { key: 100, color: '#C8F0FF', name: '冰川和永久积雪', description: '由永久积雪、冰川和冰盖覆盖的土地，包括高山地区永久积雪、冰川，以及极地冰盖等' },
    255: { key: 255, color: '#00C8FF', name: '海洋', description: '海洋水域' },
  },
  layerOperationOptions: {
    layerList: [
      {
        name: '经度地带性分异规律.tiff', alias: '经度地带性分异规律', key: '0',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2020_N48TO51_40/ImageServer`,
            format: 'tiff', visible: false,
          }
        }
      },
      {
        name: '经度地带性分异规律.png32', alias: '经度地带性分异规律', key: '1',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2020_N48TO51_40/ImageServer`,
            format: 'png32', visible: false,
          }
        }
      },
      // {
      //   name: '乞力马扎罗数字高程模型.png32', alias: '乞力马扎罗数字高程模型', key: '2',
      //   target: { type: 'ImageryLayer',
      //     options: {
      //       url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/DEM_KLMZO/ImageServer`,
      //       format: 'png32', visible: false,
      //     }
      //   }
      // },
      {
        name: '乞力马扎罗数字高程模型.tiff', alias: '乞力马扎罗数字高程模型', key: '3',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/DEM_KLMZO/ImageServer`,
            format: 'tiff', visible: false,
          }
        }
      },
      {
        name: '乞力马扎罗地表覆盖.png32', alias: '乞力马扎罗地表覆盖', key: '4',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2000_KILIMANJARO/ImageServer`,
            format: 'png32', visible: false,
          }
        }
      },
      {
        name: '乞力马扎罗地表覆盖.tiff', alias: '乞力马扎罗地表覆盖', key: '5',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2000_KILIMANJARO/ImageServer`,
            format: 'tiff', visible: false,
          }
        }
      },
      {
        name: '长三角省级行政区划', alias: '长三角省级行政区划', key: '13',
        target: { type: 'FeatureLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/CSJ_BOUA/MapServer/0`,
            visible: false,
          }
        }
      },
      {
        name: '长三角市级行政区划', alias: '长三角市级行政区划', key: '12',
        target: { type: 'FeatureLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/CSJ_BOUA/MapServer/1`,
            visible: false,
            renderer: { type: 'simple', symbol: { type: 'simple-fill', color: [0, 0, 0, 0], outline: { color: 'white' } } }
          }
        }
      },
      {
        name: '长三角2020年地表覆盖.png32', alias: '长三角2020年地表覆盖', key: '10',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2020_CSJ/ImageServer`,
            format: 'png32', visible: false,
          }
        }
      },
      {
        name: '长三角2020年地表覆盖.tiff', alias: '长三角2020年地表覆盖', key: '11',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2020_CSJ/ImageServer`,
            format: 'tiff', visible: false,
          }
        }
      },
      {
        name: '长三角2010年地表覆盖.png32', alias: '长三角2010年地表覆盖', key: '8',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2010_CSJ/ImageServer`,
            format: 'png32', visible: false,
          }
        }
      },
      {
        name: '长三角2010年地表覆盖.tiff', alias: '长三角2010年地表覆盖', key: '9',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2010_CSJ/ImageServer`,
            format: 'tiff', visible: false,
          }
        }
      },
      {
        name: '长三角2000年地表覆盖.png32', alias: '长三角2000年地表覆盖', key: '6',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2000_CSJ/ImageServer`,
            format: 'png32', visible: false,
          }
        }
      },
      {
        name: '长三角2000年地表覆盖.tiff', alias: '长三角2000年地表覆盖', key: '7',
        target: { type: 'ImageryLayer',
          options: {
            url: `${ARCGIS_SERVER_URL}/rest/services/GLC30/GLC30_Y2000_CSJ/ImageServer`,
            format: 'tiff', visible: false,
          }
        }
      },
    ]
  }
}
