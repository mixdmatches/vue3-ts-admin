export const constantRoute = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',//菜单需要的标题
      hidden: true,//true表示隐藏在菜单中
    }
  },
  // layout首页
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',//菜单标题
      hidden: false,
    },
    redirect:'/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',//菜单标题
          hidden: false,
          icon:"House"
        },
      }
    ]
  },
  // 数据大屏
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: "Screen",
    meta: {
      title: '数据大屏',//菜单标题
      icon:"Monitor"
    }
  },
  // 权限管理
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: "Acl",
    meta: {
      title: '权限管理',
      icon:"Lock"
    },
    redirect:'/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: "User",
        meta: {
          title: "用户管理",
          icon:'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/premission',
        component: () => import('@/views/acl/premission/index.vue'),
        name: "Premission",
        meta: {
          title: "菜单管理",
          // icon: 'Monitor',
          icon:'Tickets'
        }
      }
    ]
  },
  // 商品管理
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect:'/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component:()=>import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: "品牌管理",
          icon: 'ShoppingCart'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: "属性管理",
          icon: 'ChromeFilled'
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: "SPU管理",
          icon: 'Calendar'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: "SKU管理",
          icon: 'Orange'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',//菜单
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',//菜单
      hidden: true,
    },
  }
]