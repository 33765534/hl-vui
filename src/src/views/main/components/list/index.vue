<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexlesData"
    >
      <m-waterfall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
        </template>
      </m-waterfall>
    </m-infinite>

    <!-- 详情内容展示 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisblePins" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getPexlesList } from "@/api/pexels";
import itemVue from "./item.vue";
import { isMobileTerminal } from "@/utils/flexible";
import pinsVue from "../../../pins/components/pins.vue";
import gsap from "gsap";
import { useStore } from "vuex";
import { useEventListener } from "@vueuse/core";
const store = useStore();

let query = {
  page: 1,
  size: 20,
};
// 数据是否在加载中
const loading = ref(false);
// 数据是否全部加载完成
const isFinished = ref(false);
// 数据源
const pexelsList = ref([]);
const getPexlesData = async () => {
  // 数据全部加载完成 return
  if (isFinished.value) return;
  // 完成第一次加载请求之后，后续的请求让page自增
  if (pexelsList.value.length) {
    query.page += 1;
  }

  const res = await getPexlesList(query);
  if (query.page === 1) {
    pexelsList.value = res.list;
  } else {
    pexelsList.value.push(...res.list);
  }
  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true;
  }
  // 修改 loading 标记
  loading.value = false;
};

/**
 * 通过此方法修改 query,重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery };
  // 重置状态
  isFinished.value = false;
  pexelsList.value = [];
};

/**
 * 监听 currentCategory 变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id,
    });
  }
);

// 控制 pins 展示
const isVisblePins = ref(false);
// 当前选中的 pins 属性
const currentPins = ref({});

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, "popstate", () => {
  isVisblePins.value = false;
});

/**
 * 进入 pins
 */
const onToPins = (item) => {
  // 修改浏览器的 url
  history.pushState(null, null, `/pins/${item.id}`);
  currentPins.value = item;
  isVisblePins.value = true;
};

const beforeEnter = (el) => {
  // 初始状态
  gsap.set(el, {
    scaleX: 0, // x的缩放
    scaleY: 0, // y的缩放
    transformOrigin: "0 0", // 坐标从0 0开始
    // 指定位移中心点
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0, // 初始是透明的
  });
};
// 展示时候的动画
const enter = (el, done) => {
  // 进入时状态(被完全展开了)
  gsap.to(el, {
    duration: 0.3, // 动画时长
    scaleX: 1, // x的缩放
    scaleY: 1, // y的缩放
    opacity: 1, // 透明度
    translateX: 0,
    translateY: 0,
    // 完成时候的回调
    onComplete: done,
  });
};
// 关闭时候的动画
const leave = (el, done) => {
  // 进入时状态(被完全展开了)
  gsap.to(el, {
    duration: 0.3, // 动画时长
    scaleX: 0, // x的缩放
    scaleY: 0, // y的缩放
    opacity: 0, // 透明度
    // 指定位移中心点
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    // 完成时候的回调
    onComplete: done,
  });
};
</script>

<style scoped lang="scss"></style>
