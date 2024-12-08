import pinia from "@/store";
import useUserStore from "@/store/modules/user";

let userStore = useUserStore(pinia);
// 全局自定义指令
export const isHasButton = (app: any) => {
  // 获取对应的用户仓库
  // 全局的自定义指令
  // v-has
  app.directive("has", {
    // 指令的钩子函数,会在挂载完成之后执行
    mounted(el: any, option: any) {
      // el是自定义指令绑定的那个元素,option是指令的对象
      if (!userStore.buttons.includes(option.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
};
