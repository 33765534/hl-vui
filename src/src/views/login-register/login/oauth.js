import store from "@/store";
import router from "@/router";
import { message } from "@/libs";
import { LOGIN_TYPE_OAUTH_NO_REGISTER_CODE } from "@/constants";
/**
 * 第三方登录统一处理方法
 * @param {*} oauthType 登录方式
 * @param {*} oauthData 第三方数据
 */
export const oauthLogin = (oauthType, oauthData) => {
  // 触发登录操作，根据登录操作的返回来判断当前用户是否已经注册
  // 1.登录
  const code = store.dispatch("user/login", {
    loginType: oauthType,
    ...oauthData,
  });
  // 2. 是否需要注册
  if (code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
    message("success", `欢迎您 ${oauthData.nickname},请创建您的账号`, 6000);
    // 进入注册页面
    router.push({
      path: "/register",
      query: {
        reqType: oauthType,
        ...oauthData,
      },
    });
    return;
  }
  // 用户已注册
  router.push("/");
};
