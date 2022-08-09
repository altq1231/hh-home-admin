<template>
  <a-layout-sider
    class="fixed-side"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :width="210"
    :collapsedWidth="60"
  >
    <div class="inner-side flex-col">
      <side-logo class="side-logo" :collapse="collapsed"></side-logo>
      <side-menu></side-menu>
    </div>
  </a-layout-sider>
</template>
<script lang="ts" setup>
// @ts-ignore
import SideLogo from "./SideLogo.vue";
// @ts-ignore
import SideMenu from "./SideMenu.vue";
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less" scoped>
.fixed-side.ant-layout-sider {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  overflow: auto;
  background-color: #ffffff;

  .inner-side {
    height: 100%;
    overflow: hidden;

    .side-logo {
      flex: 0 0 50px;
      height: 50px;
    }
    .side-menu {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #ffffff;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(163, 169, 204, 0.8);
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb:decrement {
        border-width: 3px;
        border-color: transparent;
      }

      &::-webkit-scrollbar-thumb:increment {
        border-width: 3px;
        border-color: transparent;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgba(163, 169, 204, 1);
      }

      &::-webkit-scrollbar-corner {
        background-color: #ffffff;
      }

      :deep(.ant-menu-item .ant-menu-item-icon),
      :deep(.ant-menu-submenu-title .ant-menu-item-icon),
      :deep(.ant-menu-item .anticon),
      :deep(.ant-menu-submenu-title .anticon) {
        font-size: 16px;
        min-width: 16px;
        line-height: 36px;
        vertical-align: 0;
        display: flex;
        align-items: center;
        height: 36px;
      }
    }
  }
}
</style>
