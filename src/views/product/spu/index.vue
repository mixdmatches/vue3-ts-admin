<template>
  <div>
    <Category :sence="!sence"></Category>
    <el-card shadow="never" style="margin: 10px 0">
      <div v-show="sence === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
          >添加SPU</el-button
        >
        <!-- 展示已有的SPU数据 -->
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            width="80px"
            align="center"
            type="index"
            label="序号"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="View"
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.spuName}?`"
                width="200px"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  >
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          :pager-count="9"
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->,total, sizes, "
          :total="total"
          @current-change="getHasSpu"
          @size-change="getHasSpu"
        />
      </div>
      <component
        :is="spuFormComponent"
        v-if="sence === 1"
        @changeScene="changeScene"
      ></component>
      <component
        :is="skuFormComponent"
        v-if="sence === 2"
        @changeScence="changeScene"
      ></component>
      <!-- dialog对话框 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="{ row }">
              <img :src="row.skuDefaultImg" alt="" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, defineAsyncComponent } from 'vue'
import { ElMessage } from 'element-plus'
import type {
  HasSpuResponseData,
  Records,
  SpuData,
  SkuInfoData,
  SkuData,
} from '@/types/spu'
import { reqHasSpu, reqSkuInfo, reqDeleteSpu } from '@/api/product/spu.ts'
// import SpuForm from './SpuForm.vue'
// import SkuForm from './SkuForm.vue'
import useCategoryStore from '@/store/modules/category'
const spuFormComponent = ref(
  defineAsyncComponent(() => import('./SpuForm.vue')),
)
const skuFormComponent = ref(
  defineAsyncComponent(() => import('./SkuForm.vue')),
)
const categoryStore = useCategoryStore()
let sence = ref<number>(0) //0:显示已有SPU--- 1:添加或修改已有SPU---2:添加SKU结构
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>()
//存储已有的SPU数据
let records = ref<Records>([])
//获取spu实例
const spuRef = ref()
// 获取sku实例
const skuRef = ref()
// 存储全部SKU数据
let skuArr = ref<SkuData[]>([])
let show = ref(false)
//监听三级分类id的变化，一发生变化就发送请求
watch(
  () => categoryStore.c3Id,
  () => {
    //务必保证有三级分类id
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
//发送请求
const getHasSpu = async () => {
  const res: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    limit.value,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
// 点击添加SPU按钮
const addSpu = () => {
  //切换场景1：添加与修改已有SPU结构->spuform
  sence.value = 2
  //添加添加spu按钮，调用子组件方法
  spuRef.value.initAddSpu(categoryStore.c3Id)
}
//子组件SpuForm绑定的自定义事件：目前是让子组件通知父组件切换场景为0
const changeScene = (num: number) => {
  //子组件Spuform点击取消变为场景0：展示已有的SPU
  sence.value = num
  //再次获取全部已有的SPU
  getHasSpu()
}
//修改已有SPU按钮回调
const updateSpu = (row: SpuData) => {
  sence.value = 1
  spuRef.value.initHasSpuData(row)
}

// 添加SKU按钮回调
const addSku = (row: SpuData) => {
  sence.value = 2
  // 调用子组件方法初始化添加sku
  //row里面自带c3Id和spuId和id
  skuRef.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

//查看SKU列表的数据
const findSku = async (row: SpuData) => {
  const res: SkuInfoData = await reqSkuInfo(row.id as number)
  skuArr.value = res.data
  show.value = true
}

// 删除SPU按钮回调
const deleteSpu = async (row: SpuData) => {
  const res = await reqDeleteSpu(row.id as number)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    await getHasSpu()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}

// 路由组件销毁前
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
