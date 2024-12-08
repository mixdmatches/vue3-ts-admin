import request from "@/utils/request";
import type { AllRoleResponseData, MenuResponseData } from "./type";
enum API {
  //获取所有职位
  GETROLES_URL = "/admin/acl/role/",
  // 新增职位
  ADDROLE_URL = "/admin/acl/role/save",
  // 编辑职位
  EDITROLE_URL = "/admin/acl/role/update",
  // 删除角色
  DELETEROLE_URL = "/admin/acl/role/remove/",
  // 根据角色获取菜单
  GETPERMISSION_URL = "/admin/acl/permission/toAssign/",
  // 给相应职位分配权限
  ASSIGNPERMISSION_URL = "/admin/acl/permission/doAssign/?",
}

//获取所有职位
export const reqGetRoles = (page: number, limit: number, roleName: string) =>
  request.get<any, AllRoleResponseData>(
    API.GETROLES_URL + `${page}/${limit}?roleName=${roleName}`
  );

//新增或编辑职位
export const reqAddOrEditRole = (data: any) => {
  if (data.id) {
    return request.put<any, any>(API.EDITROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};

// 删除角色
export const reqDeleteRole = (id: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + id);

// 根据角色获取菜单
export const reqGetPermission = (roleId: number) =>
  request.get<any, MenuResponseData>(API.GETPERMISSION_URL + roleId);

// 给相应职位分配权限
export const reqAssignPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.ASSIGNPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`
  );
