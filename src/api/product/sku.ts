import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from '@/types/sku'
enum API {
  SKU_URL = '/admin/product/list/',
  // 上架
  SALE_URL = '/admin/product/onSale/',
  // 下架
  CANCEL_URL = '/admin/product/cancelSale/',
  // 商品详情
  SKU_DETAIL_URL = '/admin/product/getSkuInfo/',
  // 删除sku
  DELETE_SKU_URL = '/admin/product/deleteSku/',
}

export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

export const reqSaleSku = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)

export const reqCanselSku = (skuId: number) =>
  request.get<any, any>(API.CANCEL_URL + skuId)

export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKU_DETAIL_URL + skuId)

export const reqDeleteSku = (skuId: number) =>
  request.delete<any, any>(API.DELETE_SKU_URL + skuId)
