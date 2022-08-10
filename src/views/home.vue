<template>
  <div class="home-page flex-col">
    <div class="home-header flex-row">
      <a-avatar
        class="left-avatar"
        shape="circle"
        :size="72"
        src="/avatar.gif"
      ></a-avatar>
      <div class="fill-flex center-container flex-row">
        <div class="left-hello flex-col">
          <p class="user-info">{{ timeHello }} , {{ username }}</p>
          <p class="slogan">永远相信美好的事情即将发生！</p>
        </div>
        <div class="fill-flex weather-info">
          <transition-group
            name="weather-slide"
            tag="div"
            class="weather-container flex-row"
          >
            <div
              v-for="(weather, index) in weatherInfo.slice(0, 4)"
              class="weather flex-col"
              :style="{ transitionDelay: index * 0.2 + 's' }"
              :key="weather.date"
            >
              <img
                :src="
                  weather?.dayweather ? handleWeather(weather.dayweather) : ''
                "
                :alt="weather.dayweather"
                class="weather-img"
              />

              <div class="day-weather">
                {{ weather.dayweather }}
              </div>
              <div class="date">
                {{ weather.date }}
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="total-info flex-row">
        <div class="info-item flex-col">
          <p class="title">商品</p>
          <div class="num flex-row">
            <div class="val goods-text">
              <NumScroll :num="num" :size="40" :font-size="20"></NumScroll>
            </div>
            件
          </div>
        </div>
        <div class="info-item flex-col">
          <p class="title">视频</p>
          <div class="num flex-row">
            <div class="val video-text">
              <NumScroll :num="num" :size="40" :font-size="20"></NumScroll>
            </div>
            条
          </div>
        </div>
        <div class="info-item flex-col">
          <p class="title">音乐</p>
          <div class="num flex-row">
            <div class="val music-text">
              <NumScroll :num="num" :size="40" :font-size="20"></NumScroll>
            </div>
            首
          </div>
        </div>
      </div>
    </div>
    <div class="latest-developments flex-row">
      <div class="fill-flex left-developments">
        <div class="card-title flex-row">
          <div class="fill-flex title">最新动态</div>
          <router-link to="/">查看更多</router-link>
        </div>
        <div class="operation-records-container">
          <transition-group
            name="records-slide"
            tag="div"
            class="developments-container"
          >
            <div
              class="developments-item flex-row"
              v-for="(item, index) in operationRecords.slice(0, 6)"
              :style="{ transitionDelay: index * 0.3 + 's' }"
              :key="'info' + index"
            >
              <img class="type-img" :src="handleType(item)" />
              <div class="flex-col fill-flex right-infos-container">
                <div class="infos">
                  {{
                    item.operationType +
                    " " +
                    item.manageType +
                    " " +
                    item.operationObj
                  }}
                </div>
                <div class="date">
                  {{ computedHowLongAgo(item.operationDate) }}
                </div>
              </div>
            </div>
          </transition-group>
          <div
            class="no-developments flex-col"
            v-if="operationRecords.length <= 0"
          >
            <img class="no-data-img" src="../assets/web404.svg" />
            <p class="no-data-text">暂无数据</p>
          </div>
        </div>
      </div>
      <div class="right-illustration">
        <!-- <img src="/avatar.gif" alt="avatar" class="illustration" /> -->
      </div>
    </div>
    <div class="bottom-map">
      <div id="mapContainer" class="map-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { pinyin } from "pinyin-pro";
// @ts-ignore
import {
  getWeather,
  getCityCode,
  getCityPosition,
  getOperationRecord,
  // @ts-ignore
} from "/@/service/help.js";
import {
  MenuOutlined,
  FileAddOutlined,
  FrownOutlined,
  FolderOutlined,
} from "@ant-design/icons-vue";
import { shallowRef } from "@vue/reactivity";
import AMapLoader from "@amap/amap-jsapi-loader";
// @ts-ignore
import NumScroll from "/@/components/num-scroll.vue";
// @ts-ignore
import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "%s之后",
    past: "%s之前",
    s: "几秒钟",
    ss: "%d",
    m: "1分钟",
    mm: "%d分钟",
    h: "1小时",
    hh: "%d小时",
    d: "1天",
    dd: "%d天",
    M: "1个月",
    MM: "%d月",
    y: "1年",
    yy: "%d年",
  },
});

