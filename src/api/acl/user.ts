import request from '@/utils/request'
import {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from '@/types/user'
enum API {
  // 获取管理用户列表
  GETUSERLIST = '/admin/acl/user/',
  // 新增用户
  ADDUSER = '/admin/acl/user/save',
  // 更新用户
  UPDATEUSER = '/admin/acl/user/update',
  // 根据用户获取角色数据
  GETUSERROLE = '/admin/acl/user/toAssign/',
  // 给已有用户分配
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除
  DELETEUSERBATCH_URL = '/admin/acl/user/batchRemove',
}

export const getUserList = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.GETUSERLIST + `${page}/${limit}?username=${username}`,
  )

export const reqAddOrUpdataUser = (data: User) => {
  if (data.id) {
    return request.put<any, UserResponseData>(API.UPDATEUSER, data)
  } else {
    return request.post<any, UserResponseData>(API.ADDUSER, data)
  }
}

// 获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.GETUSERROLE + userId)

// 分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)

// 删除单个用户
export const reqDeleteUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId)

// 批量删除
export const reqDeleteUserBatch = (idList: number[]) =>
  request.delete<any, any>(API.DELETEUSERBATCH_URL, {
    data: idList,
  })
