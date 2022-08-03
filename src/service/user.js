// import axios from "../utils/axios";
import axios from "../utils/request";

export function getUserInfo() {
  return axios.get("/info");
}

export function sendEmailCaptcha(params) {
  return axios.post("/user/sendCaptcha", params);
}

export function EditUserInfo(params) {
  return axios.put("/info", params);
}

export function login(params) {
  return axios.post("/user/login", params);
}

export function logout() {
  return axios.post("/logout");
}

export function register(params) {
  return axios.post("/register", params);
}
