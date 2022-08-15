<template>
  <a-drawer
    :get-container="false"
    v-model:visible="modalVisible"
    :title="props.type === 'add' ? '添加商品' : '修改商品'"
    :maskClosable="false"
    :width="1000"
    @close="handleModalCancel"
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
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
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
              <a-input
                v-model:value="formState.goodsName"
                placeholder="请输入商品名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="商品状态" name="goodsStatus" :colon="false">
              <a-radio-group
                v-model:value="formState.goodsStatus"
                button-style="solid"
              >
                <a-radio-button :value="1">上架</a-radio-button>
                <a-radio-button :value="2">下架</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <a-form-item
              label="商品库存"
              name="goodsStock"
              :colon="false"
              :rules="[{ required: true, message: '请输入商品库存' }]"
            >
              <a-input-number v-model:value="formState.goodsStock" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="商品价格"
              name="goodsPrice"
              :rules="[{ required: true, message: '请输入商品价格' }]"
              :colon="false"
            >
              <a-input-number
                v-model:value="formState.goodsPrice"
                prefix="￥"
                :step="0.01"
                string-mode
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <a-form-item label="商品标签" name="goodsTags" :colon="false">
              <a-select
                v-model:value="formState.goodsTags"
                mode="tags"
                style="width: 100%"
                :token-separators="[',']"
                placeholder="请选择或输入商品标签"
                :options="options"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="商品售价"
              :rules="[{ required: true, message: '请输入商品售价' }]"
              name="sellingPrice"
              :colon="false"
            >
              <a-input-number
                v-model:value="formState.sellingPrice"
                prefix="￥"
                :step="0.01"
                string-mode
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" :gutter="16">
          <a-col :span="24">
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="商品简介"
              name="goodsDesc"
              :colon="false"
            >
              <a-textarea
                v-model:value="formState.goodsDesc"
                placeholder="请输入商品简介,不超过100字"
                show-count
                :maxlength="100"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" :gutter="16">
          <a-col :span="24">
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
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

        <a-row type="flex" :gutter="16">
          <a-col :span="24">
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="商品详情"
              name="goodsDetails"
              :colon="false"
            >
              <BasicEditor></BasicEditor>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { message, SelectProps, UploadChangeParam } from "ant-design-vue";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { isImage, isVideo } from "/@/utils/help";
// @ts-ignore
import PreImgVideo from "/@/components/pre-img-video.vue";
import type { FormInstance } from "ant-design-vue";
// @ts-ignore
import BasicEditor from "/@/components/basic-editor.vue";

interface FormState {
  goodsName: string;
  goodsStatus: number;
  goodsStock: number | null;
  goodsPrice: number | null;
  goodsDesc: string;
  goodsCategory: string;
  sellingPrice: number | null;
  goodsTags: string[];
  goodsDetails: string;
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

const options = ref<SelectProps["options"]>([
  {
    value: "a1",
    label: "a1",
  },
]);
const formRef = ref<FormInstance>();

const formState = reactive<FormState>({
  goodsName: "",
  goodsStatus: 1,
  goodsStock: null,
  goodsPrice: null,
  goodsDesc: "",
  goodsCategory: "food",
  sellingPrice: null,
  goodsTags: [],
  goodsDetails: "",
});

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleModalOk = async () => {
  // modalVisible.value = false;
  // @ts-ignore
  await formRef.value
    .validate()
    .then(() => {
      console.log("values");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

defineExpose({
  openModal,
});

const handleModalCancel = async () => {
  // @ts-ignore
  await formRef.value.resetFields();
  modalVisible.value = false;
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
  .pre-item {
    margin-right: 12px;
    margin-bottom: 12px;
  }
  .preview-container + .img-uploader {
    margin-left: 12px;
  }

  .ant-input-number,
  .ant-input-number-affix-wrapper {
    width: 100%;
  }

  .ant-upload.ant-upload-select-picture-card {
    margin: 0;
    width: 100px;
    height: 100px;
  }
}

.ant-drawer-footer {
  text-align: right;

  .ant-btn + .ant-btn {
    margin-left: 16px;
  }
}
</style>
