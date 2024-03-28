<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-300 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-300 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <!-- 移动端 navbar 处理 -->
      <m-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">
        精选会员
      </m-navbar>
      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP,畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <pay-menu-item-vue
            v-for="item in vipPayListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData.id"
            :data="item"
            @click="onChangeCurrentPay"
          >
          </pay-menu-item-vue>
        </div>
        <p class="mt-1 text-sm text-zinc-500">
          {{ currentPayData.desc }}
        </p>
        <!-- 支付 -->
        <paymentVue class="mt-4" :payData="currentPayData"></paymentVue>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "member",
};
</script>
<script setup>
import { isMobileTerminal } from "@/utils/flexible";
import payMenuItemVue from "./components/pay-menu-item.vue";
import paymentVue from "./components/payment/index.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { getVipPayList } from "@/api/pay";

// 所有支付数据
const vipPayListData = ref([]);
// 当前选中的支付数据
const currentPayData = ref({});
/**
 * 获取支付数据的方法
 */
const getVipPayListData = async () => {
  // const res = await getVipPayList();
  const res = [
    {
      id: 0,
      title: "连续包月",
      desc: "次月 ￥19 续费，可随时取消",
      oldPrice: "29",
      price: "19",
    },
    {
      id: 1,
      title: "连续包年",
      desc: "次月 ￥198 续费，可随时取消",
      oldPrice: "258",
      price: "198",
    },
    {
      id: 2,
      title: "连续包季",
      desc: "次月 ￥53 续费，可随时取消",
      oldPrice: "68",
      price: "53",
    },
    {
      id: 3,
      title: "月卡",
      desc: "",
      oldPrice: "39",
      price: "29",
    },
    {
      id: 4,
      title: "季卡",
      desc: "",
      oldPrice: "79",
      price: "68",
    },
    {
      id: 5,
      title: "年卡",
      desc: "",
      oldPrice: "298",
      price: "258",
    },
  ];
  vipPayListData.value = res;
  currentPayData.value = vipPayListData.value[0];
};
getVipPayListData();
/**
 * 移动端的后退
 */
const router = useStore();
const store = useStore();
const onNavbarLeftClick = () => {
  store.commit("app/changeRouterType", "back");
  router.back();
};
/**
 * 选中支付项
 */
const onChangeCurrentPay = (item) => {
  currentPayData.value = item;
};
</script>

<style scoped lang="scss"></style>
