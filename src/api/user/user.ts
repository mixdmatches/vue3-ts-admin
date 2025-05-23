import request from '@/utils/request'
//引入类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/types/my'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息得接口
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
