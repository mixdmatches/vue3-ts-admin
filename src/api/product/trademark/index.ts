//品牌管理模块接口
import request from '@/utils/request'
//品牌管理模块接口地址
enum API {
  TRADEMARK_URL='/admin/product/baseTrademark/'
}
//获取已有品牌的接口方法
//page:获取第几页--默认第一页
//limit:每页显示多少条数据--默认10条
export const reqHasTrademark = (page:number,limit:number)=>request.get<any,any>(API.TRADEMARK_URL+`${page}/${limit}`)