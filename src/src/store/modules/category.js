import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from "@/constants";
import { getCategory } from "@/api/category";

/**
 * 处理 navigationBar 中的数据 categorys
 */
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      categorys: [ALL_CATEGORY_ITEM, ...CATEGORY_NOMAR_DATA],
    };
  },
  mutations: {
    // 为 categorys 赋值
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys];
    },
  },
  actions: {
    // 获取 categorys 数据，并自动保存到vuex中
    async useCategoryData(context) {
      const categorys = await getCategory();
      context.commit("setCategorys", categorys);
    },
  },
};
