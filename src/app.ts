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
