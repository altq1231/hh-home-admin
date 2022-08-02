import axios from "axios";
import { message } from "ant-design-vue";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.NODE_ENV === "production" ? `/pro` : "/api",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log("request error", error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    console.log("response", res);

    // if the custom code is not 200, it is judged as an error.
    // if (!res.state) {
    // message.error(res.msg);

    // // 508: Illegal token; 512: Other clients logged in; 514: Token expired;
    // if (res.resCode === 508 || res.resCode === 512 || res.resCode === 514) {
    //   // to re-login
    //   // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //   //   confirmButtonText: 'Re-Login',
    //   //   cancelButtonText: 'Cancel',
    //   //   type: 'warning'
    //   // }).then(() => {
    //   //   store.dispatch('user/resetToken').then(() => {
    //   location.reload();
    //   //   })
    //   // })
    // }
    //   return Promise.reject(new Error(res.msg || "Error"));
    // } else {
    return Promise.resolve(res);
    // }
  },
  (error) => {
    console.log("response error" + error); // for debug
    message.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
