<template>
  <a-layout-header
    class="fixed-header flex-col"
    :style="{
      left: isCollapsed ? '60px' : '210px',
      width: isCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 210px)',
    }"
  >
    <div class="top-navbar flex-row">
      <menu-unfold-outlined
        v-if="isCollapsed"
        class="trigger"
        @click="handleCollapseClick"
      />
      <menu-fold-outlined v-else class="trigger" @click="handleCollapseClick" />
      <div class="fill-flex center-breadcrumb">首页</div>
      <div class="right-menu flex-row">
        <a-dropdown :trigger="['click']">
          <a class="menu-item flex-row" @click.prevent>
            <translation-outlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item
                @click="translationClick(1)"
                :disabled="language === 1"
              >
                中文
              </a-menu-item>
              <a-menu-item
                @click="translationClick(2)"
                :disabled="language === 2"
              >
                English
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-dropdown>
          <a class="user-item flex-row" @click.prevent>
            <a-avatar
              shape="circle"
              :size="36"
              src="/avatar.gif"
              :data-color="color"
            >
            </a-avatar>
            <div class="name">{{ username }}</div>
            <caret-down-outlined class="down-icon" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item> 个人中心 </a-menu-item>
              <a-menu-item> 设置 </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="logout"> 退出登录 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="tags-view-container flex-row"></div>
  </a-layout-header>
</template>
<script lang="ts" setup>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TranslationOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
const emits = defineEmits(["update:collapsed"]);
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});
const isCollapsed = ref(props.collapsed);
const language = ref(1);

const userList = ["Tom", "Uni", "Lucy", "Edward"];
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const username = sessionStorage.getItem("username");
const color = ref(colorList[0]);

const handleCollapseClick = () => {
  isCollapsed.value = !isCollapsed.value;
  emits("update:collapsed", isCollapsed.value);
};

const translationClick = (key: number) => {
  language.value = key;
  switch (key) {
    case 2:
      console.log("English");
      break;

    default:
      console.log("中文");
      break;
  }
};

const logout = () => {
  console.log("logout");
};
</script>
<style lang="less" scoped>
.fixed-header.ant-layout-header {
  position: fixed;
  left: 210px;
  right: 0;
  top: 0;
  z-index: 100;
  height: 86px;
  width: calc(100% - 200px);
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  transition: width 0.2s, left 0.2s;
  padding: 0;

  .top-navbar {
    flex: 0 0 50px;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
    align-items: center;

    .trigger {
      height: 100%;
      flex: 0 0 40px;
      padding: 15px 10px;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.45);
      transition: background-color 0.3s;

      &:hover {
        background-color: #f4f4f4;
      }
    }

    .center-breadcrumb {
      padding: 0 15px;
      overflow: hidden;
      color: #97a8be;
    }

    .right-menu {
      align-items: center;
      .menu-item {
        flex: 0 0 40px;
        width: 40px;
        height: 50px;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #999999;
        margin-right: 10px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #f4f4f4;
        }

        &.ant-dropdown-open {
          background-color: #f4f4f4;
        }
      }

      .user-item {
        height: 100%;
        padding: 0 10px;
        align-items: center;
        position: relative;
        transition: all 0.3s;

        &:hover {
          background-color: #f4f4f4;
        }

        &.ant-dropdown-open {
          background-color: #f4f4f4;
        }

        .avatar {
          height: 36px;
          width: 36px;
        }

        .name {
          padding-left: 10px;
          padding-right: 10px;
          color: #333333;
        }

        .down-icon {
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }

  .tags-view-container {
    flex: 0 0 36px;
    height: 36px;
  }
}
</style>
