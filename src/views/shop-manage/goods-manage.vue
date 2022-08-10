<template>
  <div class="goods-manage">
    <div class="common-card-container">
      <div class="flex-row card-title">
        <a-button type="primary">
          <template #icon><PlusOutlined /></template>
          添加商品
        </a-button>
      </div>
      <div class="card-container">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="{ pageSize: 50 }"
          :scroll="{ y: 240 }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [...Array(20)].map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
</script>
<style lang="less">
.goods-manage {
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
