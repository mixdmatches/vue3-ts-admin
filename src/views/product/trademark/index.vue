<template>
  <el-card shadow="naver">
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <el-table :data="trademarkList" style="margin:10px 0" border>
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <!-- table-column:默认展示数据用div -->
      <!-- 如果div不满足需求，用插槽 -->
      <el-table-column prop="tmName" label="品牌名称">
        <template #="{row}">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{row}">
          <img :src="row.logoUrl" alt="图片消失了ʕ  •ᴥ•ʔ……" height="50px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3,5,7,9]"
      background="true" layout="prev, pager, next, jumper,->,total, sizes, " :total="total" />
  </el-card>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark';
let currentPage = ref(4)
let pageSize = ref(3)
let total = ref(20)
let pageNo = ref<number>(1)
let limit = ref<number>(3)
//存储已有品牌的数组
let trademarkList = ref<Array<any>>([])

//获取已有品牌的接口封装为一个函数：在任何情况下获取数据，都可以调用这个函数
const getHasTrademark = async () => {
  const res = await reqHasTrademark(pageNo.value, limit.value)
  console.log(res)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkList.value = res.data.records
  }
}
//组件挂载完毕---发一次请求，获取第1页，一页3个品牌数据
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped></style>