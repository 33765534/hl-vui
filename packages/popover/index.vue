<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisable"
        :style="contentStyle"
        class="absolute p-1 z-20 rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-700 border"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// 延迟关闭时间
const DELAY_TIME = 100;
// 左上
const PROP_TOP_LEFT = "top-left";
// 右上
const PROP_TOP_RIGHT = "top-right";
// 左下
const PROP_BOTTOM_LEFT = "bottom-left";
// 右下
const PROP_BOTTOM_RIGHT = "bottom-right";

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT,
];
</script>
<script setup>
/**
 * 1.指定所有可选位置的常量，并生成enum
 * 2.通过prop控制指定位置
 * 3.获取元素的DOM,创建读取元素尺寸的方法
 * 4.生成气泡的样式对象，用来控制每个位置对应的样式
 * 5.根据prop,计算样式对象
 */
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  plcaement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val);
      if (!result) {
        throw new Error(
          `你的plcaement必须是${placementEnum.join("、")}中的一个`
        );
      }
      return result;
    },
  },
});

const isVisable = ref(false);
let timeout = null;
/**
 * 鼠标移入触发
 */
const onMouseenter = () => {
  isVisable.value = true;
  if (timeout) {
    clearTimeout(timeout);
  }
};

/**
 * 鼠标移出触发
 */
const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisable.value = false;
    timeout = null;
  }, DELAY_TIME);
};

/**
 * 3.获取元素的DOM,创建读取元素尺寸的方法
 * 计算元素的尺寸
 */
const referenceTarget = ref(null);
const contentTarget = ref(null);
const useElementSize = (target) => {
  if (!target) return {};
  return {
    width: target.offsetWidth,
    height: target.offsetHeight,
  };
};

/**
 * 4.生成气泡的样式对象，用来控制每个位置对应的样式
 */
const contentStyle = ref({
  top: 0,
  left: 0,
});
// 计算：期望气泡展示的时候进行计算
watch(isVisable, (val) => {
  if (!val) return;
  // 等待元素渲染
  // vue 在数据改变之后，需要等待一段时间DOM才会变化，
  // 所以我们可以通过 nextTick 函数的参数，来监听DOM变化之后的回调
  nextTick(() => {
    switch (props.plcaement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0;
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + "px";
        break;
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0;
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + "px";
        break;
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + "px";
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + "px";
        break;
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + "px";
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + "px";
        break;
    }
  });
});
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
