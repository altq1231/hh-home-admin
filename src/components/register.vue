<template>
  <a-form
    layout="vertical"
    ref="registerFormRef"
    :colon="false"
    :model="registerFormState"
    :rules="registerRules"
    @finish="onRegisterFinish"
    @finishFailed="onRegisterFinishFailed"
    @validate="handleRegisterValidate"
  >
    <div class="form-content">
      <a-form-item name="reUserName">
        <div class="input-item">
          <a-input
            :class="{
              'form-input': true,
              'has-value': registerFormState.reUserName.length > 0,
            }"
            v-model:value="registerFormState.reUserName"
          />
          <span class="input-label">账号</span>
        </div>
      </a-form-item>
      <a-form-item name="reUserPwd">
        <div class="input-item">
          <a-input
            :class="{
              'form-input password-input': true,
              'has-value': registerFormState.reUserPwd.length > 0,
            }"
            autocomplete="true"
            v-model:value="registerFormState.reUserPwd"
            :type="showPassword ? 'text' : 'password'"
          />
          <span class="input-label">请确认密码</span>
          <div class="password-icon" @click="showPassword = !showPassword">
            <eye-filled v-if="showPassword" />
            <eye-invisible-filled v-else />
          </div>
        </div>
      </a-form-item>
      <a-form-item name="confirmPwd">
        <div class="input-item">
          <a-input
            :class="{
              'form-input password-input': true,
              'has-value': registerFormState.confirmPwd.length > 0,
            }"
            autocomplete="true"
            v-model:value="registerFormState.confirmPwd"
            :type="showConfirmPassword ? 'text' : 'password'"
          />
          <span class="input-label">请确认密码</span>
          <div
            class="password-icon"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <eye-filled v-if="showConfirmPassword" />
            <eye-invisible-filled v-else />
          </div>
        </div>
      </a-form-item>
      <a-form-item name="reEmail">
        <div class="input-group flex-row">
          <div class="input-item fill-flex">
            <a-input
              :class="{
                'form-input': true,
                'has-value': registerFormState.reEmail.length > 0,
              }"
              :readonly="props.isImproveInfo"
              v-model:value="registerFormState.reEmail"
            />
            <span class="input-label">邮箱地址</span>
          </div>
          <a-button
            v-if="!props.isImproveInfo"
            class="code-btn"
            type="primary"
            @click="handleSendCaptcha"
            :disabled="
              isSendCode ||
              registerFormState.reEmail.length <= 0 ||
              isRegisterTrueEmail
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
      <a-form-item name="reCode" v-if="!props.isImproveInfo">
        <div class="input-item">
          <a-input
            :class="{
              'form-input': true,
              'has-value': registerFormState.reCode.length > 0,
            }"
            v-model:value="registerFormState.reCode"
          />
          <span class="input-label">请输入验证码</span>
        </div>
      </a-form-item>

      <a-button
        :disabled="disabled"
        html-type="submit"
        type="primary"
        class="login-btn"
      >
        {{ props.isImproveInfo ? "提交" : "注册" }}
      </a-button>
    </div>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import type { Rule } from "ant-design-vue/es/form";
// @ts-ignore
import { sendEmailCaptcha, register, improveUserInfo } from "/@/service/user";
import { message } from "ant-design-vue";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons-vue";

const props = defineProps({
  isImproveInfo: {
    type: Boolean,
    default: "",
  },
  improveData: {
    type: Object,
    default: "",
  },
});

interface RegisterFormState {
  reUserName: string;
  reUserPwd: string;
  confirmPwd: string;
  reUserDesc: string;
  reEmail: string;
  reCode: string;
}
let router = useRouter();
const registerFormRef = ref();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSendCode = ref(false);
const isSending = ref(false);
const isRegisterTrueEmail = ref(false);
const resendTime = ref(60);
let timer: any = null;

const registerFormState = reactive<RegisterFormState>({
  reUserName: "",
  reUserPwd: "",
  confirmPwd: "",
  reUserDesc: "",
  reEmail: props.isImproveInfo ? props.improveData.email : "",
  reCode: "",
});

const handleSendCaptcha = async () => {
  isSending.value = true;
  isSendCode.value = true;
  const response = await sendEmailCaptcha({ email: registerFormState.reEmail });
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

const checkUserName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("请输入账号");
  }
  // 验证邮箱的正则表达式
  const flag = new RegExp(
    "[`~!@#$%^&*()=|{}':;\\\\'\"\",\\[\\].\\-<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]"
  );
  if (flag.test(value)) {
    return Promise.reject("不能包含特殊字符");
  } else {
    return Promise.resolve();
  }
};

const checkConfirmPwd = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("请输入确认密码");
  }

  if (value != registerFormState.reUserPwd) {
    return Promise.reject("两次密码不一样");
  } else {
    return Promise.resolve();
  }
};

const checkUserPwd = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("请输入密码");
  }

  if (value.length < 6) {
    return Promise.reject("密码长度不能小于6");
  } else {
    return Promise.resolve();
  }
};

const registerRules = {
  reUserName: [
    { validator: checkUserName, trigger: "change" },
    { validator: checkUserName, trigger: "blur" },
  ],
  reUserPwd: [
    { validator: checkUserPwd, trigger: "change" },
    { validator: checkUserPwd, trigger: "blur" },
  ],
  confirmPwd: [
    { validator: checkConfirmPwd, trigger: "change" },
    { validator: checkConfirmPwd, trigger: "blur" },
  ],
  reEmail: [
    { validator: checkMail, trigger: "change" },
    { validator: checkMail, trigger: "blur" },
  ],
  reCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const disabled = computed(() => {
  let temp = !(
    registerFormState.reUserName &&
    registerFormState.reUserPwd &&
    registerFormState.confirmPwd &&
    registerFormState.reEmail &&
    registerFormState.reCode
  );
  if (props.isImproveInfo) {
    temp = !(
      registerFormState.reUserName &&
      registerFormState.reUserPwd &&
      registerFormState.confirmPwd &&
      registerFormState.reEmail
    );
  }
  return temp;
});

const onRegisterFinish = async (values: any) => {
  // console.log(values);

  if (props.isImproveInfo) {
    const response = await improveUserInfo({
      userName: values.reUserName,
      userPwd: values.reUserPwd,
      email: values.reEmail,
      _id: props.improveData._id,
    });
    // console.log("server res", response);
    // @ts-ignore
    if (response?.state) {
      // console.log(response);

      message.success(`欢迎你 ${response.data.userName}`);
      sessionStorage.setItem("username", response.data.userName);
      sessionStorage.setItem("_id", response.data._id);
      router.push({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
        path: "/",
      });
    } else {
      // @ts-ignore
      message.error(response.msg);
    }
  } else {
    const response = await register({
      userName: values.reUserName,
      userPwd: values.reUserPwd,
      email: values.reEmail,
      code: values.reCode,
    });
    // console.log("server res", response);
    // @ts-ignore
    if (response?.state) {
      message.success(`欢迎你 ${response.data.userName}`);
      sessionStorage.setItem("username", response.data.userName);
      sessionStorage.setItem("_id", response.data._id);
      router.push({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
        path: "/",
      });
    } else {
      // @ts-ignore
      message.error(response.msg);
    }
  }
};

const onRegisterFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleRegisterValidate = (name: any, status: any) => {
  // console.log(name, status);
  if (name === "reEmail") {
    isRegisterTrueEmail.value = !status;
  }
};

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
<style lang="less" scoped>
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
</style>
