import esriLoader from "esri-loader";
import React, { Component } from "react";

import roadOcc from "../images/pin.png";

const CLUSTING = false;
let CENTER = "";
export default class Polymerization extends Component {
  constructor(props) {
    super(props);
    this.popup = this.props.popup;
    this.ref = null;
    this.spatialReferencevalue = `PROJCS["shanghaicity",GEOGCS["GCS_Beijing_1954",DATUM["D_Beijing_1954",SPHEROID["Krasovsky_1940",6378245.0,298.3]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",-3457147.81],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",121.2751921],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]`;
    this.url =
      "http://bigdata.cn.gov:9070/arcgis_js_v410_sdk/arcgis_js_api/library/4.10/dojo/dojo.js";
    this.ArcGisGraphic = null;
    this.featureLayers = {};
    this.gridRatio = 100;
    this.view = null;
    this.cameraModifyed = false;
    this.state = {
      mapReady: false,
    };
    this.pointsObj = [];
  }

  /**
   *
   * @param {[ { points:[{x:number,y:number}],popup:function(index):void,marks:{type:string,url:image,width:string,height:string} }]} datas
   */

  cluster(datas, clust = true) {
    console.log("clusting", clust, "ready", this.state.mapReady);
    if (!(this.state.mapReady && datas)) {
      return;
    }
    if (!clust) {
      for (let k in this.featureLayers) {
        this.featureLayers[k].visible = false;
      }
    }
    function defaultMarks() {
      var mark1 = {
        type: "picture-marker",
        url: roadOcc,
        width: "18px",
        height: "20px",
      };
      var mark11 = {
        type: "picture-marker",
        url: roadOcc,
        width: "24px",
        height: "27px",
      };
      var mark111 = {
        type: "picture-marker",
        url: roadOcc,
        width: "30px",
        height: "35px",
      };

      return [mark1, mark11, mark111];
    }

    let drawCluster = (grids, icon, feature = false) => {
      var marks = defaultMarks();
      marks = marks.map((e) => {
        return {
          ...e,
          url: icon || e.url,
          height: e.markSize ? e.width * e.markSize : e.height,
        };
      });
      var points = [];
      grids.forEach((e) => {
        var mark;
        if (e.clusterCount <= 0) {
          return;
        } else if (e.clusterCount < 5) {
          mark = marks[0];
        } else if (e.clusterCount < 50) {
          mark = marks[1];
        } else {
          mark = marks[2];
        }
        let p = new this.ArcGisGraphic({
          attributes: { ...e.attributes, count: e.clusterCount },
          geometry: {
            type: "point",
            x: e.x,
            y: e.y,
            spatialReference: this.spatialReferencevalue,
          },
          symbol: mark,
        });
        points.push(p);
      });
      if (feature) {
        const pinType = points[0].attributes.pinType;
        if (!this.featureLayers[pinType]) {
          const mainLayer = new this.ArcGisFeatureLayer({
            source: points,
            objectIdField: "OBJECTID",
            fields: [
              { name: "OBJECTID", type: "oid" },
              { name: "sbbh", type: "string" },
              { name: "name", type: "string" },
              { name: "type", type: "string" },
              { name: "address", type: "string" },
              { name: "pinType", type: "string" },
              { name: "state", type: "string" },
            ],
            geometryType: "point",
            renderer: {
              type: "simple",
              symbol: marks[0],
            },
          });
          this.map.add(mainLayer);
          this.featureLayers[pinType] = mainLayer;
        } else {
          this.featureLayers[pinType].visible = true;
        }
      } else {
        console.log(points, "points");
        this.view.graphics.addMany(points);
      }

      return points;
    };

    let clustPoints = (grids, pointsData) => {
      var webExtent = this.view.extent;
      pointsData.forEach((e, i) => {
        if (
          e.x <= webExtent.xmin ||
          e.x > webExtent.xmax ||
          e.y <= webExtent.ymin ||
          e.y > webExtent.ymax
        ) {
          return;
        }
        var xVal = e.x,
          yVal = e.y;
        for (var j = 0, jLen = grids.length; j < jLen; j++) {
          var cl = grids[j];
          if (
            e.x <= cl.extent.xmin ||
            e.x > cl.extent.xmax ||
            e.y <= cl.extent.ymin ||
            e.y > cl.extent.ymax
          ) {
            continue;
          }
          cl.x =
            cl.clusterCount > 0
              ? (xVal + cl.x * cl.clusterCount) / (cl.clusterCount + 1)
              : xVal;
          cl.y =
            cl.clusterCount > 0
              ? (yVal + cl.y * cl.clusterCount) / (cl.clusterCount + 1)
              : yVal;
          cl.attributes = e;
          cl.points.push([xVal, yVal, e]);
          cl.clusterCount++;

          break;
        }
      });
      return grids;
    };

    let generateGrid = () => {
      var xCount = Math.round(this.view.width / this.gridRatio);
      var yCount = Math.round(this.view.height / this.gridRatio);
      var xw = (this.view.extent.xmax - this.view.extent.xmin) / xCount;
      var yh = (this.view.extent.ymax - this.view.extent.ymin) / yCount;
      var gsxmin, gsxmax, gsymin, gsymax;
      var grids = [];
      for (var i = 0; i < xCount; i++) {
        gsxmin = this.view.extent.xmin + xw * i;
        gsxmax = gsxmin + xw;
        for (var j = 0; j < yCount; j++) {
          gsymin = this.view.extent.ymin + yh * j;
          gsymax = gsymin + yh;
          var ext = {
            xmin: gsxmin,
            xmax: gsxmax,
            ymin: gsymin,
            ymax: gsymax,
          };
          grids.push({
            extent: ext,
            clusterCount: 0,
            subTypeCounts: [],
            singles: [],
            points: [],
            x: 0,
            y: 0,
          });
        }
      }
      return grids;
    };

    let withoutCluster = (pointsData) => {
      return pointsData
        .filter(
          (e) =>
            e.x >= this.view.extent.xmin &&
            e.x < this.view.extent.xmax &&
            e.y >= this.view.extent.ymin &&
            e.y < this.view.extent.ymax
        )
        .map((e) => ({ ...e, attributes: e }));
    };

    console.log(datas);

    this.view.graphics.removeMany(this.pointsObj);
    this.pointsObj = [];
    for (let i = 0; i < datas.length; i++) {
      if (!datas[i].hide) {
        let e = datas[i];
        let pointsData;
        if (clust) {
          pointsData = clustPoints(generateGrid(), e.points);
        } else {
          pointsData = withoutCluster(e.points);
        }
        this.pointsObj = this.pointsObj.concat(
          drawCluster(pointsData, e.marks, !clust)
        );
      }
    }
  }

