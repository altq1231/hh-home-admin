import { createRouter, createWebHistory } from "vue-router";
import { decode } from "js-base64";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  {
    path: "/",
    component: () => import("/@/layout/index.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        meta: { title: "首页" },
        component: () => import("/@/views/home.vue"),
      },
      {
        path: "/test",
        name: "Test",
        meta: {
          hideHeader: true,
          title: "Test",
        },
        component: () => import("/@/views/test.vue"),
      },
      {
        path: "/test1",
        name: "Test1",
        meta: {
          hideHeader: true,
          title: "Test1",
        },
        component: () => import("/@/views/test1.vue"),
      },
      {
        path: "/shop",
        name: "shop",
        meta: {
          hideHeader: true,
          title: "商城",
        },
        component: () => import("/@/views/shop/index.vue"),
      },
      {
        path: "/music",
        name: "music",
        meta: {
          hideHeader: true,
          title: "音乐室",
        },
        component: () => import("/@/views/music/index.vue"),
      },
      {
        path: "/video",
        name: "video",
        meta: {
          hideHeader: true,
          title: "放映室",
        },
        component: () => import("/@/views/video/index.vue"),
      },
    ],
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   meta: { title: "登录" },
  //   component: () => import("/@/views/login-register.vue"),
  // },
  {
    path: "/:catchAll(.*)",
    name: "404",
    meta: { title: "404" },
    component: () => import("/@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // to and from are both route objects. must call `next`.
  // const jwt = sessionStorage.getItem("jwt") || "";

  // document.title = jwt ? (to.meta.title ? to.meta.title + " - 管理应用" : "管理系统") : "系统登录";
  document.title = to.meta.title;
  next();
  // console.log(2222, to.path);
  // if (to.path === "/login" || to.path === "" || to.path === "/" || to.path === "/num-scroll") {
  //   // console.log(2222, !!jwt);
  //   next();
  //   // !!jwt ? next("/") : next();
  // } else {
  //   if (from.path === "/login" && !jwt) {
  //     NProgress.done(true);
  //     next("/login");
  //     return;
  //   }
  //   if (!!jwt) {
  //     // console.log(111, to.meta.hasOwnProperty("roles"));
  //     if (to.meta.hasOwnProperty("roles")) {
  //       let roles = to.meta.roles || [],
  //         { role } = jwt && JSON.parse(decode(jwt));
  //       roles.includes(role) ? next() : next("/404");
  //       return;
  //     }
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
