<template>
  <mobile-navigation v-if="isMobileTerminal" />
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup>
import { isMobileTerminal } from "@/utils/flexible";
import mobileNavigation from "./mobile/index.vue";
import pcNavigationVue from "./pc/index.vue";
import { useStore } from "vuex";

const store = useStore();
// 触发 category 获取数据
store.dispatch("category/useCategoryData");

</script>

<style lang="scss" scoped></style>
