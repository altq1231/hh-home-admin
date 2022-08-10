// import axios from "../utils/axios";
import axios from "../utils/request";

// 账号密码登录
export function login(params) {
  return axios.post("/user/login", params);
}

// 验证码登录
export function captchaLogin(params) {
  return axios.post("/user/captchaLogin", params);
}

// 发送验证码
export function sendEmailCaptcha(params) {
  return axios.post("/user/sendCaptcha", params);
}

// 注册
export function register(params) {
  return axios.post("/user/register", params);
}

// 第一次登录完善信息
export function improveUserInfo(params) {
  return axios.post("/user/improveUserInfo", params);
}

// 退出登录
export function logout() {
  return axios.get("/user/logout");
}

export function getUserInfo() {
  return axios.get("/info");
}
export function EditUserInfo(params) {
  return axios.put("/info", params);
}
