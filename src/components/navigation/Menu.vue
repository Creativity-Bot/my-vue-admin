<template>
    <div class="logo">
        <img :src="logo" alt="logo" width="34px" height="34px"></img>
        <h1>My Vue</h1>
    </div>
    <el-menu :router="true" :default-active="$route.path">
        <menu-item
            v-for="item in menu"
            :key="item.url"
            :item="item"
        ></menu-item>
    </el-menu>
</template>
<script setup>
import logo from '@/assets/logo.png';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import MenuItem from './MenuItem.vue';
const authStore = useAuthStore();
const { menu } = storeToRefs(authStore);
</script>
<style lang="less" scoped>
.logo{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    img{
        margin-right: 10px;
    }
    h1{
        font-size: 20px;
        color: #333;
    }
    padding: 0 10px;
    background-color: white;
}
.el-menu{
    border-right: none;
}
</style>