<template>
  <a-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </a-config-provider>
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
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
const locale = ref(zhCN);
const drawerVisible = ref(false);
</script>

<style lang="less">
.route-link.ant-btn {
  position: fixed;
  top: 52px;
  right: 2px;
  z-index: 500;
}
</style>
