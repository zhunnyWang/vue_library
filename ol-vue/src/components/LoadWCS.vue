<template>
  <div>
    <div id="map2d"
         class="fullWindow">
    </div>
    <div class="row">
      <ul class="d2-draw-helper">
        <li ref="rotatetarget"
            class="rotatetarget"></li>
        <li ref="MousePosition"
            class="MousePosition"></li>
      </ul>
    </div>
  </div>

</template>

<script >
import 'ol/ol.css'
import olView from 'ol/View.js';
import olMap from 'ol/Map.js';
import { transform } from 'ol/proj.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import { defaults as olControlDefaults } from 'ol/control.js';
import { defaults as interactionDefaults } from 'ol/interaction.js';
import olInteractionDragPan from 'ol/interaction/DragPan';
import olInteractionDragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';
import olControlScaleLine from 'ol/control/ScaleLine';
import olControlMousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { transformExtent } from 'ol/proj';
import olSourceXYZ from 'ol/source/XYZ';
import ImageLayer from 'ol/layer/Image';
import RasterSource from 'ol/source/Raster';
export default {
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.initMap();
    this.loadWCS();
  },
  methods: {
    initMap () {
      const defaultProj = "EPSG:4326";
      let center = [114.0, 30.0], zoom = 4;
      let view = new olView({
        projection: defaultProj, //投影
        extent: [-180, -90, 180, 90], //控制中心点的范围，center不能超过这个范围
        center: transform(center, 'EPSG:4326', defaultProj), //转换源投影到目标投影的坐标。 这将返回一个新的坐标
        zoom: zoom, //初始缩放级别
        maxZoom: 17,
        minZoom: 3
      });
      let map = this.map = new olMap({
        target: 'map2d',
        //用户控制地图的工具
        controls: olControlDefaults({ //地图中的一组默认控件，false不显示该默认控件
          attribution: false,
          zoom: false,
          rotateOptions: {//将旋转重置为0的工具
            className: "custom-ol-rotate",
            target: this.$refs.rotatetarget
          }
        }).extend([ //添加其他控件
          new olControlScaleLine({ //比例尺控件
            className: 'custom-ol-scaleline' //比例尺的样式
          }),
          new olControlMousePosition({ //鼠标位置控件，显示鼠标指针2D坐标
            projection: 'EPSG:4326',
            coordinateFormat: createStringXY(4), //坐标显示的格式
            className: ' text-danger', //坐标值的样式
            target: this.$refs.MousePosition, //将坐标显示在地图某个地方
            undefinedHTML: "鼠标经纬度"
          })
        ]),
        //地图交互功能
        interactions: interactionDefaults({
          dragPan: false
        }).extend([
          new olInteractionDragRotateAndZoom(), //拖拽方式进行缩放和旋转地图
          new olInteractionDragPan({ //拖拽平移地图
            kinetic: null
          })
        ]),
        layers: [
          new olLayerTile({
            source: new olSourceOSM()
          })
        ], //底图开关控制$rootScope.baseLayer
        view: view
      });
    },
    tileXYToRectangle (SRS, x, y, level) { //将瓦片坐标转换成对应的投影坐标
      // console.log('x:' + x +' y:' + y + ' level:' + level);
      var west, east, north, south;
      var total1 = Math.pow(2, level + 1); //3857
      var total2 = Math.pow(2, level); //4326
      //4326
      if (SRS.indexOf("4326") !== -1) {
        west = x * 1.0 / (total2 * 2) * 360.0 - 180.0;
        east = (x + 1) * 1.0 / (total2 * 2) * 360.0 - 180.0;
        north = 90.0 - y * 1.0 / total2 * 180.0;
        south = 90.0 - (y + 1) * 1.0 / total2 * 180.0;
      } else {
        // console.log('i am 3857');
        west = x * 1.0 / total1 * 360.0 - 180.0;
        east = (x + 1) * 1.0 / total1 * 360.0 - 180.0;
        north = Math.atan(Math.sinh(Math.PI * (1.0 - 2.0 * y / total1))) * 180.0 / Math.PI;
        south = Math.atan(Math.sinh(Math.PI * (1.0 - 2.0 * (y + 1.0) / total1))) * 180.0 / Math.PI;
      }

      var result = "";

      result += west + ",";
      result += south + ",";
      result += east + ",";
      result += north;

      // console.log('result:' + result);
      return result;
    },
    inRequsetBBox (bbox, requestBbox) {
      var l = parseInt(requestBbox[0]);
      var b = parseInt(requestBbox[1]);
      var r = parseInt(requestBbox[2]);
      var t = parseInt(requestBbox[3]);
      var bbox = bbox.split(",");
      var bboxl = parseInt(bbox[0]);
      var bboxb = parseInt(bbox[1]);
      var bboxr = parseInt(bbox[2]);
      var bboxt = parseInt(bbox[3]);

      if (bboxl > r || bboxr < l || bboxb > t || bboxt < b) {
        return false;
      } else {
        return true;
      }
    },
    shade (inputs, data) {
      var elevationImage = inputs[0];
      var width = elevationImage.width;
      var height = elevationImage.height;
      var elevationData = elevationImage.data;
      var shadeData = new Uint8ClampedArray(elevationData.length);

      var maxX = width - 1;
      var maxY = height - 1;
      var pixel = [0, 0, 0, 0];

      function getColor (h) {
        if (h < 1800) {
          return [46 + (251 - 46) / 1800 * h, 154 + (255 - 154) / 1800 * h, 88 + (128 - 88) / 1800 * h, 255]
        } else if (h < 2800) {
          return [251 - (251 - 224) / 1000 * (h - 1800), 255 - (255 - 18) / 1000 * (h - 1800), 128 - (128 - 31) / 1000 * (h - 1800), 255]
        } else if (h < 3500) {
          return [224 - (224 - 200) / 700 * (h - 2800), 108 - (108 - 55) / 700 * (h - 2800), 31 + (55 - 31) / 700 * (h - 2800), 255]
        } else if (h < 4000) {
          return [200 + (215 - 200) / 500 * (h - 3500), 55 + (244 - 55) / 500 * (h - 3500), 55 + (244 - 55) / 500 * (h - 3500), 255]
        } else {
          return [215, 244, 244, 255]
        }
      }
      var pixelX, pixelY, x0, x1, y0, y1, offset,
        z0, z1, dzdx, dzdy, slope, aspect, cosIncidence, scaled;
      for (pixelY = 0; pixelY <= maxY; ++pixelY) {
        y0 = pixelY;
        y1 = pixelY;
        for (pixelX = 0; pixelX <= maxX; ++pixelX) {
          x0 = pixelX;
          x1 = pixelX;
          offset = (pixelY * width + x0) * 4;
          pixel[0] = elevationData[offset];
          pixel[1] = elevationData[offset + 1];
          pixel[2] = elevationData[offset + 2];
          pixel[3] = elevationData[offset + 3];
          var x = ((pixel[1] << 8) + pixel[0]) / 5 - 1000;

          var h = getColor(x);
          shadeData[offset] = h[0];
          shadeData[offset + 1] = h[1];
          shadeData[offset + 2] = h[2];
          shadeData[offset + 3] = h[3];
        }
      }
      return new ImageData(shadeData, width, height);
    },
    loadWCS () {
      let map = this.map;
      let params = {
        url: 'http://192.168.1.116:8080/services',
        name: 'SmallTerrain',
        bbox: [-180, -90, 180, 90]
      }
      let url = params.url;
      let coverage = params.name;
      let requestBbox = params.bbox;
      const that = this;
      let elevation = new olSourceXYZ({
        tileUrlFunction: function (tile, ratio, proj) {
          //tile  256*256
          var z = tile[0];
          var x = tile[1];
          var y = tile[2];
          //BBOX 是一个瓦片大小
          //dem数据与terrain数据都是按照dem数据处理 大小目前都默认成256*256
          if (z) {
            var bbox = that.tileXYToRectangle(proj.getCode(), x, -y - 1, z - 1);
            if (that.inRequsetBBox(bbox, requestBbox)) {
              return url + '?service=wcs&request=getcoverage&crs=EPSG:4326&response_crs=EPSG:4326&coverage=' +
                coverage + '&format=dem&x=' + x + '&y=' + (-y - 1) + '&depth=' + (z - 1) + '&bbox=' + bbox + '&parameter=1'
            }
          }


        },
        projection: 'EPSG:4326',
        crossOrigin: 'anonymous'
      })

      let raster = new RasterSource({
        projection: params.srs, //自己写的“EPSG:4326”
        sources: [elevation],
        operationType: 'image', //operations will be called with an array of ImageData objects from input sources
        operation: this.shade
      });

      let layer = new ImageLayer({
        opacity: 0.8,
        extent: requestBbox, //超过范围不显示
        source: raster
      });

      map.addLayer(layer);
    },
  },



}
</script>

<style scoped>
.fullWindow {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  font-family: sans-serif;
  background-color: #f0f2f3;
}
</style>