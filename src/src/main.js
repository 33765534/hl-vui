import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import store from "./store";
import { useREM } from "./utils/flexible";
import mDirecttives from "./directives";
import mLibs from "./libs";
import useTheme from "./utils/theme";
// 注册 svg-icons (createSvgIconsPlugin生成的是虚拟地址)
import "virtual:svg-icons-register";
import "./permission";

useREM();
useTheme();
createApp(App)
  .use(router)
  .use(store)
  .use(mLibs)
  .use(mDirecttives)
  .mount("#app");
