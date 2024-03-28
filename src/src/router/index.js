import { createRouter, createWebHistory } from "vue-router"
import { isMobileTerminal } from "@/utils/flexible"
import mobileRoutes from "./modules/mobile-routes"
import pcRouters from "./modules/pc-routes"

// 创建vueRouter实例
const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileRoutes : pcRouters,
})

export default router
