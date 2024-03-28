<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="beforEnter"
      @after-leave="afterLeave"
    >
      <KeepAlive :includes="virtualTaskStack">
        <component
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
          :is="Component"
          ::key="$route.fullPath"
        ></component>
      </KeepAlive>
    </transition>
  </router-view>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

const NONE = "none";
const ROUTER_TYPE_PUSH = "push";
const ROUTER_TYPE_BACK = "back";

const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK];
</script>

<script setup>
const props = defineProps({
  // 路由的跳转类型，进入组件、退出组件
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPE_ENUM.includes(val);
      if (!result) {
        throw new Error(
          `你的 routerType 必须是 ${ROUTER_TYPE_ENUM.join("、")} 中的一个`
        );
      }
      return result;
    },
  },
  // 首页的组件名
  mainComponentName: {
    type: String,
    required: true,
  },
});

const router = useRouter();
// 跳转动画
const transitionName = ref("");
/**
 * router 的前置守卫
 */
router.beforeEach((to, from) => {
  // 定义当前动画名称
  transitionName.value = props.routerType;
  if (props.routerType === ROUTER_TYPE_PUSH) {
    // 入栈
    virtualTaskStack.value.push(to.name);
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    // 出栈
    virtualTaskStack.value.pop();
  }

  // 进入了首页，默认清空栈
  if (to.name === props.mainComponentName) {
    clearTask();
  }
});
// 处理动画状态
const isAnimation = ref(false);
const beforEnter = () => {
  isAnimation.value = true;
};
const afterLeave = () => {
  isAnimation.value = false;
};

// 虚拟任务栈的数组，用它来表示栈操作
const virtualTaskStack = ref([props.mainComponentName]);

/**
 * 清空栈
 */
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName];
};
</script>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.5s;
}
// push 页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.5s;
}
// push 页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
