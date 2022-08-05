<template>
  <a-menu
    class="side-menu"
    @click="handleMenuClick"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
  >
    <a-menu-item key="/">
      <template #icon>
        <home-outlined />
      </template>
      <span> 首页 </span>
    </a-menu-item>
    <a-menu-item key="/shop-manage">
      <template #icon>
        <shop-outlined />
      </template>
      <span>商城管理</span>
    </a-menu-item>
    <a-menu-item key="/video-manage">
      <template #icon>
        <video-camera-outlined />
      </template>
      <span>视频管理</span>
    </a-menu-item>
    <a-menu-item key="/music-manage">
      <template #icon>
        <customer-service-outlined />
      </template>
      <span>音乐管理</span>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  CustomerServiceOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();
const selectedKeys = ref<string[]>(["/"]);

const handleMenuClick = ({ key }: any) => {
  // console.log(key);
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: key,
  });
};
</script>
<style lang="less" scoped></style>
