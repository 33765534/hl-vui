import axios from "axios";
import { CATEGORY_NOMAR_DATA } from "@/constants";
import store from "../store";

const service = axios.create({
  baseURL: "/modules", // import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // token 前面需要加上固定的内容 Bearer
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    // return 出的对象，就是请求的配置对象
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * 响应拦截器
 * 服务端返回数据之后，前端.then之前被调用
 */
service.interceptors.response.use(
  (response) => {
    // const { success, message, data } = response.data;
    // if (success) {
    //   return data;
    // }
    // return Promise.reject(new Error(message));
    return CATEGORY_NOMAR_DATA;
  },
  (err) => {
    // 处理 token 超时
    if (err.response.data.code === 401) {
      // 退出
      store.dispatch("user/logout");
    }
    return Promise.reject(err);
  }
);

export default service;
