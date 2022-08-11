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
          :data-source="dataSource"
          :pagination="{ pageSize: 50 }"
          :scroll="{ y: tableHeight, x: 1260 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'goodsStatus'">
              <a-tag :color="record.goodsStatus === 1 ? 'success' : 'error'">
                {{ record.goodsStatus === 1 ? "销售中" : "已下架" }}
              </a-tag>
            </template>
            <template v-else-if="column.key === 'goodsName'">
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key].goodsName"
              />
              <template v-else>
                {{ record.goodsName }}
              </template>
            </template>
            <template v-else-if="column.key === 'goodsImg'">
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key].goodsImg"
              />
              <template v-else>
                {{ record.goodsImg }}
              </template>
            </template>
            <template v-else-if="column.key === 'goodsStock'">
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key].goodsStock"
              />
              <template v-else>
                {{ record.goodsStock }}
              </template>
            </template>
            <template v-else-if="column.key === 'goodsPrice'">
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key].goodsPrice"
              />
              <template v-else>
                {{ record.goodsPrice }}
              </template>
            </template>
            <template v-else-if="column.key === 'goodsDesc'">
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key].goodsDesc"
              />
              <template v-else>
                {{ record.goodsDesc }}
              </template>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-space :size="16">
                <template v-if="editableData[record.key]">
                  <a-popconfirm
                    title="确认修改?"
                    @confirm="confirmSave(record.key)"
                  >
                    <a>确认</a>
                  </a-popconfirm>
                  <a @click="cancelEdit(record.key)">取消</a>
                </template>
                <template v-else>
                  <a @click="handleModify(record.key)">修改</a>
                  <a-popconfirm
                    :title="`确认删除 ${record.goodsName} ?`"
                    @confirm="handleDelete(record.key)"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                  <a-popconfirm
                    :title="
                      record.goodsStatus === 1
                        ? `确认下架 ${record.goodsName} ?`
                        : `确认上架 ${record.goodsName} ?`
                    "
                    @confirm="confirmShelves(record.key)"
                  >
                    <a>
                      {{ record.goodsStatus === 1 ? "下架" : "上架" }}
                    </a>
                  </a-popconfirm>
                </template>
              </a-space>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
      v-model:visible="modalVisible"
      title="Basic Modal"
      centered
      @ok="handleModalOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { cloneDeep } from "lodash-es";
import { PlusOutlined } from "@ant-design/icons-vue";
import { onMounted, onBeforeUnmount, ref, unref, reactive } from "vue";
import type { UnwrapRef } from "vue";
import { useDebounceFn } from "@vueuse/core";
const columns = [
  {
    title: "商品编号",
    dataIndex: "_id",
    key: "_id",
    width: 230,
    fixed: "left",
  },
  {
    title: "商品名称",
    dataIndex: "goodsName",
    key: "goodsName",
    width: 220,
    fixed: "left",
  },
  {
    title: "商品图片",
    dataIndex: "goodsImg",
    key: "goodsImg",
  },
  {
    title: "商品库存",
    dataIndex: "goodsStock",
    key: "goodsStock",
  },
  {
    title: "商品售价",
    dataIndex: "goodsPrice",
    key: "goodsPrice",
  },
  {
    title: "商品状态",
    dataIndex: "goodsStatus",
    key: "goodsStatus",
    width: 150,
  },
  {
    title: "商品介绍",
    dataIndex: "goodsDesc",
    key: "goodsDesc",
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    fixed: "right",
  },
];

interface DataItem {
  key: number | string;
  goodsName: string;
  _id: number | string;
  goodsDesc: string;
  goodsStock: number;
  goodsPrice: number | string;
  goodsStatus: number;
  goodsImg: string;
}

const data: DataItem[] = [...Array(20)].map((_, i) => ({
  key: i.toString(),
  goodsName: `Edward King ${i}`,
  _id: i + 1001,
  goodsDesc: `商品 ${i}`,
  goodsStock: i,
  goodsPrice: i + 11,
  goodsStatus: i % 2 == 0 ? 1 : 2,
  goodsImg: "111",
}));

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const goodsTableRef = ref(null);
const tableHeight = ref(400);
const modalVisible = ref(false);

const addGoods = () => {
  modalVisible.value = true;
};

const handleModalOk = () => {
  modalVisible.value = false;
};

const handleModify = (key: string) => {
  console.log(key);
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};

const confirmSave = (key: string) => {
  console.log(key);
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  delete editableData[key];
};

const cancelEdit = (key: string) => {
  delete editableData[key];
};

const handleDelete = (key: string) => {
  console.log(key);
};

const confirmShelves = (key: string) => {
  console.log(key);
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
