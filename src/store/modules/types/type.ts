//路由对象的ts类型，自带的
import type { RouteRecordRaw } from "vue-router"
//定义小仓库数据state类型
export interface UserState { 
  token: string | null,
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string
}