<template>
  <a-menu
    class="side-menu"
    @click="handleMenuClick"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
  >
    <a-menu-item key="/">
      <template #icon>
        <home-outlined />
      </template>
      <span> 首页 </span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #icon>
        <shop-outlined />
      </template>
      <template #title>商城管理</template>
      <a-menu-item key="/shop-manage">
        <template #icon>
          <dashboard-outlined />
        </template>
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="/goods-manage">
        <template #icon>
          <shopping-outlined />
        </template>
        <span>商品管理</span>
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #icon>
        <video-camera-outlined />
      </template>
      <template #title>视频库管理</template>
      <a-menu-item key="/video-dashboard">
        <template #icon>
          <dashboard-outlined />
        </template>
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="/video-manage">
        <template #icon>
          <play-square-outlined />
        </template>
        <span>视频管理</span>
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <template #icon>
        <shop-outlined />
      </template>
      <template #title>曲库管理</template>
      <a-menu-item key="/music-dashboard">
        <template #icon>
          <customer-service-outlined />
        </template>
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="/music-manage">
        <template #icon>
          <play-circle-outlined />
        </template>
        <span>音乐管理</span>
      </a-menu-item>
    </a-sub-menu>
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
  DashboardOutlined,
  PlusOutlined,
  PlaySquareOutlined,
  ShoppingOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();
const openKeys = ["sub1", "sub2", "sub3"];
const selectedKeys = ref<string[]>([router.currentRoute.value.path]);

const handleMenuClick = ({ key }: any) => {
  // console.log(key);
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: key,
  });
};

router.beforeEach((to, from) => {
  selectedKeys.value = [to.path];
});
</script>
<style lang="less"></style>
