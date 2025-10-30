<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card>
                <el-input placeholder="请输入关键词" v-model="keyword" style="width: 80%;">
                    <template #append>
                        <el-button icon="Search"/>
                    </template>
                </el-input>
                <el-tree ref="treeRef" :data="data" :props="defaultProps" class="mt" style="max-width: 600px;" :filter-node-method="filterNode"/>
            </el-card>
        </el-col>
        <el-col :span="18"></el-col>
    </el-row>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { cityListApi } from '@/api/operations';
const keyword = ref('');

const data = ref([]);
const defaultProps = {
    children: 'children',
    label: 'label'
}
onMounted(async () => {
    try {
        const { data : list } = await cityListApi();
        data.value = list;
    } catch (error) {
        console.log(error);
    }
})

const treeRef = ref();
const filterNode = (value, data) => {
    if (!value) return true;
    return data.label.includes(value);
}

watch(keyword, (newVal) => {
    treeRef.value.filter(newVal);
})
</script>