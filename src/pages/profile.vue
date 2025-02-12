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