<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input placeholder="价格（元）" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        type="textarea"
        placeholder="SKU描述"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select
            v-model="item.attrIdAndValueId"
            style="width: 150px"
            placeholder="请选择"
          >
            <el-option
              :value="`${item.id}:${attrValue.id}`"
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.attrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form>
        <el-form-item
          v-for="item in saleArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select style="width: 150px" placeholder="请选择">
            <el-option
              :value="`${item.id}:${saleAttrValue.id}`"
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table ref="tableRef" border :data="imgArr">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <img style="height: 50px" :src="row.imgUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handler(row)"
              >设为默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { SkuData } from '@/types/sku'
let $emit = defineEmits(['changeScence'])
// i引入API
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu'
// 平台属性
let attrArr = ref<any>([])
// 销售属性
let saleArr = ref<any>([])
// 照片数据
let imgArr = ref<any>([])
// 获取table组件实例
let tableRef = ref()
// 收集Sku参数
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  // v-model收集
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
  skuImageList: [],
})
// 取消按钮回调
const cancel = () => {
  $emit('changeScence', 0)
}
// 保存按钮回调
const save = async () => {
  //整理参数
  //平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev, next) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId: attrId,
        attrValueId: valueId,
      })
    }
    return prev
  }, [])
  // 销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev, next) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev
  }, [])
  //发请求
  let result = await reqAddSku(skuParams)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '添加成功' })
    // 通知父组件切换场景名
    $emit('changeScence', 0)
  } else {
    ElMessage({ type: 'error', message: '添加失败' })
  }
}
// 设置默认图片
const handler = (row) => {
  // 取消所有选中
  imgArr.value.forEach((item) => {
    tableRef.value.toggleRowSelection(item, false)
  })
  // 复选框选中
  tableRef.value.toggleRowSelection(row, true)
  // 收集图片地址
  skuParams.skuDefaultImg = row.imgUrl
}

// 对外暴露
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu,
) => {
  // 收集数据
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  // 获取平台属性
  let res = await reqAttr(c1Id, c2Id, spu.category3Id)
  // 获取销售属性
  let res2 = await reqSpuHasSaleAttr(spu.id)
  // 获取spu图片
  let res3 = await reqSpuImageList(spu.id)
  attrArr.value = res.data
  saleArr.value = res2.data
  imgArr.value = res3.data
}
defineExpose({
  initSkuData,
})
</script>

<style scoped></style>
