<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from "vue"
const props = defineProps({
  // 显示的svg
  name: {
    type: String,
    required: true,
  },
  // svg 图标的颜色
  color: {
    type: String,
  },
  // tailwind 指定 svg颜色的类名
  fillClass: {
    type: String,
  },
})

// 真实显示的svg图标（拼接#icon-）
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped></style>
