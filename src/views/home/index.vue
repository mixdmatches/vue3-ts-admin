<template>
  <div>
    <h1>一级路由展示数据</h1>
    <img :src="userStore.avatar" alt="">
  </div>
</template>

<script setup>
//引入组合式API函数之生命周期函数
import { onMounted } from 'vue';
//获取仓库
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
//目前首页挂载完毕发请求获取用户信息
onMounted(() => {
  userStore.getUserInfo()
})

</script>

<style lang="scss" scoped>

</style>