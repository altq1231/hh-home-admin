<template>
  <div class="goods-manage">
    <div class="common-card-container flex-col">
      <div class="flex-row card-title">
        <a-button type="primary" @click="addGoods">
          <template #icon><plus-outlined /></template>
          添加商品
        </a-button>
        <a-button
          type="primary"
          @click="batchDelete"
          :disabled="!hasSelected"
          :loading="state.loading"
        >
          <template #icon><delete-outlined /></template>
          批量删除
        </a-button>
      </div>
      <div class="card-container fill-flex" ref="goodsTableRef">
        <a-table
          tableLayout="fixed"
          bordered
          :columns="columns"
          :data-source="dataSource"
          :pagination="{ pageSize: 50 }"
          :scroll="{ y: tableHeight, x: 1350 }"
          :row-selection="{
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'goodsStatus'">
              <a-tag :color="record.goodsStatus === 1 ? 'success' : 'error'">
                {{ record.goodsStatus === 1 ? "销售中" : "已下架" }}
              </a-tag>
            </template>
            <template v-else-if="column.key === 'goodsImg'">
              <img class="goods-img" :src="record.goodsImg[0].path" />
            </template>
            <template v-else-if="column.key === 'action'">
              <a-space :size="16">
                <a @click="handleModify(record._id)">修改</a>
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
              </a-space>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <AddGoods ref="addGoodsRef" :type="type"></AddGoods>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { cloneDeep } from "lodash-es";
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import {
  onMounted,
  onBeforeUnmount,
  ref,
  unref,
  reactive,
  computed,
} from "vue";
import type { UnwrapRef } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { message } from "ant-design-vue";
import { isVideo, isImage } from "../../utils/help";
// @ts-ignore
import AddGoods from "./components/add-goods.vue";

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
    title: "商品状态",
    dataIndex: "goodsStatus",
    key: "goodsStatus",
    width: 150,
  },
  {
    title: "商品图片",
    dataIndex: "goodsImg",
    key: "goodsImg",
    width: 150,
  },
  {
    title: "商品库存",
    dataIndex: "goodsStock",
    key: "goodsStock",
    width: 150,
  },
  {
    title: "商品售价",
    dataIndex: "goodsPrice",
    key: "goodsPrice",
    width: 150,
  },
  {
    title: "商品介绍",
    dataIndex: "goodsDesc",
    key: "goodsDesc",
    width: 150,
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    fixed: "right",
  },
];

interface imgItem {
  path: string;
  name: string;
}

interface DataItem {
  key: number | string;
  goodsName: string;
  _id: number | string;
  goodsDesc: string;
  goodsStock: number;
  goodsPrice: number | string;
  goodsStatus: number;
  goodsImg: imgItem[];
}

type Key = string | number;

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
const type = ref("add");

const data: DataItem[] = [...Array(20)].map((_, i) => ({
  key: i.toString(),
  goodsName: `Edward King ${i}`,
  _id: i + 1001,
  goodsDesc: `商品 ${i}`,
  goodsStock: i,
  goodsPrice: i + 11,
  goodsStatus: i % 2 == 0 ? 1 : 2,
  goodsImg: [
    {
      path: "/goods-m.svg",
      name: "shop",
    },
  ],
}));

const dataSource = ref(data);

const goodsTableRef = ref(null);
const addGoodsRef = ref<any>(null);
const tableHeight = ref(400);

const handleModify = (key: string) => {
  addGoodsRef.value.openModal(key);
  type.value = "edit";
};

const addGoods = () => {
  // console.log(addGoodsRef.value);
  type.value = "add";
  addGoodsRef.value.openModal();
};

const handleDelete = (key: string) => {
  // console.log(key);
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
};

const confirmShelves = (key: string) => {
  // console.log(key);
  dataSource.value = dataSource.value.map((item) => {
    if (item.key === key) {
      if (item.goodsStatus === 1) {
        item.goodsStatus = 2;
      } else {
        item.goodsStatus = 1;
      }
    }
    return item;
  });
};

const batchDelete = () => {
  console.log("batchDelete");
  dataSource.value = dataSource.value.filter(
    (item) => !state.selectedRowKeys.includes(item.key)
  );
  state.selectedRowKeys = [];
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

    .card-title {
      .ant-btn {
        & + .ant-btn {
          margin-left: 16px;
        }
      }
    }

    .card-container {
      overflow: hidden;
      padding-bottom: 0;
    }
  }

  .goods-img {
    height: 50px;
  }
}
</style>
