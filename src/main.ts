import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";
// @ts-ignore
import "virtual:svg-icons-register";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "@/styles/index.scss";
//引入自定义插件对象：注册整个项目的全局组件
import globalComponents from "@/components";
// app.use(globalComponents)
console.log(globalComponents);
//安装自定义插件

import "./premisstion";
// 引入自定义指令
import { isHasButton } from "./directive/has";
("./directive");

const app = createApp(App);
isHasButton(app);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(globalComponents);
app.use(router);
app.use(pinia);
console.log(import.meta.env);
app.mount("#app");
