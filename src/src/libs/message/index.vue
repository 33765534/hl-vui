<template>
  <transition name="down">
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = "success";
const WARN = "warn";
const ERROR = "error";

const typeEnum = [SUCCESS, WARN, ERROR];
</script>
<script setup>
import { onMounted, ref } from "vue";
import mSvgIcon from "../svg-icon/index.vue";

const props = defineProps({
  /**
   * message 的消息类型
   */
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val);
      if (!result) {
        throw new Error(`你的 thpe 必须是 ${typeEnum.join("、")} 中的一个`);
      }
      return result;
    },
  },
  // 描述文本
  content: {
    type: String,
    required: true,
  },
  // 展示时长
  duration: {
    type: Number,
  },
  // 关闭的回调
  destory: {
    type: Function,
  },
});

/**
 * 样式表数据
 */
const styles = {
  // 警告
  warn: {
    icon: "warn",
    fillClass: "fill-warn-300",
    textClass: "text-warn-300",
    containerClass:
      "bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100",
  },
  // 错误
  error: {
    icon: "error",
    fillClass: "fill-error-300",
    textClass: "text-error-300",
    containerClass:
      "bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100",
  },
  // 成功
  success: {
    icon: "success",
    fillClass: "fill-success-300",
    textClass: "text-success-300",
    containerClass:
      "bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100",
  },
};

// 控制展示
const isVisable = ref(false);
// 关闭动画执行事件
const animDuration = "0.5s";
/**
 * 为了保证动画展示，需要在 mounted 之后进行展示
 */
onMounted(() => {
  isVisable.value = true;
  setTimeout(() => {
    isVisable.value = false;
    // 延迟一段时间进行关闭,等待动画完全关闭之后，再去触发关闭回调方法 props.destory()
    setTimeout(() => {
      if (props.destory) {
        props.destory();
      }
    }, parseInt(animDuration.replace("0.", "").replace("s", "") * 100));
  }, props.duration);
});
</script>

<style scoped lang="scss">
// down 动画
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animDuration);
}

// 准备进入，离开完成
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>

