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
