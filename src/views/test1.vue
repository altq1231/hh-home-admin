<template>
  <div class="home">
    <test-com :msg="info" title="Parent Title"></test-com>
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册
// @ts-ignore
import TestCom from "/@/components/TestCom.vue";
let info = "父组件 Info";
</script>
