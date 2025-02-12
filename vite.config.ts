// 导入必要的依赖
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { unheadVueComposablesImports } from '@unhead/vue'
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
