<template>
  <div class="tabbar_left">
    <!-- 收缩图标 -->
    <el-icon @click="changeIcon">
      <component :is="!LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item class="flex" :to="item.path" v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title">
        <!-- <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon> -->
        <span style="margin-left:5px">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
//获取layout配置的仓库
const LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
//获取路由对象
import {useRoute} from 'vue-router'
const $route = useRoute()
</script>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}
.flex{
  display: flex;
  align-items: center;
}
</style>