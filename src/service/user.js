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

export function getUserInfo() {
  return axios.get("/info");
}
export function EditUserInfo(params) {
  return axios.put("/info", params);
}

export function logout() {
  return axios.post("/logout");
}

export function register(params) {
  return axios.post("/register", params);
}
