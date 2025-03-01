<template>
  <div>
    <Category :sence="sence"></Category>
    <el-card style="margin: 10px 0" shadow="never">
      <div v-if="sence">
        <el-button
          :disabled="categoryStore.c3Id ? false : true"
          icon="Plus"
          type="primary"
          @click="addAttr"
          >添加平台属性</el-button
        >
        <el-table :data="attrArr" border style="margin: 10px 0">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                type="primary"
                plain
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                @confirm="deleteAttr(row.id)"
                :title="`确认删除${row.attrName}吗？`"
              >
                <template #reference>
                  <el-button
                    type="warning"
                    plain
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form>
          <el-form-item style="width: 220px" label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          size="small"
          type="primary"
          icon="Plus"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button size="small" @click="cancel">取消</el-button>
        <el-table
          :data="attrParams.attrValueList"
          border
          style="margin: 10px 0"
        >
          <el-table-column
            width="80px"
            type="index"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                @blur="toLook(row, $index)"
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
              ></el-input>
              <div @click="toEdit(row, $index)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button
                @click="attrParams.attrValueList.splice($index, 1)"
                type="warning"
                size="small"
                icon="Delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          size="small"
          type="primary"
          @click="save"
          >保存</el-button
        >
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//获取已有属性和属性值接口
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
//input聚焦
//准备一个数组：将来存储对应的组件实例el-input
let inputArr = ref<any>([])
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增的属性名字
  attrValueList: [], //新增的属性值数组
  categoryId: '', //三级分类ID
  categoryLevel: 3, //代表的是三级分类
})
//存储已有的属性和属性值
let attrArr = ref<Attr[]>([])
//监听仓库三级分类ID的变化
watch(
  () => categoryStore.c3Id,
  async () => {
    //清除上一次查询的属性和属性值
    attrArr.value = []
    //保证三级分类有才能发请求
    if (!categoryStore.c3Id) {
      return
    }
    getAttr()
  },
)
//获取已有属性和属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  console.log(123)

  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  console.log(res, 'res')
  if (res.code === 200) {
    attrArr.value = res.data
  }
}
//场景切换
let sence = ref(1)
//添加平台属性按钮回调函数
const addAttr = () => {
  sence.value = 0
  //每次点击先清空数据再收集数据
  Object.assign(attrParams, {
    attrName: '', //新增的属性名字
    attrValueList: [], //新增的属性值数组
    categoryId: '', //三级分类ID
    categoryLevel: categoryStore.c3Id, //代表的是三级分类
  })
}
//修改按钮的回调
const updateAttr = (row: Attr) => {
  //收集数据
  //！！！！！！注意注意！这是浅拷贝，如果修改了属性值名称，也会修改原有的属性值名称，就算不点击保存，点击取消后还是会影响到原数据，所以要深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))

  //切换场景
  sence.value = 0
}

//取消按钮的回调
const cancel = () => {
  sence.value = 1
}
//添加属性值按钮的回调
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制没一个属性值编辑模式与查看模式的切换
  })
  //input聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存按钮的回调
const save = async () => {
  //发送请求
  const res = await reqAddOrUpdateAttr(attrParams)
  console.log(res, 'attrres')
  //添加|修改已有属性已经成功
  if (res.code === 200) {
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    //切换场景
    sence.value = 1
    //获取全部已有的属性和属性值
    getAttr()
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}
// 查看模式---input表单失去焦点时
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if (row.valueName.trim() === '') {
    ElMessage.error('属性值名称不能为空')
    attrParams.attrValueList.splice($index, 1)
    return
  }
  //非法情况判断2
  let repeat = attrParams.attrValueList.find((item) => {
    //切记把当前缺失焦点属性值的对象从当前数组中扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  //如果有重复的
  if (repeat) {
    ElMessage.error('属性值名称不能重复')
    return
  }
  row.flag = false
}
// 编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  //nextTick:响应式数据发生变化，获取更新DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
  row.flag = true
}
//删除某一个属性的方法回调1
const deleteAttr = async (id: number) => {
  const res: any = await reqDeleteAttr(id)
  console.log(res)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getAttr()
  } else {
    ElMessage.error('删除失败')
  }
}
//路由切换时清除仓库数据
//onBeforeUnmount在组件卸载之前调用。这个钩子通常用于清理组件实例中的副作用，例如取消订阅事件、清除定时器、解绑 DOM 事件等，以避免内存泄漏和不必要的资源消耗。
onBeforeUnmount(() => {
  //$reset方法清空仓库所有数据
  categoryStore.$reset()
})
</script>

<style scoped>
.el-card {
  border: none;
}
</style>
