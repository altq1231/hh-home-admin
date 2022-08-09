<template>
  <div class="home-page flex-col">
    <div class="home-header flex-row">
      <a-avatar shape="circle" :size="72" src="/avatar.gif"></a-avatar>
      <div class="fill-flex center-container flex-row">
        <div class="left-hello flex-col">
          <p class="user-info">{{ timeHello }} , {{ username }}</p>
          <p class="slogan">永远相信美好的事情即将发生！</p>
        </div>
        <div class="weather-container flex-row fill-flex">
          <div class="weather flex-col" v-for="weather in weatherInfo">
            <img
              :src="`/weather/${pinyin(weather?.dayweather, {
                toneType: 'none',
              })}.svg`"
              :alt="weather?.dayweather"
              class="weather-img"
            />

            <div class="day-weather">{{ weather?.dayweather }}</div>
            <div class="date">{{ weather?.date }}</div>
          </div>
        </div>
      </div>
      <div class="total-info flex-row">
        <div class="info-item flex-col">
          <p class="title">商品</p>
          <div class="num"><span class="val goods-text">100</span> 件</div>
        </div>
        <div class="info-item flex-col">
          <p class="title">视频</p>
          <div class="num"><span class="val video-text">100</span> 条</div>
        </div>
        <div class="info-item flex-col">
          <p class="title">音乐</p>
          <div class="num"><span class="val music-text">100</span> 首</div>
        </div>
      </div>
    </div>
    <div class="fill-flex bottom-map">
      <div id="mapContainer" class="map-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore：无法被执行的代码的错误
import { reactive, ref, onMounted } from "vue";
// @ts-ignore：无法被执行的代码的错误
import { GlobalStore } from "/@/store/common";
// @ts-ignore：无法被执行的代码的错误
import NProgress from "nprogress";
import { pinyin } from "pinyin-pro";

import {
  getWeather,
  getCityCode,
  getCityPosition,
  getLiveWeather,
  // @ts-ignore
} from "/@/service/help.js";
import {
  MenuOutlined,
  FileAddOutlined,
  FrownOutlined,
  FolderOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
// @ts-ignore
// import { location } from "../utils/location.js";
import { shallowRef } from "@vue/reactivity";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = shallowRef(null);

const timeHello = ref("早上好");
const username = sessionStorage.getItem("username");
const weatherInfo = ref([{ date: "", dayweather: "" }]);

const globalStore = GlobalStore();
const { pageData, absoluteData } = storeToRefs(globalStore);

// console.log(title.value);

const handleLoad = (data: any) => {};
const dragover = (e: any) => {
  // console.log("home------------", e);
  e.preventDefault();
};

const handleAbsoluteData = (aData: any) => {
  console.log(aData);
  return JSON.stringify(aData);
};

const handleClick = () => {
  NProgress.set(0.5);
};

const city = ref("");
const cityCode = ref("");

// 实验性功能 获取地理位置
const getLocation = () => {
  let geolocation: any;
  AMapLoader.load({
    key: "54b93b6d2c88621a41007c06b9e4781f", //设置您的key
    version: "2.0",
    plugins: ["AMap.ToolBar", "AMap.Driving"],
    AMapUI: {
      version: "1.1",
      plugins: [],
    },
    Loca: {
      version: "2.0.0",
    },
  })
    .then((AMap) => {
      map.value = new AMap.Map("mapContainer", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 5, //初始化地图级别
        center: [105.602725, 37.076636], //初始化地图中心点位置
      });

      // @ts-ignore
      AMap.plugin(["AMap.Geolocation"], function () {
        geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量
          offset: [10, 20],
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          position: "RB",
        });
      });

      geolocation.getCurrentPosition(function (status: any, result: any) {
        if (status == "complete") {
          console.log("获取到的位置", result);
        } else {
          console.error(result);
        }
      });

      console.log(11111, geolocation);
      // @ts-ignore
      map.value.addControl(geolocation);
    })
    .catch((e) => {
      console.log(e);
    });
};

const initMap = () => {
  AMapLoader.load({
    key: "54b93b6d2c88621a41007c06b9e4781f", //设置您的key
    version: "2.0",
    plugins: ["AMap.ToolBar", "AMap.Driving"],
    AMapUI: {
      version: "1.1",
      plugins: [],
    },
    Loca: {
      version: "2.0.0",
    },
  })
    .then((AMap) => {
      map.value = new AMap.Map("mapContainer", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 10, //初始化地图级别
        // center: [105.602725, 37.076636], //初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(async () => {
  const cityPosition = await getCityPosition();
  // @ts-ignore
  const adCode = await getCityCode(cityPosition.city);
  const tempInfo = await getWeather(adCode.data.adCode);
  const liveInfo = await getLiveWeather(adCode.data.adCode);
  // @ts-ignore
  weatherInfo.value = tempInfo.forecasts[0].casts;
  await initMap();

  console.log(weatherInfo.value, liveInfo);
});
</script>
<style scoped lang="less">
.home-page {
  width: 100%;
  height: calc(100vh - 144px);

  .home-header {
    padding: 0 15px;
    background: #ffffff;
    flex: 0 0 102px;
    transition: all 0.3s;
    align-items: center;
    .center-container {
      padding: 0 15px;

      .left-hello {
        flex: 0 0 auto;
        justify-content: center;

        p {
          margin-bottom: 0;
        }

        .user-info {
          font-size: 16px;
          color: #333333;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .slogan {
          font-size: 16px;
          color: #666;
        }
      }
      .weather-container {
        padding: 0 15px;

        .weather {
          flex: 0 0 120px;
          padding: 0 5px;

          .weather-img {
            flex: 0 0 40px;
            height: 40px;
          }

          .day-weather {
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            line-height: 22px;
            margin: 3px 0;
          }

          .date {
            font-size: 14px;
            color: #999999;
            text-align: center;
            line-height: 22px;
          }
        }
      }
    }

    .total-info {
      flex: 0 0 auto;
      height: 100%;
      .info-item {
        height: 100%;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
        margin-right: 30px;

        .title {
          font-size: 14px;
          color: #999999;
          line-height: 20px;
          margin-bottom: 8px;
        }

        .num {
          align-items: center;
          justify-content: flex-end;
          font-size: 14px;
          color: #999999;

          .val {
            font-size: 25px;
            font-weight: 700;
            color: #000;

            &.goods-text {
              color: #fba414;
            }
            &.video-text {
              color: #1ba784;
            }
            &.music-text {
              color: #f1939c;
            }
          }
        }
      }
    }
  }
  .bottom-map {
    margin: 15px 15px 0;
    background: #ffffff;
    padding: 10px;
    border-radius: 2px;
    .map-container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
