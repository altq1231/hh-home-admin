<template>
  <div class="basic-layout">
    <div class="bottom-main-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { SettingTwoTone } from "@ant-design/icons-vue";

//router是全局路由对象，route= userRoute()是当前路由对象
let router = useRouter();

const logout = () => {
  sessionStorage.removeItem("jwt");
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: "/login",
  });
};

const goToPage = (path: string) => {
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: path,
  });
};

const state = reactive({
  transitionName: "slide-left",
});

router.beforeEach((to, from) => {
  // if (to.meta.index > from.meta.index) {
  //   console.log(1);
  //   state.transitionName = "slide-left"; // 向左滑动
  // } else if (to.meta.index < from.meta.index) {
  //   // 由次级到主级
  //   console.log(2);
  //   state.transitionName = "slide-right";
  // } else {
  //   state.transitionName = ""; // 同级无过渡效果
  // }
});
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100%;

  .bottom-main-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
