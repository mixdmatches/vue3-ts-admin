<template>
  <el-card shadow="never">
    <el-form inline="true">
      <el-form-item label="一级分类">
        <el-select
          :disabled="sence === 0 ? true : false"
          @change="handler"
          v-model="categoryStore.c1Id"
          style="width: 240px"
        >
          <!-- label即为显示的属性 value即为下拉菜单的数据-->
          <el-option
            v-for="c1 in categoryStore.c1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="sence === 0 ? true : false"
          @change="handler1"
          style="width: 240px"
          v-model="categoryStore.c2Id"
        >
          <el-option
            v-for="c2 in categoryStore.c2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="sence === 0 ? true : false"
          style="width: 240px"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="c3 in categoryStore.c3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//引入仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
//引入生命周期函数的钩子
import { onMounted } from 'vue'
//组件挂载完毕后执行
onMounted(() => {
  //获取一级分类的数据
  getC1()
})
//通知仓库获取一级分类的方法
const getC1 = () => {
  //通知仓库获取一级分类的数据
  categoryStore.getC1()
}
//此方法为一级分类下拉菜单的change事件（选中值的时候会触发，保证一级分类ID有了）
const handler = () => {
  //清空二级，三级的数据
  categoryStore.c2Id = ''
  categoryStore.c3List = []
  categoryStore.c3Id = ''
  //通知仓库获取二级分类的数据
  categoryStore.getC2()
}
//此方法即为二级分类下拉菜单的change事件（选中值的时候会触发，保证二级分类ID有了）
const handler1 = () => {
  //清空三级的数据
  categoryStore.c3Id = ''
  categoryStore.c3List = []
  //通知仓库获取三级分类的数据
  categoryStore.getC3()
}
//接收父组件传递的值
defineProps(['sence'])
</script>

<style scoped></style>
