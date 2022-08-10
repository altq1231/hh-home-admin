<template>
  <div class="music-manage">
    <div class="common-card-container">
      <div class="flex-row card-title">
        <a-button type="primary">添加音乐</a-button>
      </div>
      <div class="card-container">
        <div class="content-container"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less">
.music-manage {
  padding: 16px 16px 0;

  .top-statistical-info {
    .common-card-container {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      & + .common-card-container {
        margin-left: 16px;
      }
    }
  }
  .content-container {
    height: 300px;
  }

  .system-statistical-info {
    margin-top: 16px;

    .chart-container {
      height: 400px;
    }
  }
}
</style>
