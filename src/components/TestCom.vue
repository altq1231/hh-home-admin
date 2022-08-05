<template>
  <div class="test1-page">
    <p>信息:{{ msg }}</p>
    <p>{{ title }}</p>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  msg: {
    type: String,
    default: "----",
  },
  title: {
    type: String,
    default: "Title",
  },
});
</script>
<style lang="less" scoped>
.test1-page {
  padding: 50px 100px;
}
</style>
