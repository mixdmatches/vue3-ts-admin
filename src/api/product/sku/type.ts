import { ResponeseData } from "../trademark/type";

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Attr {
  id?: number | string;
  attrId: number | string;
  valueId: number | string;
  valueName: string;
}

export interface saleAttr {
  id?: number | string;
  saleAttrId: number | string;
  saleAttrValueId: number | string;
  saleAttrValueName: string;
}

export interface SkuData {
  category3Id?: string | number;
  spuId?: string | number;
  tmId?: string | number;
  skuName?: string;
  price?: string | number;
  weight?: string | number;
  skuDesc?: string;
  skuAttrValueList?: Attr[];
  skuSaleAttrValueList?: saleAttr[];
  skuDefaultImg?: string;
  isSale?: number;
  id?: number;
  skuImageList: ImageItem[];
}
type ImageItem = {
  id?: number;
  imgUrl?: string;
};
// 获取SKU接口返回数据类型
export interface SkuResponseData extends ResponeseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

// 获取sku商品详情接口类型
export interface SkuInfoData extends ResponeseData {
  data: SkuData;
}
