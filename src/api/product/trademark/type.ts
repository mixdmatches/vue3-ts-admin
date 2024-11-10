export interface ResponeseData{
  code: number,
  message: string,
  ok:boolean
}

//已有品牌的ts数据类型
export interface TradeMark{
  id?: number,
  tmName: string,
  logoUrl:string
}

//包含全部品牌数据的ts类型
export type Records = TradeMark[];

//获取已有全部品牌的数据的ts类型