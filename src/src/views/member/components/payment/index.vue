<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment-vue v-if="!isMobileTerminal" :payData="payData" />
    <!-- 移动端支付 -->
    <mobilePaymentVue v-else :payData="payData"></mobilePaymentVue>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { isMobileTerminal } from "@/utils/flexible";
import pcPaymentVue from "./pc-payment/index.vue";
import mobilePaymentVue from "./mobile-payment/index.vue";

defineProps({
  payData: Object,
});
</script>

<style scoped lang="scss"></style>
