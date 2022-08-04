<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
  <a-button @click="drawerVisible = !drawerVisible" class="route-link">
    <template #icon><setting-two-tone two-tone-color="#0a7aff" /></template>
  </a-button>
  <a-drawer
    v-model:visible="drawerVisible"
    class="custom-class"
    title="Config"
    placement="right"
  >
    <a-space>
      <router-link to="/">home</router-link>
      <router-link to="/test">test</router-link>
    </a-space>
  </a-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { SettingTwoTone } from "@ant-design/icons-vue";
const drawerVisible = ref(false);
</script>

<style lang="less">
.route-link {
  position: fixed;
  top: 140px;
  right: 2px;
  z-index: 500;
}
@import url(./style/global.less);
</style>
