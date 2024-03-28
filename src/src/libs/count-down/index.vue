<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<script>
const EMITS_FINISH = "finish";
const EMITS_CHANGE = "change";
const INTERVAL_COUNT = 1000;
</script>
<script setup>
import { ref, onUnmounted, watch, computed } from "vue";
import dayjs from "./utils";
const props = defineProps({
  // 毫秒时间-时间戳
  time: {
    type: Number,
    required: true,
  },
  // 遵循dayjs format 标准
  format: {
    type: String,
    default: "HH:mm:ss",
  },
});
const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE]);

const duration = ref(0);
/**
 * 开始倒计时
 */
let interval;
const start = () => {
  close();
  interval = setInterval(() => {
    durationFn();
  }, INTERVAL_COUNT);
};
/**
 * 倒计时的执行行为
 */
const durationFn = () => {
  duration.value -= INTERVAL_COUNT;
  emits(EMITS_CHANGE);
  // 监听结束的行为
  if (duration.value <= 0) {
    duration.value = 0;
    emits(EMITS_FINISH);
    close();
  }
};
/**
 * 倒计时结束
 */
const close = () => {
  if (interval) {
    clearInterval(interval);
  }
};
/**
 * 组件销毁时，清理倒计时
 */
onUnmounted(() => {
  close();
}),
  /**
   * 开始倒计时
   */
  watch(
    () => props.time,
    (val) => {
      duration.value = val;
      start();
    },
    {
      immediate: true,
    }
  );

/**
 * 显示时间格式
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format);
});
</script>

<style scoped lang="scss"></style>
