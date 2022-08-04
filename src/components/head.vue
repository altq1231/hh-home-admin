<template>
  <a-layout-header
    class="fixed-header"
    :style="{
      left: isCollapsed ? '60px' : '200px',
      width: isCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 200px)',
    }"
  >
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="handleCollapseClick"
    />
    <menu-fold-outlined v-else class="trigger" @click="handleCollapseClick" />
  </a-layout-header>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const emits = defineEmits(["changeCollapse"]);
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});
const isCollapsed = ref(false);

const handleCollapseClick = () => {
  isCollapsed.value = !isCollapsed.value;
  emits("changeCollapse", isCollapsed.value);
};
</script>
<style lang="less" scoped>
.fixed-header.ant-layout-header {
  position: fixed;
  left: 200px;
  right: 0;
  top: 0;
  height: 80px;
  width: calc(100% - 200px);
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: width 0.2s, left 0.2s;
}
</style>
