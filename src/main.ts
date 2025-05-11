import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/styles/index.scss'

//引入自定义插件对象：注册整个项目的全局组件
import globalComponents from '@/components'

import './premisstion'

import { isHasButton } from './directive/has'

const app = createApp(App)

isHasButton(app)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponents)
app.use(router)
app.use(pinia)
app.mount('#app')
