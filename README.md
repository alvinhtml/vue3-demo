# 从零开始搭建一个 Vue 3 项目

你是否曾经面对 Vue 代码，却不知如何开始构建一个完整的项目？是否想要学习如何从零创建一个可维护且可扩展的 Vue 3 项目？本教程将手把手教你构建一个 Vue 3 项目，无论你是刚接触 Vue 的新手，还是希望系统掌握 Vue 3 项目搭建的开发者，都可以从本文中获得实战经验。

为了让你深入理解每一步的搭建过程，本教程将不使用 Vite 的自动初始化功能，而是尽可能手动创建每个配置文件，帮助你真正掌握项目的底层结构。在学习本教程之前，你需要具备一定的 Vue 3 基础知识，并熟悉基本的 Linux 操作。当然，你还需要一个 Linux/MacOS 环境，如果你是 Windows 用户，可以使用 Windows Terminal、Git Bash 或 Node.js Command Prompt。

在正式开始之前，我们先列出一个完整的操作步骤：

- ✅ 初始化 Vue 3 项目
- ✅ 安装依赖包
- ✅ 组织项目的目录结构，创建配置文件
- ✅ 引入 Vue Router 进行路由管理
- ✅ 集成 Axios 进行 API 请求
- ✅ 使用 Pinia 进行状态管理

这些步骤不仅是我们需要完成的任务，也是本次学习的核心目标，帮助你逐步搭建并理解 Vue 3 项目的整个流程。现在，让我们正式开始吧！

## 安装 Node

如果你已经安装了 Node，可以跳过这一步。

### Windows 安装 Node.js

下载安装包：

1. 访问 [Node.js](https://nodejs.org/zh-cn) 官网。
2. 选择适合的版本（LTS 或 Current），点击下载。

运行安装程序：

1. 双击下载的 .msi 文件。
2. 按照提示完成安装，通常选择默认选项即可。

验证安装：

打开命令提示符（cmd），输入以下命令检查版本：

```bash
node -v
npm -v
```

显示版本号即表示安装成功。

### Linux 安装 Node.js

使用包管理器（如 Ubuntu）：

更新包列表：

```bash
sudo apt update
```

安装 Node.js：

```bash
sudo apt install nodejs
```

安装 npm：

```bash
sudo apt install npm
```

验证安装：

```bash
node -v
npm -v
```

### MacOS 安装 Node.js

```bash
brew install node
```

然后检查版本：

```bash
node -v
npm -v
```

使用 Homebrew 安装的 Node.js 可能不太方便管理多个版本，因此更推荐使用 NVM。

### 使用 NVM（Node Version Manager）

NVM 是一个用于管理多个 Node.js 版本的工具。它允许你在同一台机器上轻松安装、切换和使用不同版本的 Node.js，非常适合开发者在不同项目中使用不同 Node.js 版本的场景。

安装 NVM：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

然后重新加载 shell 配置：

```bash
source ~/.bashrc
```

安装 Node.js：

```bash
nvm install node
```

或安装特定版本：

```bash
nvm install 16
```

验证安装：

```bash
node -v
npm -v
```

## 初始化 Vue 3 项目

安装完 Node 后，我们就可以初始化项目了。首先，我们需要创建一个空文件夹，作为项目目录，项目就叫 `vue3-demo` 吧。

```bash
cd ~/code/alvin-project #随便找个路径作为项目的上级目录
mkdir vue3-demo
cd vue3-demo
```

然后使用 `npm init` 初始化项目：

```bash
npm init
```

一路回车即可。完成后，可以看到项目目录下多了个 `package.json` 文件，`package.json` 是 Node.js 项目的核心配置文件，主要作用如下：

1. 记录项目信息

```json
{
  "name": "vue3-demo",
  "version": "1.0.0",
  "description": "这是一个示例项目",
  "author": "Alvin",
  "license": "MIT"
}
```

- `name`：项目名称
- `version`：版本号（语义化管理）
- `description`：项目描述
- `author`：作者信息
- `license`：开源协议（如 MIT、Apache-2.0）

2. 管理依赖

`package.json` 记录了项目所需的依赖，方便 `npm install` 直接安装。

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "webpack": "^5.0.0"
  }
}
```

- `dependencies`：生产环境依赖（如 express、vue）。
- `devDependencies`：开发环境依赖（如 eslint、webpack）。

安装依赖时：

```bash
npm install express --save # 安装到 dependencies
npm install eslint --save-dev # 安装到 devDependencies 
```

3. 定义脚本命令

可以使用 scripts 来定义自定义命令：

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "webpack serve",
    "build": "webpack --mode production"
  }
}
```

