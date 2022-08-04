span
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
              <a-form
                layout="vertical"
                ref="formRef"
                :colon="false"
                :model="formState"
                :rules="rules"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                @validate="handleValidate"
              >
                <div class="form-content">
                  <template v-if="isCodeLogin">
                    <a-form-item name="email">
                      <div class="input-group flex-row">
                        <div class="input-item fill-flex">
                          <a-input
                            :class="{
                              'form-input': true,
                              'has-value': formState.email.length > 0,
                            }"
                            v-model:value="formState.email"
                          />
                          <span class="input-label">邮箱地址</span>
                        </div>
                        <a-button
                          class="code-btn"
                          type="primary"
                          @click="handleSendCaptcha"
                          :disabled="
                            isSendCode ||
                            formState.email.length <= 0 ||
                            isTrueEmail
                          "
                          :loading="isSending"
                        >
                          {{
                            isSending
                              ? "正在发送..."
                              : isSendCode
                              ? resendTime + " s 后重新发送"
                              : "发送验证码"
                          }}
                        </a-button>
                      </div>
                    </a-form-item>
                    <a-form-item name="code">
                      <div class="input-item">
                        <a-input
                          :class="{
                            'form-input': true,
                            'has-value': formState.code.length > 0,
                          }"
                          v-model:value="formState.code"
                        />
                        <span class="input-label">请输入验证码</span>
                      </div>
                    </a-form-item>
                  </template>
                  <template v-else>
                    <a-form-item name="userName">
                      <div class="input-item">
                        <a-input
                          :class="{
                            'form-input': true,
                            'has-value': formState.userName.length > 0,
                          }"
                          v-model:value="formState.userName"
                        />
                        <span class="input-label">账号</span>
                      </div>
                    </a-form-item>
                    <a-form-item name="userPwd">
                      <div class="input-item">
                        <a-input
                          :class="{
                            'form-input password-input': true,
                            'has-value': formState.userPwd.length > 0,
                          }"
                          autocomplete="true"
                          v-model:value="formState.userPwd"
                          :type="showPassword ? 'text' : 'password'"
                        />
                        <span class="input-label">密码</span>
                        <div
                          class="password-icon"
                          @click="showPassword = !showPassword"
                        >
                          <eye-filled v-if="showPassword" />
                          <eye-invisible-filled v-else />
                        </div>
                      </div>
                    </a-form-item>
                  </template>

                  <a-button
                    :disabled="disabled"
                    html-type="submit"
                    type="primary"
                    class="login-btn"
                  >
                    登录
                  </a-button>
                  <div class="flex-row form-actions">
                    <router-link class="forget" to="/forget-password"
                      >忘记密码?</router-link
                    >
                    <div class="code-login" @click="handleLoginType">
                      {{ isCodeLogin ? "账号登录" : "验证码登录" }}
                    </div>
                  </div>
                </div>
                <div class="other-login flex-col">
                  <div class="login-title">其他登录方式</div>
                  <div class="other-login-content flex-row">
                    <div class="login-item">
                      <a title="支付宝登录">
                        <svg
                          viewBox="0 0 46 46"
                          width="1em"
                          height="1em"
                          aria-label="alipay"
                        >
                          <path
                            d="M10.35 25.898c-.543.439-1.125 1.076-1.294 1.886-.23 1.109-.048 2.496 1.021 3.583 1.296 1.32 3.263 1.68 4.112 1.744 2.31.165 4.77-.978 6.626-2.285a14.633 14.633 0 003.162-3.133c-2.667-1.376-5.996-2.898-9.555-2.75-1.818.076-3.12.454-4.072.956zm33.821 6.09A22.878 22.878 0 0046.001 23C46 10.319 35.683 0 23 0S0 10.319 0 23c0 12.684 10.315 23 23 23 7.654 0 14.441-3.761 18.624-9.53-4.82-2.4-9.646-4.785-14.48-7.156-1.916 2.184-4.746 4.372-7.943 5.324-2.01.598-3.822.825-5.715.438-1.875-.383-3.257-1.261-4.062-2.142-.41-.449-.88-1.02-1.222-1.699.032.086.055.137.055.137s-.196-.337-.346-.876a4.202 4.202 0 01-.16-1.401c-.02-.362.005-.726.077-1.081.187-.91.575-1.967 1.58-2.952 2.203-2.157 5.154-2.274 6.684-2.265 2.265.014 6.201 1.005 9.515 2.178.918-1.957 1.507-4.048 1.886-5.44H13.717v-1.49h7.075v-2.982h-8.567v-1.489h8.565v-2.979c0-.41.081-.745.745-.745h3.352v3.724H34.2v1.49h-9.312v2.98h7.45s-.748 4.17-3.088 8.28c5.192 1.854 12.494 4.71 14.92 5.664z"
                            fill="#1989fa"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div class="login-item">
                      <a title="微信登录">
                        <svg
                          viewBox="0 0 46 46"
                          width="1em"
                          height="1em"
                          aria-label="wechat"
                        >
                          <g fill="#50b674">
                            <path
                              d="M14.345 17.311a1.505 1.505 0 103.01 0 1.505 1.505 0 00-3.01 0zm6.74-.04a1.505 1.505 0 103.01 0 1.505 1.505 0 00-3.01 0zm3.756 6.732a1.045 1.045 0 102.09 0 1.045 1.045 0 00-2.09 0zm5.31.084a1.045 1.045 0 102.092 0 1.045 1.045 0 00-2.091 0z"
                            ></path>
                            <path
                              d="M23 0A23.001 23.001 0 006.736 39.263 23 23 0 0046 22.999 22.984 22.984 0 0023 0zm-3.93 28.311c-1.212 0-2.175-.25-3.387-.501l-3.387 1.673.961-2.885c-2.426-1.674-3.849-3.849-3.849-6.525 0-4.601 4.35-8.197 9.662-8.197 4.725 0 8.906 2.886 9.743 6.774a6.763 6.763 0 00-.921-.042c-4.601 0-8.197 3.429-8.197 7.652.01.676.11 1.348.293 1.998-.335 0-.628.042-.92.042zm14.135 3.387l.71 2.426-2.634-1.463c-.961.25-1.924.502-2.885.502-4.601 0-8.199-3.136-8.199-6.974 0-3.837 3.596-6.984 8.196-6.984 4.35 0 8.197 3.136 8.197 6.984 0 2.133-1.423 4.057-3.387 5.52z"
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </div>
                    <div class="login-item">
                      <a title="QQ登录">
                        <svg
                          viewBox="0 0 46 46"
                          width="1em"
                          height="1em"
                          aria-label="qq"
                        >
                          <path
                            d="M23 0C10.31 0 0 10.31 0 23s10.31 23 23 23 23-10.31 23-23S35.69 0 23 0zm10.363 29.926c-.053.053-.106.053-.159.106-.634-.159-1.374-.74-1.692-1.216-.158-.159-.211-.423-.475-.53 0 .953-.582 1.852-1.005 2.486-.159.211-.635.582-.635.793.16.106.37.159.582.212.476.211 1.163.581 1.428 1.004.105.159.264.317.317.476.74 1.745-1.64 2.168-2.855 2.432s-3.49-.476-4.124-.846c-.37-.264-.74-.846-1.322-.846-.159.106-.635.053-.9.053-.74 1.48-4.6 2.168-6.661 1.375-.635-.212-1.956-.793-1.692-1.798.211-.846.899-1.322 1.586-1.639.264-.159.846-.211 1.005-.476-.582-.423-1.11-1.269-1.375-1.956-.159-.37-.212-1.163-.423-1.428-.37.529-1.428 1.64-2.326 1.48-.16-.21-.318-.422-.423-.687-.212-.687-.106-1.797.105-2.432.37-1.322.74-2.273 1.428-3.225.211-.317.529-.529.74-.846-.423-.423-.317-1.692-.053-2.22.159-.37.423-.318.476-.9-.106-.158 0-.37-.053-.581-.211-.952.159-2.115.423-2.855.9-2.38 2.432-4.072 4.706-5.023.529-.212 1.163-.37 1.745-.476.264-.053.528 0 .74-.106 5.34-.053 8.037 2.75 9.041 7.032.159.688 0 1.586 0 2.274 1.216.264 1.48 2.696.476 3.384V23c.37.634.846 1.269 1.163 1.956.318.74.423 1.586.635 2.485.211.687-.106 2.274-.423 2.485z"
                            fill="#18acfc"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="注册">
              <register
                :isImproveInfo="true"
                :improveData="improveData"
              ></register>
            </a-tab-pane>
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
import { reactive, ref, toRaw, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import type { Rule } from "ant-design-vue/es/form";
// @ts-ignore
import { login, sendEmailCaptcha, captchaLogin } from "/@/service/user";
import { message } from "ant-design-vue";
import {
  MenuOutlined,
  FileAddOutlined,
  FrownOutlined,
  FolderOutlined,
  EyeInvisibleFilled,
  EyeFilled,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
// @ts-ignore
import Register from "/@/components/register.vue";

interface FormState {
  userName: string;
  userPwd: string;
  email: string;
  code: string;
}

let router = useRouter();
const formRef = ref();
const showPassword = ref(false);
const isCodeLogin = ref(false);
const activeKey = ref("1");
const isSendCode = ref(false);
const isSending = ref(false);
const isTrueEmail = ref(false);
const resendTime = ref(60);
let timer: any = null;

const improveData = reactive({ email: "", _id: "" });

const formState = reactive<FormState>({
  userName: "",
  userPwd: "",
  email: "",
  code: "",
});

const handleSendCaptcha = async () => {
  isSending.value = true;
  isSendCode.value = true;
  const response = await sendEmailCaptcha({ email: formState.email });
  // @ts-ignore
  if (response?.state) {
    // @ts-ignore
    message.success(response.msg);
    isSending.value = false;
    timer = setInterval(() => {
      if (resendTime.value === 0) {
        isSendCode.value = false;
        resendTime.value = 60;
        clearInterval(timer);
      } else {
        resendTime.value--;
      }
    }, 1000);
  } else {
    isSendCode.value = false;
    isSending.value = false;
    // @ts-ignore
    message.error(response.msg);
  }
};

const checkMail = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("请输入邮箱地址");
  }
  // 验证邮箱的正则表达式
  const regEmail =
    /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEmail.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject("请输入正确的邮箱地址");
  }
};

