import request from "@/utils/request";
import { premissionResponseData, MenuParams } from "./type";
enum API {
  //获取菜单
  GETMENU_URL = "/admin/acl/permission",
  // 给某一级新增一个子菜单
  ADDMENU_URL = "/admin/acl/permission/save",
  // 更新某一个已有的菜单
  UPDATEMENU_URL = "/admin/acl/permission/update",
  // 删除已有菜单
  DELETEMENU_URL = "/admin/acl/permission/remove/",
}

//获取菜单
export const reqMenuList = () =>
  request.get<any, premissionResponseData>(API.GETMENU_URL);

// 添加与更新的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data);
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data);
  }
};

// 删除菜单
export const reqDeleteMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id);
