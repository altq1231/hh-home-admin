import {
  createRouter,
  createWebHistory
} from "vue-router";
import {
  decode
} from "js-base64";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [{
    path: "/",
    component: () => import("/@/layout/index.vue"),
    children: [{
        path: "/",
        name: "Home",
        meta: {
          title: "首页"
        },
        component: () => import("/@/views/home.vue"),
      },
      {
        path: "/shop-manage",
        name: "shop-manage",
        meta: {
          title: "商城管理"
        },
        component: () => import("../views/shop-manage/index.vue"),
      },
      {
        path: "/goods-manage",
        name: "goods-manage",
        meta: {
          title: "商品管理"
        },
        component: () => import("../views/shop-manage/goods-manage.vue"),
      },
      {
        path: "/video-dashboard",
        name: "video-dashboard",
        meta: {
          title: "视频库管理"
        },
        component: () => import("../views/video-manage/index.vue"),
      },
      {
        path: "/video-manage",
        name: "video-manage",
        meta: {
          title: "视频管理"
        },
        component: () => import("../views/video-manage/video-manage.vue"),
      },
      {
        path: "/music-dashboard",
        name: "music-dashboard",
        meta: {
          title: "曲库管理"
        },
        component: () => import("../views/music-manage/index.vue"),
      },
      {
        path: "/music-manage",
        name: "music-manage",
        meta: {
          title: "音乐管理"
        },
        component: () => import("../views/music-manage/music-manage.vue"),
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
    ],
  },
  {
    path: "/chat",
    name: "chat",
    meta: {
      title: "聊天室"
    },
    component: () => import("/@/views/custom-manage/chat-room.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () => import("/@/views/login-register.vue"),
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    meta: {
      title: "忘记密码"
    },
    component: () => import("/@/views/forget-password.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    meta: {
      title: "404"
    },
    component: () => import("/@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const whiteList = ["/login", "/forget-password"];
// console.log(whiteList.includes("/test"));

router.beforeEach((to, from, next) => {
  NProgress.start();
  // to and from are both route objects. must call `next`.
  const jwt = sessionStorage.getItem("username");

  document.title = jwt ?
    to.meta.title ?
    to.meta.title + " - 管理应用" :
    "管理系统" :
    "系统登录";
  document.title = to.meta.title;

  // console.log(2222, to.path);
  if (whiteList.includes(to.path)) {
    // console.log(2222, !!jwt);

    next();
  } else {
    if (from.path === "/login" && !jwt) {
      NProgress.done(true);
      next("/login");
      return;
    }
    if (!!jwt) {
      // console.log(111, to.meta.hasOwnProperty("roles"));
      if (to.meta.hasOwnProperty("roles")) {
        let roles = to.meta.roles || [],
          {
            role
          } = jwt && JSON.parse(decode(jwt));
        roles.includes(role) ? next() : next("/404");
        return;
      }
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;