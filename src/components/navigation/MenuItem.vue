<template>
    <el-menu-item v-if="!item.children" :index="item.url">
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
    background-color: rgb(red, green, blue)
}
</style>