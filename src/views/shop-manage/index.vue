<template>
  <div class="shop-dashboard">
    <div class="top-statistical-info flex-row">
      <div class="common-card-container fill-flex">
        <div class="flex-row card-title">
          <div class="title fill-flex">今日订单数</div>
        </div>
        <div class="card-container">
          <div class="content-container"></div>
        </div>
      </div>
      <div class="common-card-container fill-flex">
        <div class="flex-row card-title">
          <div class="title fill-flex">今日日活数</div>
        </div>
        <div class="card-container">
          <div class="content-container"></div>
        </div>
      </div>
    </div>
    <div class="system-statistical-info common-card-container">
      <div class="flex-row card-title">
        <div class="title fill-flex">系统统计</div>
      </div>
      <div class="card-container">
        <div class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less">
.shop-dashboard {
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