const rules = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
  email: [
    { validator: checkMail, trigger: "change" },
    { validator: checkMail, trigger: "blur" },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const onFinish = async (values: any) => {
  // console.log("Success:", values);

  if (isCodeLogin.value) {
    // console.log(isCodeLogin.value, values);
    const captchaRes = await captchaLogin({
      email: values.email,
      code: values.code,
    });
    // @ts-ignore
    if (captchaRes.state) {
      // console.log(111111, captchaRes);

      if (captchaRes.data.isNewUser) {
        activeKey.value = "2";
        // @ts-ignore
        message.success(captchaRes.msg + ", 请先完善您的信息");
        improveData.email = values.email;
        // @ts-ignore
        improveData._id = captchaRes.data._id;
      } else {
        sessionStorage.setItem("username", captchaRes.data.userName);
        sessionStorage.setItem("_id", captchaRes.data._id);
        message.success(`欢迎你 ${captchaRes.data.userName}`);
        router.push({
          //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
          path: "/",
        });
      }
    } else {
      // @ts-ignore
      message.error(captchaRes.msg);
    }
  } else {
    // console.log(isCodeLogin.value, values);

    const response = await login({
      userName: values.userName,
      userPwd: values.userPwd,
    });
    console.log("server res", response);
    // @ts-ignore
    if (response?.state) {
      sessionStorage.setItem("username", response.data.userName);
      sessionStorage.setItem("_id", response.data._id);
      message.success(`欢迎你 ${response.data.userName}`);
      router.push({
        path: "/",
      });
    } else {
      // @ts-ignore
      message.error(response.msg);
    }
  }
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const resetForm = () => {
  formRef.value.resetFields();
};

const disabled = computed(() => {
  return !(
    (formState.userName && formState.userPwd) ||
    (formState.email && formState.code)
  );
});

const handleValidate = (name: any, status: any) => {
  // console.log(name, status, errorMsgs);
  if (name === "email") {
    isTrueEmail.value = !status;
  }
};

const handleLoginType = () => {
  isCodeLogin.value = !isCodeLogin.value;
};

onBeforeUnmount(() => {
  clearInterval(timer);
});
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

        .form-content {
          padding: 20px 0 0;

          :deep(.ant-form-item) {
            margin-bottom: 30px;
          }

          :deep(.ant-form-item-with-help) {
            margin-bottom: 6px;
          }

          .input-item {
            .form-input.ant-input.password-input {
              padding-right: 60px;
            }
            .password-icon {
              position: absolute;
              right: 0;
              top: 0;
              height: 60px;
              width: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              color: rgba(0, 0, 0, 0.25);
              cursor: pointer;
              user-select: none;

              &:hover {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }

          .login-btn {
            height: 60px;
            margin-top: 30px;
            margin-bottom: 15px;
            width: 100%;
            font-size: 20px;
            line-height: 50px;

            &:disabled {
              color: #ffffff;
              background-color: #6aadfd;
              border-color: #6aadfd;
              cursor: initial;
            }
          }

          .form-actions {
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;

            .forget,
            .code-login {
              font-size: 17px;
              height: 26px;
              line-height: 26px;
              color: @primary-color;
              cursor: pointer;
              transition: color 0.3s;

              &:hover {
                color: #2e8dff;
              }
            }
          }
        }

        .other-login {
          .login-title {
            flex: 0 0 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 17px;
            font-weight: 400;
            color: #aaaaaa;
            text-align: center;
          }

          .other-login-content {
            align-items: center;
            justify-content: center;
            margin-top: 10px;

            .login-item {
              margin: 0 12px;
              flex: 0 0 46px;
              width: 46px;
              height: 46px;
              display: flex;
              align-items: center;
              justify-content: center;

              a {
                font-size: 46px;
                width: 46px;
                height: 46px;
                overflow: hidden;
                border-radius: 23px;
                line-height: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
