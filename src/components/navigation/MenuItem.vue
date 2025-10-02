<template>
    <el-menu-item v-if="!item.children" :index="item.url" v-show="item.url !== '/operations/detail'">
        <el-icon><component :is="item.icon"/></el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="item.url">
        <template #title>
            <el-icon><component :is="item.icon"/></el-icon>
            <span>{{ item.name }}</span>
        </template>
        <!-- <component is="MyMenu" v-for="child in item.children" :key="child.url" :item="child"></component> -->
         <my-menu v-for="child in item.children" :key="child.url" :item="child"></my-menu>
    </el-sub-menu>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'MyMenu',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    setup() {
        // component logic here
    }
});
</script>
<style scoped lang="less">
.is-active{
    background-color: rgb(34, 134, 255);
    color: #fff !important;
    div{
        span{
            color: #fff !important;
        }
    }
}
.el-menu-item:hover{
    background-color: rgb(34, 134, 255);
    color: #fff !important;
}
:deep(.el-sub-menu__title:hover) {
    background-color: rgb(34, 134, 255);
    color: #fff !important;
    // When you need to style elements inside child components that are not part of your current component's template. 
    // In your case, you're using ::v-deep to style the .el-sub-menu__title element
}
</style>