<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        @click="onShowPopup"
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!-- items -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        :class="{
          'text-zinc-100': $store.getters.currentCategoryIndex === index,
        }"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model:modelValue="isVisable">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from "vue";
import { useScroll } from "@vueuse/core";
import MenuVue from "@/views/main/components/menu/index.vue";

import { useStore } from "vuex";

const store = useStore();

//滑块
const sliderStyle = ref({
  transform: "translateX(0px)",
  width: "52px",
});

// 获取所有的item元素
let itemRefs = [];
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el);
  }
};

// 数据改变之后，DOM变化之前
onBeforeUpdate(() => {
  itemRefs = [];
});

// 获取ul元素
const ulTarget = ref(null);
// 通过vueuse的useScroll 获取响应式的scroll滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget);

// watch监听选中的item下标变化 改变滑块位置
watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    const { left, width } = itemRefs[val].getBoundingClientRect();

    sliderStyle.value = {
      // 滑块的位置=ul 横向滚动的位置+当前元素的left -ul 的padding
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
      width: width + "px",
    };
  }
);

// 点击事件
const onItemClick = (item) => {
  store.commit("app/changeCurrentCategory", item);
  isVisable.value = false;
};

const isVisable = ref(false);
const onShowPopup = () => {
  isVisable.value = true;
};
</script>
