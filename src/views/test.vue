<template>
  <div class="test-page flex-col">
    <div class="top-header flex-row">
      <a-button>
        <template #icon><undo-outlined /></template>
      </a-button>
      <a-button>
        <template #icon><redo-outlined /></template>
      </a-button>
      <a-button> 预览 </a-button>
      <a-button> 保存 </a-button>
      <a-button> 清空画布 </a-button>
    </div>
    <div class="fill-flex flex-row bottom-container">
      <div style="flex: 0 0 120px"></div>
      <div
        class="left-container"
        :style="{
          flex: `0 0 ${curStyle.width}px`,
          width: curStyle.width + 'px',
        }"
      >
        <div
          class="handle"
          @mousedown="handleMouseDown"
          @dblclick="handleReset"
        ></div>
        1
      </div>
      <div class="fill-flex right-container">2</div>
    </div>
  </div>
</template>

<script>
import { UndoOutlined, RedoOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
export default {
  name: "Test",
  setup() {
    const curStyle = reactive({
      width: 240,
    });

    const handleMouseDown = (elem) => {
      console.log(elem.target.parentNode.offsetLeft);
      if (elem.preventDefault) {
        elem.preventDefault();
      } else {
        elem.returnValue = false;
      }
      const pLeft = elem.target.parentNode.offsetLeft;
      const offX = elem.offsetX;
      document.onmousemove = function (e) {
        // console.log(e.clientX, elem.target.offsetLeft);

        const l =
          e.clientX - offX - pLeft <= 120 ? 120 : e.clientX - offX - pLeft;

        curStyle.width = l;
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    };

    const handleReset = () => {
      curStyle.width = 240;
    };
    return { handleMouseDown, curStyle, handleReset };
  },
  components: { UndoOutlined, RedoOutlined },
  mounted() {
    window.onresize = () =>
      console.log(devicePixelRatio, document.body.clientWidth);
  },
  methods: {},
};
</script>
<style scoped lang="less">
.test-page {
  height: 100vh;
  overflow: hidden;
}
.top-header {
  flex: 0 0 40px;
  height: 40px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid @border-color-base;

  .ant-btn + .ant-btn {
    margin-left: 10px;
  }
}

.bottom-container {
  overflow: hidden;

  .left-container {
    flex: 0 0 240px;
    width: 240px;
    border-right: 1px solid @border-color-base;
    position: relative;

    .handle {
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      height: 100%;
      margin-right: -5px;

      &:hover,
      &:active,
      &:focus {
        cursor: ew-resize;
        background: linear-gradient(
          90deg,
          transparent calc(50% - 1px),
          @primary-color calc(50% - 1px),
          @primary-color calc(50% + 1px),
          transparent calc(50% + 1px)
        );
      }
    }
  }

  .right-container {
    overflow: hidden;
  }

  .box {
    width: 200px;
    height: 100px;
  }
}
</style>
