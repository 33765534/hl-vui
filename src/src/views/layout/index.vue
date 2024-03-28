<template>
  <div>
    <header-vue class="h-header"></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderVue from "./components/header/index.vue";
import MainVue from "./components/main.vue";
import FloatingVue from "./components/floating.vue";
</script>

<style scoped lang="scss"></style>
