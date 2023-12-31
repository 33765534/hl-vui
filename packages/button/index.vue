<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim },
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script>
const EMITS_CLICK = "click";

/** 1.构建 type 风格可选项和 size 大小可选项 */
// type 可选项:表示按钮风格
const typeEnum = {
  primary:
    "text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700",
  main: "text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700",
  info: "text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700",
};

// size 可选项表示按钮的大小，区分文字按钮和icon按钮
const sizeEnum = {
  // 默认文字的大小
  default: {
    button: "w-8 h-4 text-base",
    icon: "",
  },
  // icon按钮
  "icon-default": {
    button: "w-4 h-4 ",
    icon: "w-1.5 h-1.5",
  },
  // 小的文字
  small: {
    button: "w-7 h-3 text-base",
    icon: "",
  },
  // 小的icon按钮
  "icon-small": {
    button: "w-3 h-3 ",
    icon: "w-1.5 h-1.5",
  },
};
</script>
<script setup>
import { computed } from "vue";
// 因为将来 confirm 组件会以方法调用的形式展示，需要主动导入组件
import mSvgIcon from "../svg-icon/index.vue";

/**
 * 1.构建 type 风格可选项和 size 大小可选项
 * 2.通过 props 让开发者控制按钮
 * 3.区分 icon button 和 text button
 * 4.依据当前的数据，实现视图
 * 5.处理点击事件
 */

/** 2.通过 props 让开发者控制按钮 */
const props = defineProps({
  // icon 图标
  icon: String,
  // icon 颜色
  iconColor: String,
  // icon 图标类名（tailwind）
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: "main",
    validator(val) {
      // 1.获取所有的可选项
      const keys = Object.keys(typeEnum);
      // 2. 开发者指定的风格在可选项中吗
      const result = keys.includes(val);
      if (!result) {
        throw new Error(`你的type 必须是${keys.join("、")}中的一个`);
      }
      return result;
    },
  },
  // 大小风格
  size: {
    type: String,
    default: "default",
    validator(val) {
      // default或small过滤掉 icon开头的 避免重复
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes("icon"));
      const result = keys.includes(val);

      if (!result) {
        throw new Error(`你的type 必须是${keys.join("、")}中的一个`);
      }
      return result;
    },
  },
  // 按钮点击时，是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true,
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
});

/** 3.区分 icon button 和 text button */
const sizeKey = computed(() => {
  return props.icon ? "icon-" + props.size : props.size;
});

/** 5.处理点击事件 */
const emits = defineEmits([EMITS_CLICK]);
const onBtnClick = () => {
  // 当前处于loading状态就不发送事件
  if (props.loading) return;
  // 发送事件
  emits(EMITS_CLICK);
};
</script>
