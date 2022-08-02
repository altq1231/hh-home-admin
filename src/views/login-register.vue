<template>
  <div class="login-page">login</div>
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
</script>
<style scoped lang="less">
.login-page {
  width: 100%;
}
</style>
