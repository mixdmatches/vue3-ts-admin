import request from "@/utils/request";
import { UserResponseData } from "./type";
enum API {
  // 获取管理用户列表
  GETUSERLIST = "/admin/acl/user/",
}

export const getUserList = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.GETUSERLIST + `${page}/${limit}`);
