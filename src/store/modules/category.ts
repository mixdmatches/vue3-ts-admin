//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
import { ElMessage } from 'element-plus'
//导入api
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1List: [],
      c1Id: '',
      c2List: [],
      c2Id: '',
      c3List: [],
      c3Id: '',
    }
  },
  actions: {
    //获取一级分类
    async getC1() {
      const res: CategoryResponseData = await reqC1()
      if (res.code === 200) {
        this.c1List = res.data
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
        })
      }
    },
    //获取二级分类
    async getC2() {
      const res: CategoryResponseData = await reqC2(this.c1Id)
      if (res.code === 200) {
        this.c2List = res.data
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
        })
      }
    },
    //获取三级分类
    async getC3() {
      const res: CategoryResponseData = await reqC3(this.c2Id)
      if (res.code === 200) {
        this.c3List = res.data
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
        })
      }
    },
  },
})
export default useCategoryStore
