<template>
  <div class="goods-manage">
    <div class="common-card-container flex-col">
      <div class="flex-row card-title">
        <a-button type="primary" @click="addGoods">
          <template #icon><PlusOutlined /></template>
          添加商品
        </a-button>
      </div>
      <div class="card-container fill-flex" ref="goodsTableRef">
        <a-table
          tableLayout="fixed"
          bordered
          :columns="columns"
          :data-source="data"
          :pagination="{ pageSize: 50 }"
          :scroll="{ y: tableHeight, x: 1260 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-space :size="16">
                <a>修改</a>
                <a>删除</a>
                <a>
                  {{ record.shopStatus === 1 ? "下架" : "上架" }}
                </a>
              </a-space>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
      v-model:visible="modalVisible"
      title="Basic Modal"
      @ok="handleModalOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { onMounted, onBeforeUnmount, ref, unref, Ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
const columns = [
  {
    title: "商品编号",
    dataIndex: "_id",
    width: 230,
    fixed: "left",
  },
  {
    title: "商品名称",
    dataIndex: "goodsName",
    width: 150,
    fixed: "left",
  },
  {
    title: "商品图片",
    dataIndex: "goodsImg",
    width: 140,
  },
  {
    title: "商品库存",
    dataIndex: "goodsStock",
    width: 120,
  },
  {
    title: "商品售价",
    dataIndex: "goodsPrice",
    width: 120,
  },
  {
    title: "商品状态",
    dataIndex: "goodsStatus",
    width: 120,
  },
  {
    title: "商品介绍",
    dataIndex: "goodsDesc",
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    fixed: "right",
  },
];
const data = [...Array(20)].map((_, i) => ({
  key: i,
  goodsName: `Edward King ${i}`,
  _id: i + 1001,
  address: `London, Park Lane no. ${i}`,
  goodsDesc: `商品 ${i}`,
}));
const goodsTableRef = ref(null);
const tableHeight = ref(400);
const modalVisible = ref(false);

const addGoods = () => {
  modalVisible.value = true;
};

const handleModalOk = () => {
  modalVisible.value = false;
};

const getTableHeight = () => {
  const tableEl: any = unref(goodsTableRef);
  if (!tableEl) {
    tableHeight.value = document.body.offsetHeight - 330;
  } else {
    tableHeight.value = tableEl.offsetHeight - 120;
  }
};

const handleSize = useDebounceFn(getTableHeight, 200);

onMounted(async () => {
  await getTableHeight();
  window.addEventListener("resize", handleSize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleSize);
});
</script>
<style lang="less">
.goods-manage {
  padding: 16px 16px 0;
  height: calc(100vh - 144px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .common-card-container {
    border-radius: 4px;
    height: 100%;
    overflow: hidden;

    .card-container {
      overflow: hidden;
      padding-bottom: 0;
    }
  }
}
</style>