执行时：

```bash
npm run start # npm run start 实际上相当于执行 node server.js
npm run dev
npm run build
```

4. 版本管理

`package.json` 中的依赖版本通常使用语义化版本：

```json
{
  "dependencies": {
    "lodash": "^4.17.21",
    "vue": "~3.3.0"
  }
}
```

- `^4.17.21`：兼容 4.x.x，但不会升级到 5.x.x
- `~3.3.0`：兼容 3.3.x，但不会升级到 3.4.x
- `4.17.21`：固定版本，不自动升级

## 安装依赖包

在开始之前我们先确定需要哪些依赖包：

- @vueuse/core：Vue 组合式 API 的实用工具库，简化开发。
- vue：渐进式 JavaScript 框架，构建用户界面。
- vue-router：Vue 的官方路由管理器，处理 SPA 的页面导航。
- pinia：Vue 的状态管理库，替代 Vuex。
- axios：基于 Promise 的 HTTP 客户端，用于发送网络请求。
- nprogress：页面加载进度条，提升用户体验。
- echarts：基于 JavaScript 的图表库，创建交互式数据可视化。
- dayjs：轻量级日期处理库，格式化和操作日期。
- d3：强大的数据可视化库，处理数据和绘制图形。

这些是我们生产环境中需要用到的依赖，所以放在 `dependencies` 中。

- @types/d3：为 d3 提供 TypeScript 类型声明，增强开发时的类型支持。
- @types/echarts：为 echarts 提供 TypeScript 类型声明。
- @types/node：为 Node.js 提供 TypeScript 类型声明。
- @types/nprogress：为 nprogress 提供 TypeScript 类型声明。
- @vitejs/plugin-vue：Vite 插件，用于支持 Vue 单文件组件（.vue 文件）的编译。
- @unhead/vue：用于动态管理和更新页面的 HEAD 标签内容。
- postcss：CSS 后处理工具，支持各种插件来优化和处理 CSS。
- postcss-html：PostCSS 插件，允许在 HTML 文件中处理嵌入的 CSS。
- postcss-scss：PostCSS 插件，支持 SCSS 语法的 CSS 处理。
- rollup：JavaScript 打包工具，支持模块化和优化。
- rollup-plugin-purgecss：Rollup 插件，用于删除未使用的 CSS。
- rollup-plugin-visualizer：Rollup 插件，用于可视化打包后的文件大小。
- sass：CSS 预处理器，扩展了 CSS 的功能，如变量、嵌套等。
- typescript：强类型的 JavaScript 超集，提供静态类型检查。
- unplugin-auto-import：Vite 插件，自动导入常用模块（如 vue、react 等）函数。
- unplugin-vue-components：Vite 插件，自动导入 Vue 组件，简化开发。
- unplugin-vue-router：Vite 插件，自动按需导入 Vue Router 相关模块。
- vite：现代前端构建工具，快速的开发环境和优化的生产构建。

这些是开发环境依赖，放在 `devDependencies` 中，确定了需要安装的依赖，我们将这些写入到 `package.json` 中，完整的文件内容如下:

```json
{
  "name": "vue3-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@vueuse/core": "^10.6.1",
    "axios": "^1.6.1",
    "d3": "^7.8.5",
    "dayjs": "^1.11.10",
    "echarts": "^5.5.0",
    "nprogress": "^0.2.0",
    "pinia": "^2.1.7",
    "vue": "3.3.8",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@types/d3": "^7.4.3",
    "@types/echarts": "^4.9.21",
    "@types/node": "^20.9.0",
    "@types/nprogress": "^0.2.3",
    "@vitejs/plugin-vue": "^4.5.0",
    "@unhead/vue": "^1.8.3",
    "postcss": "^8.4.31",
    "postcss-html": "^1.5.0",
    "postcss-scss": "^4.0.9",
    "rollup": "^4.4.1",
    "rollup-plugin-purgecss": "^5.0.0",
    "rollup-plugin-visualizer": "^5.12.0",
    "sass": "^1.69.5",
    "typescript": "^5.2.2",
    "unplugin-auto-import": "^0.16.7",
    "unplugin-vue-components": "^0.25.2",
    "unplugin-vue-router": "^0.7.0",
    "vite": "^4.5.0"
  }
}
```

