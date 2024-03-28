<template>
  <m-popover>
    <!-- 具名插槽：触发弹层的视图 -->
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
      ></m-svg-icon>
    </template>
    <!-- 匿名插槽：弹出层视图中展示的内容 -->
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { computed } from "vue";
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from "@/constants";
import { useStore } from "vuex";
const store = useStore();

const themeArr = [
  {
    id: "0",
    type: THEME_LIGHT,
    icon: "theme-light",
    name: "极简白",
  },
  {
    id: "1",
    type: THEME_DARK,
    icon: "theme-dark",
    name: "极夜黑",
  },
  {
    id: "2",
    type: THEME_SYSTEM,
    icon: "theme-system",
    name: "跟随系统",
  },
];

/**
 * menu 切换事件
 */
const onItemClick = (themeItem) => {
  store.commit("theme/changeThemeType", themeItem.type);
};

/**
 * 展示图标
 */
const svgIconName = computed(() => {
  const findTheme = themeArr.find(
    (item) => item.type === store.getters.themeType
  );
  return findTheme?.icon || THEME_LIGHT;
});
</script>

<style scoped lang="scss"></style>
