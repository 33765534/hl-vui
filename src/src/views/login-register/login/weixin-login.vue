<template>
  <div @click="onWeixinLogin">
    <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
    <div id="login_container"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getWXLoginData, getWXLoginToken, getWXLoginUserInfo } from "@/api/sys";
import brodacast from "./brodacast";
import { oauthLogin } from "./oauth";
import { LOGIN_TYPE_WX } from "@/constants";

/**
 * 微信登陆成功之后，数据解析
 * https://imooc-front.lgdsunday.club/login?code=091FVy0009vrFN1x6H1002bygV1FVyOK&state=ca9e6f99-aa38-4bd2-aae6-08a33802060e
 */
if (window.location.search) {
  const code = /code=((.*))&state/.exec(window.location.search)[1];
  if (code) {
    brodacast.send({
      code,
    });
    // 窗口关闭
    window.close();
  }
}

/**
 * 触发微信登陆
 */
const onWeixinLogin = async () => {
  // 1.获取微信前置登陆数据
  //   const { appId, appSecret, redirectUri, scope, state } = await getWXLoginData();
  const { appId, appSecret, redirectUri, scope, state } = {
    appId: "wxdf77d7fdb9119b22",
    appSecret: "8781b4b919269ed2b04cb4d8cba41b74",
    redirectUri: "https://imooc-front.lgdsunday.club/",
    scope: "snsapi_login",
    state: "39a63377-d12e-431e-8320-b893808b3651",
  };
  getWXLoginData();
  // 2. open url
  window.open(
    `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`,
    "",
    " height=525,width=585, toolbar=no,menubar=no,scrollbars=no,status=no,location=yes, resizable=yes"
  );

  // 等待扫码成功
  brodacast.wait().then(async ({ code }) => {
    // 关闭
    brodacast.clear();
    // 获取token
    const { access_token, openid } = await getWXLoginToken(
      appId,
      appSecret,
      code
    );
    // 获取用户信息
    const { nickname, headimgurl } = await getWXLoginUserInfo(
      access_token,
      openid
    );

    oauthLogin(LOGIN_TYPE_WX, {
      openid,
      nickname,
      headimgurl,
    });
  });
};
</script>

<style scoped lang="scss"></style>
