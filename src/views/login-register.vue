<template>
  <div class="login-page flex-row">
    <div class="left-side">
      <div class="login-banner"></div>
    </div>
    <div class="login-content flex-col fill-flex">
      <div class="top-header">
        <div class="header-container flex-row">
          <div class="logo-content flex-row">
            <img class="logo" src="/logo_bg.svg" />
            管理后台
          </div>
          <nav class="nav-menu flex-row">
            <div class="menu-item">
              <router-link to="/">用户协议</router-link>
            </div>
            <div class="menu-item">
              <router-link to="/">隐私政策</router-link>
            </div>
            <div class="menu-item">
              <router-link to="/">帮助中心</router-link>
            </div>
          </nav>
        </div>
      </div>
      <div class="content-container flex-row fill-flex">
        <div class="login-card">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="登录">
              <!-- <a-form
            layout="vertical"
            ref="formRef"
            :colon="false"
            :model="formState"
            :rules="rules"
            label-col="6"
          >
            <a-form-item ref="name" label="账号" name="userName">
              <a-input v-model:value="formState.userName" />
            </a-form-item>
            <a-form-item label="密码" name="userPwd">
              <a-input
                autocomplete
                v-model:value="formState.userPwd"
                type="password"
              />
            </a-form-item>
            <a-button type="primary" class="login-btn" @click.stop="onSubmit">
              登录
            </a-button>
          </a-form> -->
            </a-tab-pane>
            <a-tab-pane key="2" tab="注册">Continue...</a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="foot-copyright">
        版权所有-沪ICP备000000000-沪公网安备XXXXXXXXXXX号-沪ICP证XXXXXX号
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
// @ts-ignore
import { login, register, getUserInfo } from "/@/service/user";
import { message } from "ant-design-vue";
import {
  MenuOutlined,
  FileAddOutlined,
  FrownOutlined,
  FolderOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
let router = useRouter();
const formRef = ref();
const activeKey = ref("1");
const formState = reactive({
  userName: "",
  userPwd: "",
});
const rules = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const formData = toRaw(formState);
      const response = await login({
        userName: formData.userName,
        userPwd: formData.userPwd,
      });
      console.log("server res", response);
      if (response.state) {
        message.success(`欢迎你 ${response.data.userName}`);
        sessionStorage.setItem("jwt", formData.userName);
        router.push({
          //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
          path: "/",
        });
      } else {
        message.error(response.msg);
      }
    })
    .catch((error: any) => {
      console.log("server error", error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
<style scoped lang="less">
.login-page {
  width: 100%;
  .left-side {
    flex: 0 0 400px;
    width: 400px;

    .login-banner {
      width: 400px;
      height: 100%;
      background-size: cover;
      background-position: 50%;
      background-image: url(../assets/login_bg.png);
    }
  }

  .login-content {
    height: 100%;
    position: relative;
    padding-bottom: 40px;
    min-height: 100vh;
    .foot-copyright {
      position: absolute;
      padding: 0 20px;
      font-size: 12px;
      color: #999999;
      line-height: 18px;
      text-align: center;
      left: 0;
      right: 0;
      bottom: 20px;
    }

    .top-header {
      flex: 0 0 65px;
      width: 100%;
      height: 65px;
      color: @text-color;
      overflow: hidden;
      transition: background-color 0.5s ease;
      padding: 0 20px;
      .header-container {
        height: 100%;
        position: relative;
        align-items: center;
        justify-content: space-between;
        .logo-content {
          align-items: center;
          font-size: 22px;

          .logo {
            height: 40px;
            margin-right: 20px;

            svg {
              height: 100%;
            }
          }
        }

        .nav-menu {
          margin-left: 30px;
          .menu-item {
            &:nth-child(n + 2) {
              margin-left: 10px;
            }

            &:nth-last-child(n + 2) {
              margin-right: 10px;
            }

            a {
              color: #838383;
              font-size: 14px;
              transition: color 0.3s;

              &:hover {
                color: @primary-color;
              }
            }

            &.active {
              a {
                color: @primary-color;
              }
            }
          }
        }
      }
    }

    .content-container {
      align-items: center;
      justify-content: center;
      padding-top: 30px;

      .login-card {
        padding: 40px 45px;
        overflow: hidden;
        position: relative;
        min-width: 450px;
        margin: 0 auto 80px;
        box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);

        :deep(.ant-tabs) {
          width: 360px;
          .ant-tabs-nav:before {
            border-bottom: none;
          }

          .ant-tabs-tab {
            margin: 0 20px 0 0;
          }

          .ant-tabs-tab-btn {
            font-size: 22px;
            font-weight: 400;
            color: #bbb;
          }

          .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
            color: @text-color;
          }

          &.ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
          &.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
            height: 4px;
            border-radius: 2px;
          }
        }
      }
    }
  }
}
</style>
