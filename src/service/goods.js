import axios from "../utils/request";

// 获取所有商品
export function getAllGoods() {
  return axios.get("/goods/getAllGoods");
}

// 添加商品
export function createAGoods(params) {
  return axios.post("/goods/addAGoods", params);
}