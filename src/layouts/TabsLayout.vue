<template>
    <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    closeable="true"
    @tab-remove="handleRemove"
    @tab-click="handleClick"
  >
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>

</template>

<script setup>
import { ref } from 'vue';
const activeName = ref('first');
const handleClick = (tab, event) => {
    console.log(tab, event);
}
const handleRemove = (name) => {
    console.log(name);
}
</script>