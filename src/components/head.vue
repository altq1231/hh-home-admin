<template>
  <a-layout-header
    class="fixed-header flex-col"
    :style="{
      left: isCollapsed ? '60px' : '200px',
      width: isCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 200px)',
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
            <div class="name">{{ avatarValue }}</div>
            <caret-down-outlined class="down-icon" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item> 个人中心 </a-menu-item>
              <a-menu-item> 设置 </a-menu-item>
              <a-menu-item @click="changeValue"> 随机名字 </a-menu-item>
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

const userList = ["U", "Lucy", "Tom", "Edward"];
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const avatarValue = ref(userList[0]);
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
const changeValue = () => {
  const index = userList.indexOf(avatarValue.value);
  avatarValue.value =
    index < userList.length - 1 ? userList[index + 1] : userList[0];
  color.value =
    index < colorList.length - 1 ? colorList[index + 1] : colorList[0];
};

const logout = () => {
  console.log("logout");
};
</script>
<style lang="less" scoped>
.fixed-header.ant-layout-header {
  position: fixed;
  left: 200px;
  right: 0;
  top: 0;
  height: 90px;
  width: calc(100% - 200px);
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: width 0.2s, left 0.2s;
  padding: 0;

  .top-navbar {
    flex: 0 0 50px;
    height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    padding: 0 15px;
    align-items: center;

    .trigger {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.45);
      transition: color 0.3s;

      &:hover {
        color: rgba(0, 0, 0, 0.85);
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

        &:hover {
          color: @primary-color;
        }

        &.ant-dropdown-open {
          color: @primary-color;
        }
      }

      .user-item {
        height: 100%;
        padding: 0 10px;
        align-items: center;
        position: relative;
        transition: all 0.3s;

        &:hover {
          background-color: #f6f6f6;
        }

        &.ant-dropdown-open {
          background-color: #f6f6f6;
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
}
</style>
