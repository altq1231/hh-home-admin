<template>
  <transition-group
    name="list"
    tag="div"
    class="transition-container"
    :style="{
      width: todayAmountComputed.length * props.fontSize + 'px',
      height: props.size + 'px',
    }"
  >
    <div
      class="transition-item"
      v-for="(item, index) in todayAmountComputed"
      :style="{
        left: index * props.fontSize + 'px',
        width: props.fontSize + 'px',
        fontSize: props.fontSize * 1.79 + 'px',
        'transition-delay': 0.1 * index + 's',
        height: props.size + 'px',
      }"
      :key="item + index"
    >
      {{ item }}
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import { computed } from "vue-demi";

const props = defineProps({
  num: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 30,
  },
  fontSize: {
    type: Number,
    default: 14,
  },
});

const todayAmountComputed = computed(() => {
  return props.num.split("");
});
</script>
<style lang="less" scoped>
.transition-container {
  position: relative;
  transition: all 0.3s;
  .transition-item {
    width: 14px;
    position: absolute;
    top: 0;
    line-height: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}
</style>
