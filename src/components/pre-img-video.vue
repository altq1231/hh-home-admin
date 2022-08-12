<template>
  <div class="preview-container">
    <img
      class="thumbnail-img"
      v-if="props.itemInfo.type === 'images'"
      :src="props.itemInfo.path"
    />
    <video
      class="thumbnail-img"
      v-else
      autoplay
      muted
      :src="props.itemInfo.path"
    ></video>
    <div class="actions-container flex-row">
      <a class="img-action" @click="handleShow"> <eye-outlined /></a>
      <a class="img-action"> <delete-outlined /></a>
    </div>
  </div>
  <a-modal
    centered
    width="auto"
    :visible="previewVisible"
    :title="props.itemInfo.name ? props.itemInfo.name : '预览'"
    :footer="null"
    @cancel="handleCancel"
  >
    <img
      alt="example"
      class="pre-img"
      v-if="props.itemInfo.type === 'images'"
      :src="props.itemInfo.path"
    />
    <video
      class="pre-img"
      v-else
      autoplay
      muted
      :src="props.itemInfo.path"
    ></video>
  </a-modal>
</template>
<script lang="ts" setup>
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
// @ts-ignore
const props = defineProps({
  itemInfo: {
    type: Object,
    default: {},
  },
});
const previewVisible = ref(false);

const handleShow = () => {
  previewVisible.value = true;
};

const handleCancel = () => {
  previewVisible.value = false;
};
</script>
<style lang="less" scoped>
.preview-container {
  min-width: 100px;
  flex: 0 0 100px;
  width: 100px;
  height: 100px;
  position: relative;
  & + .preview-container {
    margin-left: 12px;
  }

  .thumbnail-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    z-index: 1;
    border-radius: @border-radius-base;
  }

  .actions-container {
    z-index: 2;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    border-radius: @border-radius-base;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;

    .img-action {
      color: rgba(255, 255, 255, 0.6);
      position: relative;
      font-size: 18px;
      transition: color 0.3s;
      & + .img-action {
        margin-left: 16px;
      }

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  &:hover {
    .actions-container {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}

.pre-img {
  width: 100%;
}
</style>
