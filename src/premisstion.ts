//路由鉴权：鉴权，项目当中路由能不能被访问的权限的设置（某一个路由什么条件下可以访问，什么条件下不可以访问）
import router from '@/router'
//获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
//全局守卫：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to, _from, next) => {
  document.title = '管理系统-' + to.meta.title
  //to:你将来要访问的哪个路由
  //from:你从哪个路由而来
  //next:放行函数
  // nprogress.start()
  //获取token
  const token = userStore.token
  const username = userStore.username
  if (token) {
    //登陆成功，不能访问login，指向首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      //登录成功访问其余的6个路由（登录排除）
      //有用户信息
      if (username) {
        //放行
        next()
      } else {
        //如果没有用户信息，在守卫这里发请求获取用户信息再放行
        try {
          // 获取用户信息
          await userStore.getUserInfo()
          // 放行
          // 异步路由还没加载完毕，会出现白屏问题
          // next()
          // 解决刷新时，动态路由没有显示的问题
          next({ ...to })
        } catch (_error) {
          //token过期：获取不到用户信息
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录判断
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫

router.afterEach((_to, _from) => {
  // nprogress.done()
})
