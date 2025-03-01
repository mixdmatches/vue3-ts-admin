<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <div class="logo">
        <img src="@/assets/icons/vite.svg" alt="Vite logo" />
        <h2 v-if="!layOutSettingStore.fold">Vue-Admin</h2>
        <!-- <img style="height:40px" src="@/assets/icons/vue.svg" class="logo" alt="Vite logo" /> -->
      </div>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="rgb(251, 251, 251)"
          :collapse="layOutSettingStore.fold"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 主题内容 -->
    <div
      class="layout_main"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入菜单组件
import Menu from './menu/index.vue'
//引入右侧内容展示区域main
import Main from './main/index.vue' //引入右侧内容展示区
//引入头部导航
import Tabbar from './tabbar/index.vue'
//获取路由对象
import { useRoute } from 'vue-router'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
const $route = useRoute()
//获取layout配置的仓库
import useLayOutSettingStore from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: rgb(251, 251, 251);
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    transition: all 0.5s;
    .el-menu {
      border-right: 0;
    }
    .logo {
      width: 100%;
      height: $base-tabbar-height;
      background: rbg(251, 251, 251);
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      img {
        width: 40px;
        height: 40px;
      }
      h2 {
        font-size: 20px;
        transition: all 0.5s;
      }
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);
      background: rbg(251, 251, 251);
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    padding: 0 20px;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: rgb(251, 251, 251);
    transition: all 0.5s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    border: 1px solid rgb(228, 228, 231);
    border-right: none;
    border-top-left-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    background-color: white;
    overflow: auto;
    transition: all 0.5s;
    padding: 20px;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