interface WeatherInfo {
  date: string;
  dayweather: string;
}

interface OperationRecordItem {
  userId: String;
  operationDate: Date;
  manageType: "shop" | "video" | "music";
  operationType: "add" | "delete" | "update";
  operationObj: String;
}

const weatherArr = [
  "bingbao",
  "daxue",
  "dayu",
  "duoyun",
  "leizhenyu",
  "longjuanfeng",
  "qing",
  "shachenbao",
  "taifeng",
  "wu",
  "wumai",
  "xiaoxue",
  "xiaoyu",
  "xiaoyu",
  "yangchen",
  "yin",
  "yujiaxue",
  "zhenxue",
  "zhenyu",
  "zhongxue",
  "zhongyu",
];

const handleWeather = (dayWeather: string) => {
  const pinyinAll = pinyin(dayWeather, {
    toneType: "none",
    type: "string",
  }).replace(/\s*/g, "");

  let temp = "";

  if (weatherArr.includes(pinyinAll)) {
    temp = `/weather/${pinyinAll}.svg`;
  } else {
    temp = "/weather/qing.svg";
  }

  return temp;
};

const timeHello = computed(() => {
  // 获取当前时间
  const timeNow = new Date();
  // 获取当前小时
  const hours = timeNow.getHours();
  // 设置默认文字
  let text = ``;
  // 判断当前时间段
  if (hours >= 0 && hours <= 6) {
    text = `凌晨好`;
  } else if (hours > 6 && hours <= 10) {
    text = `上午好`;
  } else if (hours > 10 && hours <= 14) {
    text = `中午好`;
  } else if (hours > 14 && hours <= 18) {
    text = `下午好`;
  } else if (hours > 18 && hours <= 24) {
    text = `晚上好`;
  }
  // 返回当前时间段对应的状态
  return text;
});
const username = sessionStorage.getItem("username");
const weatherInfo = ref([] as WeatherInfo[]);
const operationRecords = ref([] as OperationRecordItem[]);

const num = ref("0");

const handleAbsoluteData = (aData: any) => {
  console.log(aData);
  return JSON.stringify(aData);
};

const handleType = (item: OperationRecordItem) => {
  if (item.manageType === "music") {
    return "/music-m.svg";
  } else if (item.manageType === "video") {
    return "/video-m.svg";
  } else {
    return "/goods-m.svg";
  }
};

const computedHowLongAgo = (time: Date) => {
  return moment().to(moment(time).format("YYYY-MM-DD HH:mm:ss"));
};

const city = ref("");
const cityCode = ref("");
let map = shallowRef({} as any);

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
        // center: [105.602725, 37.076636], //初始化地图中心点位置
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
        // mapStyle: "amap://styles/c558c633a5c36003169dbcc6c0bdd432",
        // center: [105.602725, 37.076636], //初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log("加载高德地图错误", e);
    });
};