然后我们运行 `npm install`，运行后 npm 会自动安装这些依赖包。在安装过程中，国内用户可能因为网络问题而失败，可以尝试使用 cnpm 或者使用镜像。

1. 使用 cnpm 安装

```bash
npm install -g cnpm
cnpm install
```

2. 使用镜像安装

```bash
npm install --registry=https://registry.npm.taobao.org
```

我这里是使用 `cnpm` 安装，你也可以使用 `pnpm` 或者 `yarn`，这里不在过多介绍它们的区别和用法。

安装完成后，可以看到项目目录下多出一个 `node_modules` 目录。这些目录下是我们安装的依赖包，接下来，我们组织项目的目录结构，并创建所需配置文件。

## 项目目录结构

我在这里直接给出一个常见的 Vue 前端项目结构，你可以根据自己的实际情况修改。


### 目录结构

```bash
.
├── .vscode # VSCode 配置，在多人开发时保持风格一致
├── src # 项目源码
│   ├── api # API 请求
│   ├── stores # 状态管理
│   ├── components # 全局组件
│   ├── pages # 页面组件
│   ├── utils # 公共函数
│   │   ├── request.ts # HTTP 请求
│   │   └── util.ts # 工具函数
│   ├── scss # 全局样式
│   ├── styles.ts # 样式入口文件
│   ├── router.ts # 路由配置
│   ├── shims-vue.d.ts # 组件类型定义
│   ├── app.ts # 应用程序入口
│   └── VueApp.vue # 应用程序入口文件
├── public # 静态资源
├── types # 类型定义
├── dist # 构建输出目录
├── index.html # 网页模板
├── .env.development # 开发环境配置
├── .env.production # 生产环境配置
├── .gitignore # git 忽略文件
├── tsconfig.json # TypeScript 配置
├── stylelint.config.js # Stylelint 配置
├── package.json # 项目配置
├── vite.config.ts # Vite 配置
└── README.md # 项目说明
```

有了这个目录结构树，我们就可以将对应的文件夹和文件创建出来，这里我们为了提高效率，使用命令行批量创建。

```bash
# 创建目录
mkdir -p .vscode src/api src/stores src/components src/pages src/utils src/scss public dist types

# 创建空文件
touch src/utils/request.ts src/utils/util.ts src/styles.ts src/router.ts src/shims-vue.d.ts src/app.ts src/VueApp.vue index.html .env.development .env.production .gitignore tsconfig.json stylelint.config.js vite.config.ts README.md
```

执行上面的两条命令，可以创建目录和文件，创建成功后，可以使用 `ls` 命令查看目录结构。 接下来，我们需要修改一些配置文件，这里主要是配置 Vite 和 TypeScript。

### 修改配置文件

1. 配置 `vite.config.ts` 文件

使用 `vi` 命令，或编辑器，打开 `vite.config.ts` 文件，将下面代码替换或添加到文件中。

