# Vue3 Admin Template

这是一个基于 Vue3 的后台管理系统模板，使用了以下技术栈：

## 技术栈

- Vue3
- TypeScript
- Pinia
- Element Plus
- Vite
- ECharts

## 项目结构

```text
src/
├── api/ # API 接口
│ ├── acl/ # 权限管理相关接口
│ ├── product/ # 商品管理相关接口
│ └── user/ # 用户管理相关接口
├── assets/ # 静态资源
│ ├── icons/ # 图标资源
│ └── images/ # 图片资源
├── components/ # 公共组件
│ ├── Category/ # 分类组件
│ ├── Pagination/ # 分页组件
│ └── SvgIcon/ # SVG 图标组件
├── directive/ # 自定义指令
│ └── has.ts # 权限控制指令
├── layout/ # 布局组件
│ ├── main/ # 主布局
│ ├── menu/ # 菜单组件
│ └── tabbar/ # 顶部导航组件
├── router/ # 路由配置
│ ├── index.ts # 路由入口
│ └── routers.ts # 路由列表
├── store/ # 状态管理
│ ├── modules/ # 模块化状态管理
│ └── index.ts # 状态管理入口
├── types/ # 类型定义
│ ├── attr.d.ts # 属性类型定义
│ ├── menu.d.ts # 菜单类型定义
│ ├── my.d.ts # 用户登录相关类型定义
│ ├── role.d.ts # 角色类型定义
│ ├── sku.d.ts # SKU 类型定义
│ ├── spu.d.ts # SPU 类型定义
│ ├── trademark.d.ts # 品牌类型定义
│ └── user.d.ts # 用户类型定义
├── utils/ # 工具函数
│ ├── request.ts # 请求封装
│ ├── time.ts # 时间处理
│ └── token.ts # Token 处理
├── views/ # 页面组件
│ ├── 404/ # 404 页面
│ ├── acl/ # 权限管理页面
│ ├── home/ # 首页
│ ├── login/ # 登录页
│ ├── product/ # 商品管理页面
│ └── screen/ # 数据大屏页面
└── App.vue # 根组件
```

## 功能模块

- 用户管理
- 角色管理
- 权限管理
- 商品管理
  - 属性管理
  - SKU管理
  - SPU管理
  - 品牌管理
- 数据大屏

## 安装与运行

1. 安装依赖

```bash
pnpm install
```

2. 启动开发服务器

```bash
pnpm dev
```

3. 打包生产环境

```bash
pnpm build
```

## 其他

- 项目使用 ESLint + Prettier 进行代码规范检查
- 使用 husky + lint-staged 进行 Git 提交前检查
