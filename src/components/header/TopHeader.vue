<template>
    <div class="header">
        <div class="personal">
            <el-badge :is-dot="true" class="item">
                <el-icon>
                    <Bell />
                </el-icon>
            </el-badge>
            <el-avatar :src="avatar" class="ml mr"></el-avatar>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                Welcome, {{ userName }}
                <el-icon class="el-icon--right">
                    <ArrowDown />
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="user" icon="User">Help Center</el-dropdown-item>
                    <el-dropdown-item command="logout" icon="SwitchButton">Logout</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const { avatar, userName } = storeToRefs(authStore);
const handleCommand = (command) => {
    if(command === 'logout'){
        authStore.logout();
        router.push('/login');
    }else if(command === 'user'){
        router.push('/personal');
    }
}
</script>
<style lang="less" scoped>
.header{
    background-color: white;
    padding: 0 20px;
    .personal{
        float: right;
        height: 60px;
        display: flex;
        align-items: center;
        .item{
            margin-top: 10px;
        }
    }
}
</style>