```typescript
// 导入必要的依赖
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { unheadVueComposablesImports } from '@unhead/vue'
import { getFileBasedRouteName } from 'unplugin-vue-router'
import purgecss from 'rollup-plugin-purgecss'

// 环境变量配置
const SILENT = Boolean(process.env.SILENT) ?? false      // 是否静默模式
const SOURCE_MAP = Boolean(process.env.SOURCE_MAP) ?? false  // 是否生成 source map
const CONFIG = loadEnv('development', './')  // 加载环境变量

export default defineConfig({
  // 项目根目录
  root: process.cwd(),
  // 部署基础路径
  base: '/',
  // 静态资源目录
  publicDir: 'public',
  // 日志级别
  logLevel: SILENT ? 'error' : 'info',

  // 依赖优化选项
  optimizeDeps: {
    // 预构建依赖项
    include: [
      '@vueuse/core',
      'axios',
      'dayjs',
      'd3',
      'echarts',
      'nprogress',
      'vue',
    ],
  },

  // 解析配置
  resolve: {
    // 路径别名配置
    alias: [
      {
        find: '/@src/',
        replacement: `/src/`,
      },
    ],
  },

  // 构建配置
  build: {
    minify: true,                           // 是否压缩代码
    sourcemap: SOURCE_MAP,                  // 是否生成 source map
    reportCompressedSize: !SILENT,          // 是否报告压缩大小
    chunkSizeWarningLimit: Infinity,        // 块大小警告限制
    rollupOptions: {
      external: [/\/demo\/.*/],             // 外部化处理模块
    },
    target: 'modules',                      // 构建目标
  },

  // 插件配置
  plugins: [
    // Vue 插件配置
    Vue({
      include: [/\.vue$/],
    }),

    // Vue Router 插件配置
    VueRouter({
      routesFolder: 'src/pages',            // 路由文件夹
      dts: './types/router.d.ts',           // 类型声明文件路径
      dataFetching: true,                   // 启用数据获取
    }),

    // 自动导入插件配置
    AutoImport({
      dts: './types/imports.d.ts',          // 类型声明文件路径
      imports: [                            // 自动导入的模块
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        unheadVueComposablesImports,
      ],
    }),

    // 组件自动注册插件配置
    Components({
      dirs: ['src/components'],             // 组件目录
      extensions: ['vue'],                  // 组件文件扩展名
      dts: true,                            // 生成类型声明
      include: [/\.vue$/, /\.vue\?vue/],    // 包含的文件
    }),

    // CSS 清除未使用的样式配置
    purgecss({
      output: false,
      content: [`./src/**/*.vue`],          // 扫描的文件
      variables: false,
      safelist: {                           // 安全列表，不会被清除的选择器
        standard: [
          /(autv|lnil|lnir|fas?)/,
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
        ],
      },
      defaultExtractor(content) {           // 自定义提取器
        const contentWithoutStyleBlocks = content.replace(
          /<style[^]+?<\/style>/gi,
          ''
        )
        return (
          contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) ||
          []
        )
      },
    }),
  ],

  // 开发服务器配置
  server: {
    port: 3080,                            // 服务端口
    open: true,                            // 自动打开浏览器
    https: false,                          // 是否启用 https
    host: '0.0.0.0',                       // 监听地址
    proxy: {                               // 代理配置
      '/webapi': {
        target: `${CONFIG.VITE_API_SERVER_URL}/webapi`,  // 代理目标地址
        changeOrigin: true,                // 修改请求头中的 host
        secure: false,                     // 是否验证 SSL 证书
        ws: true,                          // 支持 websocket
        headers: {
          Referer: CONFIG.VITE_API_SERVER_URL,
        },
        rewrite: (path) => path.replace(/^\/webapi/, ''), // 重写路径
      },
    },
  },
})
```

2. 配置 `tsconfig.json` 文件

```js
{
  // 编译器选项
  "compilerOptions": {
    // 目标 ECMAScript 版本
    "target": "ESNext",
    // 生成代码的模块化标准
    "module": "ESNext",
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 启用所有严格的类型检查选项
    "strict": true,
    // 模块解析策略
    "moduleResolution": "node",
    // 启用装饰器
    "experimentalDecorators": true,
    // 启用元数据装饰器
    "emitDecoratorMetadata": true,
    // 允许导入 JSON 模块
    "resolveJsonModule": true,
    // 允许使用 jsx
    "jsx": "preserve",
    // 跳过库检查
    "skipLibCheck": true,
    // 基准目录
    "baseUrl": ".",
    // 路径别名配置
    "paths": {
      "/@src/*": ["./src/*"]
    },
    // 类型定义文件
    "types": [
      "vite/client",
      "node",
      "vue"
    ],
    // 编译时引入的库
    "lib": [
      "ESNext",
      "DOM",
      "DOM.Iterable"
    ]
  },
  // 包含的文件
  "include": [
    "src/**/*.js",
    "src/**/*.ts",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "vite.config.ts"
  ],
  // 排除的文件
  "exclude": [
    "node_modules",
    "dist",
  ]
}
```

配置修改完成后，我们来创建和修改 Vue 应用程序的相关文件。

### 修改 Vue 应用程序的相关文件

1. 首先修改 `index.html` 模板文件

`index.html` 是 Vue 应用程序的模板文件，其主要作用是:

- 定义 HTML 结构，包括 head 里的 meta 信息、title 和样式等静态资源。
- 提供 Vue 挂载点，即 `<div id="app"></div>`，Vue 会将应用挂载到这个 DOM 里面。
- 引入 Vite 处理的 JS 文件，如 `<script type="module" src="/src/app.ts"></script>`。

以下是一个基础的 `index.html` 模板文件的示例:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3 Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/app.ts"></script>
  </body>
