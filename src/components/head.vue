<template>
  <div
    class="layout-header container-wrapper"
    :class="{ 'fixed-header': fixedHeader }"
  >
    <div class="header-container container flex-row">
      <div class="logo flex-row">
        <router-link to="/" class="logo-link">
          <svg
            viewBox="0 0 128 128"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="画板-带底色"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <rect
                fill="#0A7AFF"
                x="0"
                y="0"
                rx="30"
                ry="30"
                width="128"
                height="128"
              ></rect>
              <path
                d="M95.6636867,46.7399509 C95.8873034,47.8133108 96,48.9068131 96,50.003219 L96,78.6494839 C96,87.4860399 88.836556,94.6494839 80,94.6494839 C78.9035941,94.6494839 77.8100918,94.5367872 76.7367319,94.3131706 L48,88.3263514 L48,40.3263514 L76.7367319,34.3395323 C85.3875472,32.5372791 93.8614335,38.0891356 95.6636867,46.7399509 Z M42,40.3263514 L42,88.3263514 L34,88.3263514 C32.8954305,88.3263514 32,87.4309209 32,86.3263514 L32,42.3263514 C32,41.2217819 32.8954305,40.3263514 34,40.3263514 L42,40.3263514 Z M84,45.3263514 L58,45.3263514 C57.4871642,45.3263514 57.0644928,45.7123916 57.0067277,46.2097303 L57,46.3263514 L57,52.3263514 C57,52.8391873 57.3860402,53.2618586 57.8833789,53.3196237 L58,53.3263514 L73,53.3263514 L57.4091366,73.7893597 C57.1816494,74.0879367 57.0435501,74.4434388 57.0087358,74.8146955 L57,75.0014461 L57,81.3263514 C57,81.8391873 57.3860402,82.2618586 57.8833789,82.3196237 L58,82.3263514 L84,82.3263514 C84.5128358,82.3263514 84.9355072,81.9403113 84.9932723,81.4429726 L85,81.3263514 L85,75.3263514 C85,74.8135156 84.6139598,74.3908443 84.1166211,74.3330792 L84,74.3263514 L68,74.3263514 L84.5544897,53.8766876 C84.8067011,53.5651325 84.9586364,53.186079 84.9926794,52.7892862 L85,52.6182912 L85,46.3263514 C85,45.7740667 84.5522847,45.3263514 84,45.3263514 Z"
                id="形状结合"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
        </router-link>
      </div>
      <nav class="nav-menu flex-row fill-flex">
        <div class="menu-item">
          <router-link to="/shop">商城</router-link>
        </div>
        <div class="menu-item">
          <router-link to="/music">音乐室</router-link>
        </div>
        <div class="menu-item">
          <router-link to="/video">放映室</router-link>
        </div>
      </nav>
      <nav class="login-box flex-row">
        <a class="user-name">{{ username || "登录" }}</a>
        <span class="center-line">|</span>
        <a class="user-name">{{ username ? "退出" : "注册" }}</a>
      </nav>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
const username = ref("");
const fixedHeader = ref(false);

let oldScrollTop: number = 0; // 记录上一次滚动结束后的滚动距离
const scrollTop = ref<number>(0); // 记录当前的滚动距离
const scrollFixedStatus = ref<boolean>(true);

const handleScroll = () => {
  window.addEventListener("scroll", () => {
    scrollTop.value = window.scrollY;
    if (scrollTop.value >= 65) {
      fixedHeader.value = true;
    } else {
      fixedHeader.value = false;
    }
    // console.log(fixedHeader.value);
  });
};
onMounted(() => {
  handleScroll();
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", () => {}); // 离开当前组件别忘记移除事件监听
});
watch(
  () => scrollTop.value,

  (newValue, oldValue) => {
    setTimeout(() => {
      if (newValue === window.scrollY) {
        // 延时执行后当newValue等于window.scrollY，代表滚动结束
        // console.log("滚动结束");
        oldScrollTop = newValue; // 每次滚动结束后都要给oldScrollTop赋值
        // scrollFixedStatus.value = true;
      }
    }, 20); // 必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
    if (oldScrollTop === oldValue) {
      scrollFixedStatus.value = false;
      // 每次滚动开始时oldScrollTop与oldValue相等
      // console.log("滚动开始");
    }
  }
);
</script>
<style lang="less" scoped>
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 65px;
  color: @text-color;
  overflow: hidden;
  transition: background-color 0.5s ease;

  &.fixed-header {
    background-color: rgba(0, 0, 0, 0.65);
    -webkit-backdrop-filter: saturate(180%) blur(1rem);
    backdrop-filter: saturate(180%) blur(1rem);
  }
  .header-container {
    height: 100%;
    position: relative;
    align-items: center;
    .logo {
      align-items: center;
      justify-content: center;

      .logo-link {
        height: 34px;

        svg {
          height: 100%;
        }
      }
    }

    .nav-menu {
      margin: 0 100px;
      .menu-item {
        &:nth-child(n + 2) {
          margin-left: 25px;
        }

        &:nth-last-child(n + 2) {
          margin-right: 25px;
        }

        a {
          color: #ffffff;
          font-size: 18px;
          transition: color 0.3s;

          &:hover {
            color: @primary-color;
          }
        }

        &.active {
          a {
            color: @primary-color;
          }
        }
      }
    }

    .login-box {
      height: 100%;
      align-items: center;
      justify-content: center;
      color: #ffffff;

      .user-name {
        font-size: 14px;
        line-height: 24px;
        color: #ffffff;
        max-width: 75px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        font-weight: 400;

        &:hover {
          color: @primary-color;
        }
      }

      .center-line {
        font-size: 14px;
        margin: 0 25px;
      }
    }
  }
}
</style>
