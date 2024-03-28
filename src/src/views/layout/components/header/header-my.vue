<template>
  <m-popover>
    <!-- 具名插槽：触发弹层的视图 -->
    <template #reference>
      <div
        v-if="$store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="$store.getters.userInfo.avatar"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- VIP -->
        <m-svg-icon
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
          v-if="$store.getters.userInfo.vipLevel"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>
    <!-- 气泡 匿名插槽：弹出层视图中展示的内容 -->
    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { confirm } from "@/libs";

const store = useStore();
const router = useRouter();
const themeArr = [
  {
    id: "0",
    icon: "profile",
    name: "个人资料",
    path: "/profile",
  },
  {
    id: "1",
    icon: "vip-profile",
    name: "升级 VIP",
    path: "/member",
  },
  {
    id: "2",
    icon: "logout",
    name: "推出登录",
    path: "/logout",
  },
];
/**
 * 登录按钮点击事件
 */
const onToLogin = () => {
  // 移动端下跳转的类型
  store.commit("app/changeRouterType", "push");
  router.push("/login");
};
/**
 * menu 点击事件
 */
const onItemClick = (item) => {
  if (item.id === "2") {
    // 退出登录
    confirm("您确定要退出登录吗？").then(() => {
      store.dispatch("user/logout");
    });
    return;
  }
  router.push(item.path);
};
</script>

<style scoped lang="scss"></style>