</html>
```


2. 修改 `router.ts` 文件

`router.ts` 是 Vue Router 的配置文件，主要用于定义应用的路由规则，并创建路由实例，供整个 Vue 应用使用。以下是一个常见的 `router.ts` 文件的示例：

```ts
// 导入所需的 Vue Router 相关函数
import {
  createRouter as createClientRouter,
  createWebHistory,
} from 'vue-router/auto'

// 创建并配置路由实例
export function createRouter() {
  const router = createClientRouter({
    // 使用 web history 模式
    history: createWebHistory(),
  })

  return router
}
```

因为我们使用了基于文件路径的自动路由配置，所以这里需要从 `vue-router/auto` 导入模块，并使用它提供的函数来创建路由实例。

如果你想手动编写路由规则，可以像下方这样修改 `router.ts` 文件：

```ts
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'

const router = createRouter({
  history: createMemoryHistory(),

  // 所有的路由需要手动注册
  routes: [
    { path: '/', component: HomeView },
  ],
})
```

3. 修改 `VueApp.vue` 文件

`VueApp.vue` 是 Vue 应用的根组件，它是整个应用的入口，所有页面和组件都会在它的基础上进行渲染。以下是一个 `VueApp.vue` 的示例：

```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <!-- 使用 RouterView 渲染当前路由匹配的组件 -->
    <RouterView v-slot="{ Component }">
      <!-- 使用 Transition 组件为路由切换添加淡入淡出效果 -->
      <Transition name="fade-slow" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
```

这里使用了 `Transition` 组件来为路由切换添加淡入淡出效果。 因此，你需要在 scss 中定义 `fade-slow` 的动画效果。 让我们来创建样式文件。


首先看下样式文件的目录结构：

```bash
.
├── scss
│   ├── layout
│   │   └── _transitions.scss
│   └── main.scss
├── styles.ts
```

在前面的教程中我们已经创建了 `src/scss` 目录和 `styles.ts`， 它们目前是空的，我们需要在 `scss` 目录下创建样式文件，并修改 `styles.ts`。

根据路径创建文件 `src/scss/layout/_transitions.scss` 并添加以下内容：

```scss
.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 0.5s ease;
}

.fade-slow-enter-from,
.fade-slow-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fade-slow-enter-active,
  .fade-slow-leave-active {
    transition: none;
  }
}
```

创建 `src/scss/main.scss` 文件，并添加以下内容：

```scss
@use './layout/transitions';
```

然后在 `src/styles.ts` 文件中添加以下内容：

```ts
import './scss/main.scss'
```

接下来，我们需要修改 `app.ts` 文件来使用 `VueApp`， 并引入 `styles.ts` 中定义的样式文件。


4. 修改 `app.ts` 文件

在 Vue 3项目中，`app.ts` 负责创建 Vue 应用实例，并初始化全局插件、状态管理、路由等。实例初始化完在后，使用 `mount` 方法将应用挂载到 DOM（`<div id="app"></div>`） 中，以下是 `app.ts` 的示例：

```ts
import { createApp as createClientApp } from 'vue'

// 导入 head 管理相关依赖，用于管理页面元数据
import { createHead } from '@unhead/vue'

import { createPinia } from 'pinia'
import { createRouter } from './router'
import VueApp from './VueApp.vue'
import './styles'

// 创建应用实例的主函数
export async function createApp() {
  // 创建 Vue 应用实例
  const app = createClientApp(VueApp)
  const router = createRouter()

  const head = createHead()
  app.use(head)

  const pinia = createPinia()
  app.use(pinia)

  const myapp = {
    app,
    router,
    head,
    pinia,
  }

  app.provide('myapp', myapp)

  app.use(myapp.router)

  return myapp
}

// 初始化应用
createApp().then(async (myapp) => {
  await myapp.router.isReady()
  myapp.app.mount('#app')
})
```

到此，一个基础的 Vue 3 项目已经搭建完成！接下来我们创建两个简单页，来试试能不能跑起来。

### 创建测试页面

先在 `pages` 目录下创建 `index.vue` 文件，并加入以下内容：

```vue
<script lang="ts" setup>
</script>

<template>
  <div>
    <Menu />
    <h1>欢迎来到 Vue3 Demo</h1>
    <p>这是一个使用 Vue 3 + TypeScript + Vite 构建的示例项目</p>
  </div>
