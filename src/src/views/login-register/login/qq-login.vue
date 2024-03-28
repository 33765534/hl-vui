<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon
      class="w-4 cursor-pointer"
      name="qq"
      @click="onQQLogin"
    ></m-svg-icon>
  </div>
</template>

<script setup>
import brodacast from "./brodacast";
import { ref, onMounted } from "vue";
import { oauthLogin } from "./oauth";
import { LOGIN_TYPE_QQ } from "@/constants";

// QQ登录的 URL
const QQ_LOGIN_URL =
  "https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A62F%2Fimooc-front.lgdsunday.club%2Flogin";

/**
 * QQ 登录挂起
 */
onMounted(() => {
  QC.Login(
    {
      btnId: "qqLoginBtn",
    },
    // 注(坑)：
    // 登录成功之后的回调，会在《登录回调页面中被执行》
    // QQ登录存在缓存，登录成功一-次之后， 下次进入页面会自动重新登录
    ({ nickname, figureurl_qq_2 }, opts) => {
      console.log(data);
      //注销登录，防止下次打开页面直接展示上一次的用户信息
      QC.Login.sign0ut();
      // https://imooc-front.lgdsunday.Club/login#access_ token=4723B87EC749FA12A7247F40975D7BFB&expires_ in=7776000
      //拿到QQ用户的唯一标识，通过这个标识来判断当前用户是否已经注册(我们的应用中)了
      const accessToken = /access_token=((.*))&expires_ in/.exec(
        window.location.hash
      )[1];
      //拼接获取到的数据对象
      const oauth0bj = {
        nickname,
        figureurl_qq_2,
        accessToken,
      };

      
      brodacast.send(oauth0bj);
      // 针对于移动端而言:通过移动端触发QQ登录会展示三个页面，原页面、QQ 吊起页面、回调页面。并且移动端一个页面展示整屏内容，且无法直接通过 window.close()关闭，所以在移动端中，我们需要在当前页面继续进行后续操作。
      // 移动端下没有窗口的概念
      oauthLogin(LOGIN_TYPE_QQ, oauth0bj);
      window.close();
    }
  );
});

/**
 * 登录按钮事件
 */
const onQQLogin = () => {
  openQQWindow();
};

/**
 * 处理QQ登录视窗
 */
const openQQWindow = async () => {
  window.open(
    QQ_LOGIN_URL,
    "oauth2Login_10609",
    "height=525,width=585,toolbar=no,menubar=no,scrollbars=no,status=nolocation=yes,resizable=yes"
  );
  // 等待
  brodacast.wait().then((oauth0bj) => {
    brodacast.clear();
    // 执行登录操作
    oauthLogin(LOGIN_TYPE_QQ, oauth0bj);
  });
};
</script>

<style scoped lang="scss"></style>
