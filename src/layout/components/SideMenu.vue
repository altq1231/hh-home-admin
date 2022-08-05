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
import { ref, onMounted } from "vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  CustomerServiceOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

const selectedKeys = ref<string[]>(["/"]);

const handleMenuClick = ({ key }: any) => {
  console.log(key);
};
</script>
<style lang="less" scoped></style>
