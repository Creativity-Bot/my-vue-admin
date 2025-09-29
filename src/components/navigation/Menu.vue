<template>
    <el-menu>
        <menu-item
            v-for="item in menu"
            :key="item.url"
            :item="item"
        ></menu-item>
    </el-menu>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import MenuItem from './MenuItem.vue';
const authStore = useAuthStore();
const { menu } = storeToRefs(authStore);
</script>
<style lang="less" scoped>
</style>