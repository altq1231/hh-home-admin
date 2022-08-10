<template>
  <div class="music-dashboard">
    <div class="top-statistical-info flex-row">
      <div class="common-card-container fill-flex">
        <div class="flex-row card-title">
          <div class="title fill-flex">热歌榜</div>
        </div>
        <div class="card-container">
          <div class="content-container"></div>
        </div>
      </div>
      <div class="common-card-container fill-flex">
        <div class="flex-row card-title">
          <div class="title fill-flex">收藏榜</div>
        </div>
        <div class="card-container">
          <div class="content-container"></div>
        </div>
      </div>
    </div>
    <div class="top-statistical-info flex-row">
      <div class="common-card-container fill-flex">
        <div class="flex-row card-title">
          <div class="title fill-flex">歌手榜</div>
        </div>
        <div class="card-container">
          <div class="content-container"></div>
        </div>
      </div>
      <div class="common-card-container fill-flex">
        <div class="flex-row card-title">
          <div class="title fill-flex">特色榜</div>
        </div>
        <div class="card-container">
          <div class="content-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less">
.music-dashboard {
  padding: 16px 16px 0;

  .top-statistical-info {
    & + .top-statistical-info {
      margin-top: 16px;
    }

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
}
</style>
