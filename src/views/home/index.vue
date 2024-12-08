<template>
  <div class="box">
    <img :src="userStore.avatar" alt="" />
    <div class="right">
      <h1>{{ getTime() }}好ʕ •ᴥ•ʔAdmin</h1>
      <p>Vue-Admin</p>
    </div>
    <img src="@/assets/images/coffee-BJTYvIRC.svg" alt="" />
  </div>
  <el-card shadow="never" style="margin: 30px 0">
    <template #header>
      <div>
        <span>技术栈</span>
      </div>
    </template>
    <div class="content">
      <div class="item" v-for="item in list" :key="item">
        <div class="logo">
          <img :src="item.img" alt="" />
          <button :style="`background-color:${item.color}`" size="small">
            <a :href="item.href" target="_blank">Go</a>
          </button>
        </div>
        <div class="item-content">{{ item.content }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
//引入获取当前时间得函数
import { getTime } from '@/utils/time'
//引入组合式API函数之生命周期函数
import { onMounted } from 'vue'
//获取仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
//目前首页挂载完毕发请求获取用户信息
onMounted(() => {
  userStore.getUserInfo()
})
//技术栈
const list = [
  {
    img: 'https://dragon-xjy.atomgit.net/xjy-admin/assets/vue-D4l7V1hr.png',
    color: 'rgb(65, 184, 131)',
    content:
      '渐进式JavaScript 框架易学易用，性能出色，适用场景丰富的 Web 前端框架。',
    href: 'https://cn.vuejs.org/guide/introduction.html',
  },
  {
    img: 'https://dragon-xjy.atomgit.net/xjy-admin/assets/pinia-4CdhEOYF.svg',
    color: 'rgb(255, 198, 30)',
    content: 'Pinia 符合直觉的 Vue.js 状态管理库',
    href: 'https://pinia.web3doc.top/',
  },
  {
    img: 'https://dragon-xjy.atomgit.net/xjy-admin/assets/element-DBcMjyMb.png',
    color: 'rgb(64, 158, 255)',
    content:
      '网站快速成型工具， Element-plus一套为开发者、设计师和产品经理准备的桌面端组件库',
    href: 'https://element-plus.org/zh-CN/',
  },
  {
    img: 'https://dragon-xjy.atomgit.net/xjy-admin/assets/ts-B5SDG0Zo.png',
    color: 'rgb(0, 122, 204)',
    content:
      'TypeScript具有类型系统，且是JavaScript的超集。 它可以编译成普通的JavaScript代码。',
    href: 'https://www.tslang.cn/',
  },
  {
    img: 'https://dragon-xjy.atomgit.net/xjy-admin/assets/vite-9o_aqrTe.png',
    color: 'rgb(156, 92, 254)',
    content: 'Vite 下一代的前端工具链 为开发提供极速响应',
    href: 'https://cn.vitejs.dev/',
  },
  {
    img: 'https://dragon-xjy.atomgit.net/xjy-admin/assets/ECharts-0anMtBro.png',
    color: 'rgb(169, 49, 77)',
    content: 'Apache ECharts 一个基于 JavaScript 的开源可视化图表库',
    href: 'https://echarts.apache.org/zh/index.html',
  },
]
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white;
}
.box {
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  display: flex;
  padding: 20px;
  width: 50%;
  align-items: center;
  border: 1px solid rgb(228, 231, 237);
  border-radius: 10px;
  // box-shadow: 10px 10px 0px 0 rgba(177, 177, 177, 0.3);
  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    margin-left: 30px;
    h1 {
      font-size: 30px;
      font-weight: 700;
      background: -webkit-linear-gradient(left, #000000, #b2b2b2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 20px;
      color: rgb(204, 204, 204);
      font-style: italic;
    }
  }
}
.box:hover {
  transform: translateZ(-10px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  .item {
    border-radius: 5px;
    border: 1px solid rgb(228, 231, 237);
    padding: 10px;
    transition:
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 5px 0;
      img {
        height: 50px;
        width: 50px;
      }
      button {
        background-color: aqua;
        padding: 3px 10px;
        border: none;
        border-radius: 5px;
        font-size: x-small;
      }
    }
    .item-content {
      font-size: 14px;
      line-height: 1.5;
      font-weight: 300;
    }
  }
  .item:hover {
    transform: translateZ(-10px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
