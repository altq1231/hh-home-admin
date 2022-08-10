// import axios from "../utils/axios";
import axios from "../utils/request";
import codeJson from "../assets/adcode.json";
// 查询天气
export function getWeather(city) {
  return axios.get(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=8c16ea4a02d8427bc6d645968d2e2171&extensions=all&city=${city}`
  );
}
// 查询当日天气
export function getLiveWeather(city) {
  return axios.get(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=8c16ea4a02d8427bc6d645968d2e2171&city=${city}`
  );
}
// 查询城市码
export function getCityCode(cityName) {
  return axios.get(`/getCityAdCode?cityName=${cityName}`);
}
// 定位城市
export function getCityPosition() {
  return axios.get(
    `https://restapi.amap.com/v3/ip?key=8c16ea4a02d8427bc6d645968d2e2171`
  );
}
// 获取操作记录
export function getOperationRecord(userId) {
  return axios.get(`/or/getSelfRecord?userId=${userId}`);
}
