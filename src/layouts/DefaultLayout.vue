<template>
    <el-container>
      <el-aside width="200px">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header><TopHeader></TopHeader></el-header>
        <el-main>
          <TabsLayout></TabsLayout>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script setup>
import Menu from '@/components/navigation/Menu.vue';
import TopHeader from '@/components/header/TopHeader.vue';
import TabsLayout from '@/layouts/TabsLayout.vue';
</script>
<style scoped>
.el-aside {
    height: 100vh;
    background-color: #f4f4f4;
    box-shadow: 10px 0 8px -2px rgba(0,0,0,0.2);
}
.el-header {
    padding: 0;
}
.el-main{
    height: 80vh;
    overflow: auto;
}
</style>
