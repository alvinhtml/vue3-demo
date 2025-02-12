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