  resize() {
    // const x = 3840,
    //   y = 1080;
    // const mapdiv = document.getElementById("mapDiv");
    // const { height, width } = mapdiv.getBoundingClientRect();
    // mapdiv.style.width = `${width}px`;
    // mapdiv.style.height = `${height}px`;
    // mapdiv.style.transform = `scaleX(${x / width});scaleY(${y / height})`;
    // console.log("resize:", width, height);
  }

  componentDidUpdate() {
    this.cluster(this.props.datas, CLUSTING);
    if (this.props.camerainfo && this.view) {
      let { camerainfo } = this.props;
      console.log(camerainfo);
      this.view.center = new this.ArcGisPoint(camerainfo.center);
      this.view.zoom = camerainfo.zoom;
    }
  }

  componentDidMount() {
    console.log("didmount", this.view);
    window.getToken();

    esriLoader
      .loadModules(
        [
          "esri/config",
          "esri/views/MapView",
          "esri/Map",
          "esri/core/watchUtils",
          "esri/symbols/TextSymbol",
          "esri/geometry/Circle",
          "esri/identity/IdentityManager",
          "esri/geometry/SpatialReference",
          "esri/layers/FeatureLayer",
          "esri/layers/TileLayer",
          "esri/layers/MapImageLayer",
          "esri/geometry/Extent",
          "esri/geometry/Point",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/PictureMarkerSymbol",
          "esri/Graphic",
          "esri/PopupTemplate",
          "esri/renderers/ClassBreaksRenderer",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleLineSymbol",
          "esri/symbols/SimpleFillSymbol",
          "esri/Color",
          "esri/renderers/SimpleRenderer",
          "esri/views/2d/draw/Draw",
          "dojo",
          "esri/geometry/geometryEngine",
        ],
        { url: this.url }
      )
      .then(
        ([
          esriConfig,
          MapView,
          Map,
          watchUtils,
          TextSymbol,
          Circle,
          IdentityManager,
          SpatialReference,
          FeatureLayer,
          ArcGISTiledMapServiceLayer,
          ArcGISDynamicMapServiceLayer,
          Extent,
          Point,
          SimpleMarkerSymbol,
          PictureMarkerSymbol,
          Graphic,
          PopupTemplate,
          ClassBreaksRenderer,
          GraphicsLayer,
          SimpleLineSymbol,
          SimpleFillSymbol,
          Color,
          SimpleRenderer,
          Draw,
          dojo,
          geometryEngine,
        ]) => {
          this.ArcGisGraphic = Graphic;
          this.ArcGisPoint = Point;
          this.ArcGisFeatureLayer = FeatureLayer;
          let spatialReferencevalue = this.spatialReferencevalue;
          esriConfig.fontsUrl =
            "http://bigdata.cn.gov:9070/arcgisapi-master/fonts/arial-unicode-ms";
          // 定义地图
          this.map = new Map({});
          this.view = new MapView({
            container: "mapDiv",
            map: this.map,
            showLabels: true,
            center: [121.41802145766225, 31.21819924364435],
            extent: new Extent({
              type: "extent",
              xmax: 2116.0772399670277,
              xmin: -18203.963400114255,
              ymax: -16.55708170044818,
              ymin: -5731.568511723309,
              spatialReference: {
                wkt: spatialReferencevalue,
              },
            }),
            sliderPosition: "bottom-right",
            sliderOrientation: "horizontal",
            // sliderStyle:'small',
            zoom: 4,
          });
          //地图缩放结束事件
          this.map.on("zoom-end", function () {
            //弹出当前地图缩放比例值
            alert(this.map.getZoom());
          });

          var token = document.getElementById("txtToken").value;
          IdentityManager.registerToken({
            server: "http://map.cn.gov/OneMapServer/rest/services",
            token,
          });
          var tiledLayer = new ArcGISTiledMapServiceLayer({
            url:
              "http://map.cn.gov/OneMapServer/rest/services/DARK_MAP2/MapServer",
            id: "baseMap",
          });

          /**
           * 区界图层设置  QUJIE
           */
          const hwyRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-line", // autocasts as new SimpleLineSymbol()
              width: 4,
              color: [255, 255, 255, 1],
              style: "solid",
            },
          };
          // eslint-disable-next-line no-redeclare
          var QUJIE = new FeatureLayer({
            url:
              "http://map.cn.gov/OneMapServer/rest/services/BOUNDARY/FeatureServer/0",
            renderer: hwyRenderer,
            minScale: 0,
            maxScale: 0,
            title: "区界",
          });

          this.map.add(tiledLayer);
          this.map.add(QUJIE);

          this.view.ui.components = [];
          CENTER = this.view.center;
          CENTER.y += 1000;
          this.view.center = CENTER;
          console.log("center", CENTER);

          console.log("DID INITED");

          this.view.when(() => {
            // this.resize();
            this.cluster(this.props.datas, CLUSTING);
            ["drag", "mouse-wheel", "double-click"].forEach((e) => {
              this.view.on(e, (event) => {
                this.cameraModifyed = true;
              });
            });
            watchUtils.whenTrue(this.view, "stationary", () => {
              // this.resize(viewWidth/2, viewHeight/2);
              if (this.cameraModifyed) {
                console.log(this.view.zoom);
                this.cameraModifyed = false;
                if (CLUSTING) {
                  if (this.view.zoom === 9) {
                    this.cluster(this.props.data, false);
                  } else {
                    this.cluster(this.props.datas, true);
                  }
                }
                if (this.view.zoom < 4) {
                  this.view.zoom = 4;
                  this.view.center = CENTER;
                }
              }
            });

            this.view.popup.autoOpenEnabled = false;
            this.view.on("click", (e) => {
              console.log("click", e);
              this.view.hitTest(e).then((result) => {
                console.log(result);
                let objGraphic = result.results[0].graphic;
                let all = objGraphic.attributes;
                if (
                  all.NAME === "上海虹桥国际机场" ||
                  all === null ||
                  all.name === "外环高速公路" ||
                  all.name === "北新泾-青浦公路" ||
                  all.name === "上海-聂拉木公路" ||
                  all.name === "虹中路" ||
                  all.name === "金沙江西路" ||
                  all.BUSTYPE === "轨道交通" ||
                  all.objectid === 1
                ) {
                  return false;
                } else if (result.results.length > 0) {
                  window.postMessage(this.popup(all));
                  console.log("POSTED");
                }
              });
            });
            // this.view.on("resize", (e) => {
            //   console.log("resize", e);
            //   this.resize();
            // });

            this.view.ui.components = [];
            this.setState({ mapReady: true });
          });
        }
      );
  }

  render() {
    return <div ref={(m) => (this.ref = m)} id="mapDiv" {...this.props} />;
  }
}
