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