onMounted(async () => {
  const cityPosition: any = await getCityPosition();

  const adCode: any = await getCityCode(cityPosition.city);
  let tempInfo: any;

  if (adCode.state) {
    tempInfo = await getWeather(adCode.data.adCode);
  } else {
    tempInfo = await getWeather(110000);
  }

  weatherInfo.value = tempInfo.forecasts[0].casts;
  await initMap();

  const recordsData = await getOperationRecord(sessionStorage.getItem("_id"));

  operationRecords.value = recordsData.data;

  setTimeout(() => {
    num.value = "100";
  }, 1000);
});
</script>
<style scoped lang="less">
.home-page {
  width: 100%;
  min-height: calc(100vh - 144px);

  .home-header {
    padding: 0 15px;
    background: #ffffff;
    flex: 0 0 102px;
    transition: all 0.3s;
    align-items: center;
    .left-avatar {
      flex: 0 0 72px;
      width: 72px;
      height: 72px;
    }

    .center-container {
      transition: all 0.3s;
      .left-hello {
        padding-left: 15px;
        flex: 0 0 auto;
        justify-content: center;

        p {
          margin-bottom: 0;
        }

        .user-info {
          transition: all 0.3s;
          font-size: 16px;
          color: #333333;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .slogan {
          transition: all 0.3s;
          font-size: 16px;
          color: #666;
        }
      }

      .weather-info {
        height: 90px;
      }
      .weather-container {
        padding-left: 15px;
        transition: all 0.3s;

        .weather {
          width: 120px;
          transition: all 0.3s;
          padding: 0 5px;

          .weather-img {
            flex: 0 0 40px;
            height: 40px;
            user-select: none;
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
      height: 100px;
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
          align-items: flex-end;
          justify-content: flex-end;
          font-size: 14px;
          color: #999999;
          transition: all 0.3s;

          .val {
            font-size: 25px;
            font-weight: 700;
            color: #000;
            transition: all 0.3s;
            padding-right: 5px;

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
  .card-title {
    height: 50px;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1px solid @border-color-base;

    .title {
      font-size: 18px;
      color: #000;
    }
  }

  .latest-developments {
    flex: 0 0 auto;
    padding: 0 15px;
    margin-top: 15px;
    transition: all 0.3s;

    .left-developments {
      background-color: #ffffff;
      transition: all 0.3s;
      .operation-records-container {
        transition: all 0.3s;
      }
      .no-developments {
        width: 100%;
        padding: 15px;
        align-items: center;
        justify-content: center;
        padding: 15px;

        .no-data-img {
          width: 120px;
          user-select: none;
        }

        .no-data-text {
          font-size: 14px;
          color: #999999;
          margin-bottom: 0;
          margin-top: 15px;
        }
      }

      .developments-container {
        padding: 15px;
        transition: all 0.2s;
        .developments-item {
          transition: all 0.2s;
          align-items: center;
          border-bottom: 1px solid @border-color-split;
          padding: 10px 0;

          &:last-child {
            border-bottom: none;
          }

          .type-img {
            flex: 0 0 40px;
            width: 40px;
          }

          .right-infos-container {
            padding-left: 15px;

            .infos {
              font-size: 16px;
              font-weight: 700;
              line-height: 26px;
            }

            .date {
              font-size: 14px;
              color: #999999;
              line-height: 22px;
              margin-top: 5px;
            }
          }
        }
      }
    }

    .right-illustration {
      transition: all 0.3s;
      margin-left: 15px;
      background-color: #ffffff;
      flex: 0 0 360px;
      background: url(../assets/avatar.gif) center no-repeat;
      background-size: cover;
    }
  }
  .bottom-map {
    margin: 15px 15px 0;
    background: #ffffff;
    padding: 10px;
    border-radius: 2px;
    height: 500px;
    .map-container {
      width: 100%;
      height: 100%;
    }
  }
}

@media screen and (max-width: 1260px) {
  .home-page {
    .home-header {
      flex: 0 0 auto;
      flex-direction: column;

      .center-container {
        flex-direction: column;

        .left-hello {
          padding: 15px 0;
          .user-info {
            text-align: center;
          }

          .slogan {
            text-align: center;
          }
        }
        .weather-container {
          padding-left: 0;
        }
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .home-page {
    .latest-developments {
      flex-direction: column;

      .right-illustration {
        margin-left: 0;
        margin-top: 15px;
      }
    }
  }
}

@media screen and (max-width: 570px) {
  .home-page {
    .home-header {
      .center-container {
        .weather-container .weather {
          width: 102px;
        }
      }
    }
  }
}
</style>
