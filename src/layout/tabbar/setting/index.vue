<template>
  <div class="tabbar_right">
    <el-button
      type="primary"
      plain
      size="small"
      circle
      icon="Refresh"
      @click="updateRefsh"
    ></el-button>
    <el-button
      type="primary"
      plain
      size="small"
      circle
      icon="FullScreen"
      @click="fullScreen"
    ></el-button>

    <el-popover
      placement="bottom"
      title="主题设置"
      :width="300"
      trigger="click"
    >
      <!-- 表单元素 -->
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            :teleported="false"
            @change="setColor"
            size="small"
            v-model="color"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button
          type="primary"
          plain
          size="small"
          circle
          icon="Setting"
        ></el-button>
      </template>
    </el-popover>

    <img :src="userStore.avatar" alt="" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

//获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayOutSettingStore()
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
//开关数据
let dark = ref(false)
//刷新点击按钮回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//全屏按钮点击回调
const fullScreen = () => {
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
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

// 主题颜色组件数据
const color = ref('rgba(64, 158, 255)')

// 设置主题颜色
const setColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  // 设置禁用按钮的背景颜色
  html.style.setProperty('--el-button-disabled-bg-color', color.value)
  // 设置禁用按钮的边框颜色
  html.style.setProperty('--el-button-disabled-border-color', color.value)
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
    margin: 0 10px;
  }
}
</style>
