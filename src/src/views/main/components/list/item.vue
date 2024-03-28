<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{ backgroundColor: randomRGB() }"
      @click="onToPinsClick"
    >
      <!-- 图片 -->
      <img
        v-lazy
        ref="imgTarget"
        class="w-full rounded bg-transparent"
        :src="data.photo"
        :style="{ height: (width / data.photoWidth) * data.photoHeight + 'px' }"
      />
      <!-- 遮罩层：在移动端下不会显示遮罩层，在pc端下展示 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5" @click="onShareClick">
          分享
        </m-button>
        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></m-button>
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ data.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { randomRGB } from "@/utils/color";
import { saveAs } from "file-saver";
import { message } from "@/libs";
import { useElementBounding, useFullscreen } from "@vueuse/core";
import { weiboShare } from "@/utils/share";

const prop = defineProps({
  data: {
    type: Object,
    required: true,
  },
  width: {
    type: Number,
  },
});

/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  message("success", "图片开始下载");

  // 延迟一段时间执行，可以得到更好的体验
  setTimeout(() => {
    /**
     * 1.下载的图片链接
     */
    saveAs(prop.data.photoDownLink);
  });
};
/**
 * 生成全屏的方法
 */
const imgTarget = ref(null);
const { enter: onImgFullScreen } = useFullscreen(imgTarget);
/**
 * pins 跳转记录，记录图片的中心点 (X | Y 位置 + 宽 | 高 一半)
 */
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight,
} = useElementBounding(imgTarget);
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2),
  };
});

const emits = defineEmits(["click"]);
/**
 * 进入详情点击事件
 */
const onToPinsClick = () => {
  emits("click", {
    id: prop.data.id,
    location: imgContainerCenter.value,
  });
};

/**
 * 分享按钮点击处理
 */
const onShareClick = () => {
  weiboShare(
    prop.data.photo,
    `https://imooc-front.lgdsunday.club/pins/${prop.data.id}`
  );
};
</script>

<style scoped lang="scss"></style>
