<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="Main">
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
//监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
//控制当前组件是否销毁重建
let flag = ref(true)
watch(
  () => layOutSettingStore.refsh,
  () => {
    //点击刷新按钮：路由组件销毁
    flag.value = false
    //销毁后在创建
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
