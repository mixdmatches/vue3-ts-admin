export interface ResponseData {
  code: number
  message: string
  ok: boolean
  data: object
  total: number
}

//一个职位的ts类型
export interface RoleData {
  id?: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}

export type Records = RoleData[]

//获取所有职位响应数据ts类型
export interface AllRoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

// 菜单与按钮数据的ts类型
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuList
  select: boolean
}

export type MenuList = MenuData[]
// 菜单权限和按钮权限数据的ts类型
export interface MenuResponseData extends ResponseData {
  data: MenuList[]
}
