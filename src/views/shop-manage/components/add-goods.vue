<template>
  <a-modal
    v-model:visible="modalVisible"
    :title="props.type === 'add' ? '添加商品' : '修改商品'"
    centered
    :width="820"
    @ok="handleModalOk"
    @cancel="handleModalCancel"
  >
    <template #footer>
      <a-button key="back" @click="handleModalCancel">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleModalOk"
      >
        确定
      </a-button>
    </template>
    <div class="add-goods">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <a-form-item
              label="商品名称"
              name="goodsName"
              :colon="false"
              :rules="[{ required: true, message: '请输入商品名称' }]"
            >
              <a-input v-model:value="formState.goodsName" />
            </a-form-item>
          </a-col>
          <a-col :span="12">3 / 5</a-col>
        </a-row>
        <a-row type="flex" :gutter="16">
          <a-col :span="24">
            <a-form-item
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
              label="商品图片"
              name="goodsImg"
              :colon="false"
            >
              <div class="flex-row img-container">
                <PreImgVideo
                  v-for="(file, index) in fileList"
                  :item-info="file?.response?.data"
                  :key="'file' + index"
                ></PreImgVideo>
                <a-upload
                  v-if="fileList.length < 8"
                  v-model:file-list="fileList"
                  :name="fileType"
                  list-type="picture-card"
                  class="img-uploader"
                  :show-upload-list="false"
                  :max-count="8"
                  action="http://10.8.102.12:3301/uploadImageOrVideo"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">上传</div>
                </a-upload>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { message, UploadChangeParam } from "ant-design-vue";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { onBeforeUnmount, reactive, ref } from "vue";
import { isImage, isVideo } from "/@/utils/help";
// @ts-ignore
import PreImgVideo from "/@/components/pre-img-video.vue";

interface FormState {
  goodsName: string;
  password: string;
  remember: boolean;
}

const props = defineProps({
  type: {
    type: String,
    default: "add",
  },
});

const loading = ref<boolean>(false);
const fileList = ref<any>([]);
const fileType = ref("images");
const modalVisible = ref<boolean>(false);
const itemInfo = ref({
  type: "image",
  path: "",
  name: "",
});

const openModal = (id: string) => {
  modalVisible.value = true;
  // console.log(id);

  if (id) {
  } else {
  }
};

const handleModalOk = () => {
  modalVisible.value = false;
};

defineExpose({
  openModal,
});

const handleModalCancel = () => {
  modalVisible.value = false;
};

const formState = reactive<FormState>({
  goodsName: "",
  password: "",
  remember: true,
});

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    // Get this url from response in real world.
    console.log(info.file, fileList.value);
    itemInfo.value = info.file.response.data;
    // itemInfo.value.name = info.file.name;
    // itemInfo.value.type = fileType.value;
    // if (fileType.value === "images") {
    //   // @ts-ignore
    //   getBase64(info.file.originFileObj, (base64Url: string) => {
    //     itemInfo.value.path = base64Url;
    loading.value = false;
    //   });
    // } else {
    //   itemInfo.value = info.file.response.data;
    // }
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

// @ts-ignore
const beforeUpload = (file: UploadProps["fileList"][number]) => {
  if (isVideo(file.name)) {
    fileType.value = "videos";
  } else if (isImage(file.name)) {
    fileType.value = "images";
  }
  const isImageOrVideo = isImage(file.name) || isVideo(file.name);
  if (!isImageOrVideo) {
    message.error("您只能上传图片/视频文件!");
  }

  const isLt200M = file.size / 1024 / 1024 < 200;
  if (!isLt200M) {
    message.error("图像/视频必须小于2MB!");
  }
  return isImageOrVideo && isLt200M;
};

const handleInfo = (file: any) => {
  console.log(file.response);

  return file.response.data;
};
</script>
<style lang="less">
.add-goods {
  .pre-img {
    height: 102px;
    margin-right: 12px;
  }

  .img-uploader {
    margin-left: 12px;
  }

  .ant-upload.ant-upload-select-picture-card {
    margin: 0;
    width: 100px;
    height: 100px;
  }
}
</style>
