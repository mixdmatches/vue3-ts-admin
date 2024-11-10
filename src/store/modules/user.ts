// //创建用户相关的小仓库
import { defineStore } from "pinia";
//引入数据类型
//引入类型
import type { loginFormData, loginResponseData,userInfoResponseData } from '@/api/user/type'
import type { UserState } from "./types/type";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
//引入操作本地存储持久化数据
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入路由(常量路由)
import { constantRoute } from "@/router/routers";
const useUserStore = defineStore('User', {
  state: (): UserState => ({
    // 初始化状态属性
    token: GET_TOKEN() || '',
    menuRoutes: constantRoute,//仓库存储生成菜单需要的数组（路由）
    username: '',
    avatar:''
  }),
  //异步|逻辑
  actions: {
    //用户登录方法
    async userLogin(data:loginFormData) {
      //引入api方法
      //登录请求：200-》token
      //请求失败：201-》登录失败的错误信息
      const res:loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        this.token = (res.data as string)
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    //获取用户信息
    async getUserInfo() {
      const res: userInfoResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 退出登录
    async userLogout() {
      const res = await reqLogout()
      if (res.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  },
  getters: {
    // 定义你的getter
  }
});
export default useUserStore;