</template>

<style lang="scss">
</style>
```

然后在 `pages` 目录下创建另一个文件 `profile.vue`，并添加以下内容：  

```vue
<script lang="ts" setup>
</script>

<template>
  <div>
    <Menu />
    <h1>Hello ！My Name is Alvin.</h1>
  </div>
</template>

<style lang="scss">
</style>
```

最后在 `components` 目录下创建一个名为 `Menu.vue` 的文件，并添加以下内容：

```vue
<script lang="ts" setup></script>
<template>
    <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/hello">Hello</RouterLink>
    </nav>
</template>
<style lang="scss">
nav {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
        color: #444;
        text-decoration: none;
        background-color: #eee;
        padding: 4px 20px;
        border-radius: 12px;
        
        &.router-link-active {
            color: #fff;
            background-color: rgba(5, 214, 158, 1);
        }
    }
}
</style>
```

OK，我们已经创建了两个页面，和一个单文件组件，在配置 `package.json` 的时候，细心的你可能会发 `scripts` 中多出了两条命令：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

这两个命令是我们可以直使用 `npm run` 来调用的命令。

  - `npm run dev` 启动调试服务
  - `npm run build` 打包项目

在 `vite.config.ts` 中，我们已经配置好了开发服务器 `server`：

```ts
{
  server: {
    port: 3080,                            // 服务端口
    open: true,                            // 自动打开浏览器
    https: false,                          // 是否启用 https
    host: '0.0.0.0',                       // 监听地址
  }
}
```

直接运行 `npm run dev` 启动开发服务器。如果你之前的步骤都正确，浏览会自动打开 `http://localhost:3080/` 页面，一个完全静态页面的 Vue 项目就运行起来了。

但前端开发往往离不开与后端数据的交互，接下来我们来配置 Axios 用于 API 请求。

## 配置 axios

在 Vue 项目中，Axios 是最常用的 HTTP 请求库，用于与后端 API 进行通信。相较于原生 fetch，Axios 提供了更强大的功能，比如：

1. 自动处理 JSON 数据（fetch 需要手动 response.json()）
2. 请求和响应拦截器（方便全局处理 token、错误）
3. 自动取消请求（避免内存泄漏）
4. 请求超时（可设置 timeout，fetch 没有）
5. 支持跨浏览器（fetch 在某些浏览器下不兼容）

在 `src/utils` 目录下创建 `request.ts` 文件，并添加以下内容：

```ts
import axios from 'axios'

export interface Response<T> {
    code: number
    message: string
    data: T
}

// 创建 Axios 实例
const api = axios.create({
  baseURL: '/webapi', // 后端 API 地址
  timeout: 10000, // 超时时间 10s
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器（在请求发送前做处理）
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器（在返回数据前做处理）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

export default api
```

这个文件的作用是对 Axios 进行简单封装，最后导出 `api` 对象，供其他组件使用。

### 启动 node 服务器

为了方便测试，我们用 nodejs 启动一个简单的 server，实现一个简单的 API 接口，假设要实现一个个人信息接口， 接口文档如下：

```
GET /webapi/profile

Response:

{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "name": "alvin",
    "email": "alvinhtml@gmail.com"
  }
}
```

在项目目录中创建一个 `server.js` 文件，并添加以下内容:

```js
const http = require('http')

// 模拟用户数据
const mockUserProfile = {
  id: 1,
  name: 'alvin',
  email: 'alvinhtml@gmail.com',
}

const server = http.createServer((req, res) => {
  // 只处理 /webapi/profile 路径的 GET 请求
  if (req.method === 'GET' && req.url === '/webapi/profile') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      code: 0,
      message: 'success',
      data: mockUserProfile
    }))
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

const PORT = 3081
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
```

在命令行中执行 `node server.js` 启动 node 服务器，访问 `http://localhost:3081/webapi/profile` 就可以看到返回的数据了。

然后我们添加一个用于请求用户数据的 api 文件，在 `src/api` 目录下创建 `user.ts` 文件，并添加以下内容：

```ts
import service from '/@src/utils/request'

export async function apiGetProfile(): Promise<any> {
  const res = await service({
    url: `/profile`,
    method: 'get',
  })
  
  return res.data
}
```

这个文件导出一个 `apiGetProfile` 函数，用于获取用户数据，稍后我们在 Store 中用到，在此之前，我们先来配置 Pinia。

