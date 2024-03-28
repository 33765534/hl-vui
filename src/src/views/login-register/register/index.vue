<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图片 -->
    <header-vue></header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"
      >
        注册账号
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onRegHandler">
        <!-- 用户名 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="regFrom.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        />
        <!-- 密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="passsword"
          name="passsword"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="regFrom.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="passsword"
        />
        <!-- 确认密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          type="passsword"
          name="confirmPasssword"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPasswordname:@passsword"
          v-model="regFrom.confirmPasssword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPasssword"
        />
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
          >
            去登录
          </a>
        </div>

        <!-- 注册协议 -->
        <div class="text-center">
          <a
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300"
            href="http://m.imooc.com/newfaq?id=89"
            target="__black"
          >
            注册即同意《注册协议》
          </a>
        </div>
        <!-- 注册按钮 -->
        <m-button
          :isActiveAnim="false"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
        >
          立即注册
        </m-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import headerVue from "../components/header.vue";
import {
  Form as veeForm,
  Field as veeField,
  ErrorMessage as veeErrorMessage,
  defineRule,
} from "vee-validate";
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from "../validate";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { LOGIN_TYPE_USERNAME } from "@/constants";

const store = useStore();
const router = useRouter();
const route = useRoute();

/**
 * 插入规则
 * 入参1：规则名字
 * 入参2：函数
 */
defineRule("validateConfirmPasswordname", validateConfirmPassword);
// 数据源
const regFrom = ref({
  username: "",
  password: "",
  confirmPasssword: "",
});

const loading = ref(false);
/**
 * 注册
 */
const onRegHandler = async () => {
  loading.value = true;
  try {
    const payload = {
      username: regFrom.value.username,
      password: regFrom.value.password,
    };
    // // 注册
    // await store.dispatch("user/register", {
    //   ...payload,
    //   ...route.query,
    // });
    // // 注册完，触发登录
    // await store.dispatch("user/login", {
    //   ...payload,
    //   loginType: LOGIN_TYPE_USERNAME,
    // });
  } finally {
    loading.value = false;
  }
  router.push("/");
};
</script>

<style scoped lang="scss"></style>
