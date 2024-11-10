<template>
  <div class="tabbar_right">
    <el-button type="primary" plain size="small" circle icon="Refresh" @click="updateRefsh"></el-button>
    <el-button type="primary" plain size="small" circle icon="FullScreen" @click="fullScreen"></el-button>
    <el-button type="primary" plain size="small" circle icon="Setting"></el-button>
    <img :src="userStore.avatar" alt="">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username}}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

//获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting';
const layoutSettingStore = useLayOutSettingStore()
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()

//刷新点击按钮回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//全屏按钮点击回调
const fullScreen = () => { 
  console.log(document.fullscreenElement)
  let full = document.fullscreenElement
  if (!full) {
    //利用文档的根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
//退出登录点击回调
const loginOut = async () => {
  await userStore.userLogout()
  $router.push({path:'/login',query:{redirect:$route.path}})
}

</script>

<style scoped lang="scss">
.tabbar_right {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin:0 10px;
  }
}
</style>