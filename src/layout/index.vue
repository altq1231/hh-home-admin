<template>
  <a-layout class="basic-layout">
    <a-layout-sider
      class="fixed-side"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :collapsedWidth="60"
    >
      <div class="logo">logo</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout
      class="inner-layout"
      :style="{ marginLeft: collapsed ? '60px' : '200px' }"
    >
      <Head class="fixed-header" @changeCollapse="handleCollapse"></Head>
      <a-layout-content class="bottom-main-container">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        hh home ©2022 Created by Altq
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
// @ts-ignore
import Head from "/@/components/head.vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);

//router是全局路由对象，route= userRoute()是当前路由对象
let router = useRouter();

const logout = () => {
  sessionStorage.removeItem("jwt");
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: "/login",
  });
};

const goToPage = (path: string) => {
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: path,
  });
};

const state = reactive({
  transitionName: "slide-left",
});

router.beforeEach((to, from) => {
  // if (to.meta.index > from.meta.index) {
  //   console.log(1);
  //   state.transitionName = "slide-left"; // 向左滑动
  // } else if (to.meta.index < from.meta.index) {
  //   // 由次级到主级
  //   console.log(2);
  //   state.transitionName = "slide-right";
  // } else {
  //   state.transitionName = ""; // 同级无过渡效果
  // }
});
const handleCollapse = (val: boolean) => {
  console.log(val);
  collapsed.value = val;
};
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;

  .fixed-side {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    overflow: auto;
  }

  .inner-layout {
    margin-left: 200px;
    transition: margin-left 0.2s;
    flex: 1;
    min-height: calc(100vh - 80px);

    .bottom-main-container {
      background-color: #ffffff;
      margin-top: 100px;
      margin-left: 20px;
      margin-right: 20px;
      width: calc(100% - 40px);
      transition: width 0.2s, margin 0.2s;
      overflow: hidden;
      min-height: calc(100vh - 100px);
    }
  }

  .footer {
    padding: 0 20px;
    font-size: 12px;
    color: #999999;
    line-height: 18px;
    text-align: center;
    height: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
