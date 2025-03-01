//路由对象的ts类型，自带的
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

//定义分类仓库state对象的ts类型
export interface CategoryState {
  c1Id: number | string
  c1List: CategoryObj[]
  c2List: CategoryObj[]
  c2Id: number | string
  c3List: CategoryObj[]
  c3Id: number | string
}
