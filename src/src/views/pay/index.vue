<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-300 xl:pt-1">
    <div
      class="mx-auto h-full pt-[50%] px-1 bg-white dark:bg-zinc-900 duration-300 xl:h-[360px] xl:rounded-sm xl:py-10 xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:max-w-screen-lg"
    >
      <div
        v-if="JSON.stringify(isSuccess) !== 'null'"
        class="flex justify-center items-center"
      >
        <m-svg-icon
          v-if="isSuccess"
          name="pay-success"
          class="w-8 h-8 mr-4"
        ></m-svg-icon>
        <m-svg-icon
          v-if="!isSuccess"
          name="pay-fail"
          class="w-8 h-8 mr-4"
        ></m-svg-icon>
        <p class="text-ml text-zinc-900 dark:text-zinc-200">
          {{ isSuccess ? "支付成功" : "支付失败" }}
        </p>
        <m-button
          class="w-full mt-8 mx-auto dark:bg-zinc-800 xl:w-[120px]"
          @click="onConfirm"
        >
          确定
        </m-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPayResult } from "@/api/pay";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
// 支付是否成功
const isSuccess = ref(null);

// https://imooc-front.lgdsunday.club/pay/result/?charset=utf-8&out_trade_no=e4ff9a5-32bb-4235-8d61-a85d5fc4c711&method=alipay.trade.page.pay.return&totalamount=0.01&sign=E%2BU%2Fa75uwK8G60U4iPbFSTHmk5hXxD5ACCkagpag0%2FJha%2FcFtcwHIrMJfh2h58Z8KEea09tsn18z0XcMTwLU3fXKZH0YzhLjlyCuLJStcoY5gjtkpSABfiVYhr3QTpUifioH56PRgHi%2BguduIqzFe5D12iUcMDh6aQYzgPjBkEWbXcBJgFJDUPmdzmlkvfy%2BKOBWo4ASic38Vwxa5rFfSVzpYv29%2FiRH54bhFOBy8nIry99XWK1otTLFpoBYTx8dQSs6IwpOlwsLb8TSWrZDSvOITn3zxUu8nUE4UX6BxZVukf7grepxXVWHSTrxOHFGZNCXclkJA%2B%2F3fo6dm2843AQ%3D%3D8trade_no=2022041922001458151440190027&auth_app_id=2021003123624147&version=1.0&app_id=2021003123624147&sign_type=RSA2&seller_id=2088341890170470&timestamp=2022-04-19+18%3A55%3A56
/**
 * 获取支付结果
 */
const getResultData = async () => {
  const res = await getPayResult(route.query.out_trade_no);
  isSuccess.value = res;
};
getResultData();

const onConfirm = () => {
  // 获取用户信息（充值之后 可能vip信息变化 所以重新获取一下信息）
  store.dispatch("user/profile");
  router.push("/");
};
</script>

<style scoped lang="scss"></style>
