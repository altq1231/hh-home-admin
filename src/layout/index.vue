<template>
  <a-layout class="basic-layout">
    <left-side :collapsed="collapsed"></left-side>
    <a-layout
      class="inner-layout"
      :style="{ marginLeft: collapsed ? '60px' : '210px' }"
    >
      <Head class="fixed-header" v-model:collapsed="collapsed"></Head>
      <a-layout-content class="bottom-main-container">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in" appear>
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
import { ref } from "vue";
// @ts-ignore
import Head from "./components/head.vue";
// @ts-ignore
import LeftSide from "./components/LeftSide.vue";

const collapsed = ref<boolean>(false);
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  &.ant-layout {
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  }

  .inner-layout {
    margin-left: 210px;
    transition: margin-left 0.2s;
    flex: 1;

    .bottom-main-container {
      margin-top: 86px;
      width: 100%;
      transition: width 0.2s, margin 0.2s;
      overflow: hidden;
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
