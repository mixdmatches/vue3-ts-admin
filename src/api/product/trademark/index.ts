//品牌管理模块接口
import request from '@/utils/request'
//引入类型
import type { TradeMarkResponseData,TradeMark} from './type'
//品牌管理模块接口地址
enum API {
  //获取已有的品牌的接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌的接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改品牌的接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除已有品牌
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/'
}
//获取已有品牌的接口方法
//page:获取第几页--默认第一页
//limit:每页显示多少条数据--默认10条
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

//添加与修改已有的品牌的方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //如果有id则为修改,如果没有id则为添加
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

//删除某一个品牌的方法
export const reqDeleteTrademark = (id:number)=>request.delete<any,any>(API.DELETETRADEMARK_URL+id)