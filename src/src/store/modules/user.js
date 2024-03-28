import md5 from "md5";
import { loginUser, getProfile, registerUser } from "@/api/sys";
import { message } from "@/libs";
import { data } from "autoprefixer";
import { LOGIN_TYPE_OAUTH_NO_REGISTER_CODE } from "@/constants";
/**
 * user 模块
 */
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      // 登录的 token
      token: "",
      // 用户信息
      userInfo: {},
    };
  },
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      // state.token = newToken;
      state.token = "111";
    },
    /**
     * 保存 用户信息
     */
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
  },
  actions: {
    /**
     * 注册
     */
    async register(context, payload) {
      // 加密密码
      const { password } = payload;
      // return await registerUser({
      //   ...payload,
      //   password: password ? md5(password) : "",
      // });
      return "";
    },
    /**
     * 登录
     */
    async login(context, payload) {
      // 加密密码
      const { password } = payload;
      // const data = await loginUser({
      //   ...payload,
      //   password: password ? md5(password) : "",
      // });

      // 判断是否为扫码需要注册
      if (data.code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
        return data.code;
      }
      // 保存 token
      // context.commit("setToken",data.token);
      // 获取用户信息
      context.dispatch("profile");
    },
    /**
     * 获取用户信息（当用户登录成功后）
     */
    async profile(context) {
      // const data = await getProfile();
      const data = {
        nickname: "小米6080",
        regTime: "2023-5-3",
        avatar:
          "https://c-ssl.duitang.com/uploads/blog/202105/11/20210511193549_08e64.jpg",
        username: "LIHL",
        vipLevel: "钻石",
      };
      context.commit("setUserInfo", data);
      // 提示
      message(
        "success",
        `欢迎您 ${
          data.vipLevel
            ? "尊贵的 VIP-" + data.vipLevel + "用户" + data.nickname
            : data.nickname
        }`,
        6000
      );
    },
    /**
     * 推出登录
     */
    logout(context) {
      // 清空 token
      context.commit("setToken", "");
      // 清空用户信息
      context.commit("setUserInfo", {});
      // 刷新页面
      location.reload();
    },
  },
};
