export interface ResponseData {
  code: number
  message: string
  ok: boolean
  data: object
  total: number
}

export interface premission {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: premissionList
  select: boolean
}

export type premissionList = premission[]

export interface premissionResponseData extends ResponseData {
  data: premissionList
}

// 添加和修改菜单携带的参数的ts类型
export type MenuParams = {
  id?: number
  code: string //权限值
  level: number //几级菜单
  name: string //菜单名称
  pid: number //菜单id
}
