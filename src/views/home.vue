<template>
  <div class="home-page container-wrapper">
    <Head></Head>
    home
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore：无法被执行的代码的错误
import { reactive, ref } from "vue";
// @ts-ignore：无法被执行的代码的错误
import { GlobalStore } from "/@/store/common";
// @ts-ignore：无法被执行的代码的错误
import NProgress from "nprogress";
import {
  MenuOutlined,
  FileAddOutlined,
  FrownOutlined,
  FolderOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
// @ts-ignore：无法被执行的代码的错误
import Head from "/@/components/head.vue";

const isBomb = reactive({ value: false });
const title = ref("test  sa aa");

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
</script>
<style scoped lang="less">
.home-page {
  width: 100%;

  .test-div {
    width: 200px;
    height: 1600px;
    margin-left: 250px;
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  }

  .banner-container {
    width: 100%;

    .banner {
      width: 100%;
    }
  }

  .box-wrapper {
    flex-wrap: wrap;

    .flex-item {
      flex: 0 0 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 18px;
      text-align: center;
      line-height: 32px;

      &:hover {
        background-color: @primary-color;
      }
    }
  }
}
</style>
