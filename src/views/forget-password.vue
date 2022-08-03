<template>
  <div class="home-page container-wrapper">forget password</div>
</template>

<script lang="ts" setup>
// @ts-ignore：无法被执行的代码的错误
import { reactive, ref } from "vue";
// @ts-ignore：无法被执行的代码的错误
import { GlobalStore } from "/@/store/common";
</script>
<style scoped lang="less">
.home-page {
  width: 100%;
  height: 1600px;
  .test-div {
    width: 200px;
    height: 1600px;
    margin-left: 250px;
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  }

  .banner-container {
    width: 100%;

    .banner {
      width: 100%;
    }
  }

  .box-wrapper {
    flex-wrap: wrap;

    .flex-item {
      flex: 0 0 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 18px;
      text-align: center;
      line-height: 32px;

      &:hover {
        background-color: @primary-color;
      }
    }
  }
}
</style>
