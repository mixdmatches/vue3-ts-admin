//leyout 组件相关配置仓库
import { defineStore } from 'pinia'
const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //控制菜单折叠控制
      refsh: false,
      fullScreen: false,
      menuWidth: 200,
      menuActiveName: 'home',
    }
  },
})

export default useLayOutSettingStore
