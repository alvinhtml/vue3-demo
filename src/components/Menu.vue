<script lang="ts" setup></script>
<template>
    <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/profile">个人中心</RouterLink>
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