## 配置 Pinia

在 Vue 组件中，通常可以用 `ref()` 和 `reactive()` 来管理局部状态，但当多个组件需要共享状态时，就需要全局状态管理，这时 Pinia 就派上用场了。

Pinia 是 Vue 3 官方推荐的状态管理库，它是 Vuex 的现代替代品，更简单、类型安全且易于使用。相比 Vuex，Pinia 具有以下优势：

1. API 更简单：比 Vuex 更简洁，学习成本低。
2. TypeScript 友好：原生支持，类型推断完善。
3. 模块化设计：每个 Store 独立，按需使用。
4. 轻量高效：体积小，性能更优。
5. Devtools 支持：集成 Vue Devtools，方便调试。
6. 组合式 API 支持：与 Vue 3 组合式 API 完美结合。
7. 灵活易用：支持动态创建 Store，随处可用。

在前面的教程中我们已经在 `app.ts` 中注册了 Pinia：

```ts
const app = createClientApp(VueApp)
const pinia = createPinia()
app.use(pinia)
```

接下来，我们需要在 `stores` 目录下创建一个文件，用于管理应用的状态，文件名为 `user.ts`，内容如下：

```ts
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Response } from '/@src/utils/request'
import { apiGetProfile } from '../api/user'

export interface Profile {
    id: string
    name: string
    email: string
}

// 定义了一个名为 user 的 Pinia store 并导出
export const useUserStore = defineStore('user', () => {
    const profile = ref<Profile>()

    async function getProfile(): Promise<Response<Profile>> {
        const res = await apiGetProfile()
        profile.value = res.data

        return res
    }

    // 返回一个对象，包含了方法 getProfile 和 数据 profile
    return {
        getProfile,
        profile
    } as const
})

// import.meta.hot.accept 是 Vite 提供的一个接口，用于注册 HMR 更新，确保模块能够在代码更新时不重新加载整个页面，只更新模块本身
if (import.meta.hot) {
    // acceptHMRUpdate 是 Pinia 提供的一个帮助函数，它用于注册 Pinia store 的热更新
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
```

创建好 `stores/user.ts` 后，我们需要在 `profile.vue` 中引入 `userStore` 并使用。

修改后的 `profile.vue` 文件如下：

```vue
<script lang="ts" setup>
import { useUserStore } from '/@src/stores/user'
import type { Profile } from '/@src/stores/user'

// 获取 `userStore` 实例
const userStore = useUserStore()

// 获取 `profile` 数据，并使用 `computed` 函数将其转换为响应式数据
const profile = computed<Profile | undefined>(() => userStore.profile)

onBeforeMount(() => {
  // 在组件加载前调用 `getProfile` 方法
  userStore.getProfile()
})
</script>

<template>
  <div>
    <Menu />
    <h1>Hello ！My Name is {{ profile?.name }}.</h1>
    <pre>{{ profile }}</pre>
  </div>
</template>

<style lang="scss">
</style>
```

打开 `http://localhost:3080/profile` 可以看到数据已经是从后端返回的了。

## 总结

恭喜你！到这里，我们已经完成了一个完整的 Vue 3 项目的搭建。让我们回顾一下我们完成的主要内容：

1. 从零开始搭建了一个 Vue 3 项目的基础架构
2. 配置了现代化的开发工具链，包括 TypeScript、Vite、SCSS 等
3. 实现了路由管理、状态管理、样式管理等核心功能
4. 建立了一个可扩展、易维护的项目结构

这个项目模板不仅适用于小型应用，同样也能支撑起大型应用的开发。通过这个教程，你应该已经掌握了：

- Vue 3 项目的基本架构和配置
- 现代前端工具链的使用方法
- 项目结构的最佳实践
- 各种常用库的集成方式

如果你在开发过程中遇到问题，可以参考：

- [Vue 3 官方文档](https://v3.vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

### 下一步

如果你想进一步提升项目的完整性，可以考虑：

- 添加单元测试配置（Jest/Vitest）
- 配置 CI/CD 流程
- 添加代码规范检查（ESLint/Prettier）
- 引入组件库（Element Plus/Ant Design Vue）
- 实现国际化 (i18n)

记住，好的项目架构是在实践中不断改进的。希望这个教程能够帮助你更好地理解 Vue 3 项目的搭建过程，为你的 Vue 开发之路打下坚实的基础！

祝你编码愉快！🚀
