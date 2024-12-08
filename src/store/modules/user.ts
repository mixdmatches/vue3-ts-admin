// //创建用户相关的小仓库
import { defineStore } from "pinia";
//引入数据类型
//引入类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
import type { UserState } from "./types/type";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
//引入操作本地存储持久化数据
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入路由(常量路由)
import { constantRoute, asyncRoute, anyRoute } from "@/router/routers";

// 引入路由
import router from "@/router";

// 引入深拷贝方法
// @ts-ignore
import cloneDeeep from "lodash/cloneDeep";

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    // 判断路由是否存在
    if (routes.includes(item.name)) {
      // 过滤子路由
      if (item.children && item.children.length) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

const useUserStore = defineStore("User", {
  state: (): UserState => ({
    // 初始化状态属性
    token: GET_TOKEN() || "",
    menuRoutes: constantRoute, //仓库存储生成菜单需要的数组（路由）
    username: "",
    avatar: "",
    buttons: [],
  }),
  //异步|逻辑
  actions: {
    //用户登录方法
    async userLogin(data: loginFormData) {
      //引入api方法
      //登录请求：200-》token
      //请求失败：201-》登录失败的错误信息
      const res: loginResponseData = await reqLogin(data);
      if (res.code === 200) {
        this.token = res.data as string;
        SET_TOKEN(this.token);
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    //获取用户信息
    async getUserInfo() {
      const res: userInfoResponseData = await reqUserInfo();
      console.log(res.data.routes, "userres");
      if (res.code === 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        // 计算当前用户需要展示的路由
        console.log("计算前");
        let userAsyncRoutes = filterAsyncRoute(
          cloneDeeep(asyncRoute),
          res.data.routes
        );
        console.log("计算后");

        // 菜单需要的路由数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoutes, anyRoute];
        // 注册路由
        [...userAsyncRoutes, anyRoute].forEach((item) => {
          router.addRoute(item);
        });
        console.log(router.getRoutes(), "routersaaaa");
        // 按钮的权限
        this.buttons = res.data.buttons;
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 退出登录
    async userLogout() {
      const res = await reqLogout();
      if (res.code === 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {
    // 定义你的getter
  },
});
export default useUserStore;
