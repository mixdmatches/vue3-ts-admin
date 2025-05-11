import pinia from '@/store'
import useUserStore from '@/store/modules/user'
import { App } from 'vue'

const userStore = useUserStore(pinia)
// 全局自定义指令
export const isHasButton = (app: App) => {
  app.directive('has', {
    mounted(el: HTMLElement, option: { value: string }) {
      // el是自定义指令绑定的那个元素,option是指令的对象
      if (!userStore.buttons.includes(option.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}
