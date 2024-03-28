import { ALL_CATEGORY_ITEM } from "@/constants";
import { isMobileTerminal } from "@/utils/flexible";

/**
 * app 模块中的数据不会被缓存
 */
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      // 当前选中的分类
      currentCategory: ALL_CATEGORY_ITEM,
      // 路由跳转类型
      routerType: "none",
    };
  },
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory;
    },
    /**
     * 修改 routerType
     */
    changeRouterType(state, newCategory) {
      state.routerType = newCategory;
    },
  },
};
