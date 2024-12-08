<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <button @click="router.push('/home')">返回首页</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    width: 800px;
    height: 400px;
  }
  button {
    // width: 50px;
    border-radius: 20px;
    padding: 20px;
    // height: 30px;
  }
}
</style>
