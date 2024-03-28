import request from "@/utils/request";

/**
 * 人类行为验证
 * @returns
 */
export const getCaptcha = (data) => {
  //   return request({
  //     url: "/sys/captcha",
  //     method: "POST",
  //     data,
  //   });
  return true;
};

/**
 * 登录
 * @returns
 */
export const loginUser = (data) => {
  return request({
    url: "/sys/login",
    method: "POST",
    data,
  });
};

/**
 * 注册
 * @returns
 */
export const registerUser = (data) => {
  return request({
    url: "/sys/register",
    method: "POST",
    data,
  });
};

/**
 * 获取用户信息
 * @returns
 */
export const getProfile = () => {
  return request({
    url: "/user/profile",
  });
};
/**
 * 修改用户信息
 * @returns
 */
export const putProfile = (data) => {
  return request({
    url: "/user/profile",
    method: "PUT",
    data,
  });
};
/**
 * 获取 OSS 上传凭证
 * @returns
 */
export const getSts = () => {
  return request({
    url: "/user/sts",
  });
};

/**
 * 微信登陆前置数据获取
 * @returns
 */
export const getWXLoginData = () => {
  return request({
    url: "/sys/wxlogin/data",
  });
};

/**
 * 微信登陆获取 access_token
 * @returns
 */
export const getWXLoginToken = (appid, secret, code) => {
  return request({
    url: "/sys/wxlogin/data",
    params: {
      appid,
      secret,
      code,
    },
  });
};

/**
 * 微信登陆获取 用户信息
 * @returns
 */
export const getWXLoginUserInfo = (accessToken, openid) => {
  return request({
    url: "/sys/wxlogin/userinfo",
    params: {
      accessToken,
      openid,
    },
  });
};
