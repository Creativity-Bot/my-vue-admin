<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model.trim="searchParams.name" placeholder="请输入姓名">
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="请选择部门" v-model="searchParams.department">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="总裁办" value="1"></el-option>
                    <el-option label="技术部" value="2"></el-option>
                    <el-option label="市场部" value="3"></el-option>
                    <el-option label="维修部" value="4"></el-option>
                    <el-option label="运营部" value="5"></el-option>
                    <el-option label="客服部" value="6"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="getPermissionListData">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-table :data="permissionList" v-loading="loading">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="idNo" label="身份证号"></el-table-column>
            <el-table-column prop="position" label="职位">
                <template #default="scope">
                    <el-tag type="primary">{{ scope.row.position }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="department" label="部门"></el-table-column>
            <el-table-column prop="pageAuthority" label="页面权限">
                <template #default="scope">
                    <el-tag type="success">{{ scope.row.pageAuthority }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="btnAuthority" label="按钮权限">
                <template #default="scope">
                    <el-tag type="info">{{ scope.row.btnAuthority }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="280">
                <template #default="scope">
                    <el-button type="primary" size="small">
                        权限设置
                    </el-button>
                    <el-button type="danger" size="small">
                        删除
                    </el-button>
                    <el-button type="danger" size="small">
                        禁用
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            class="fr mt mb"
            v-model:current-page="pageInfo.page" 
            v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]" 
            layout="sizes, prev, pager, next, jumper,total" 
            :total="totals" 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" 
            background
        />
    </el-card>
</template>
<script setup>
import { getPermissionList } from '@/api/system';
import { onMounted, ref } from 'vue';
import {usePagination} from '@/hooks/usePagination';
import { ElMessage } from 'element-plus';
const permissionList = ref([]);
const loading = ref(false);
const searchParams = ref({
    name: '',
    department: '0',
});
const getPermissionListData = async () => {
    try {
        loading.value = true;
        const { data: { list, total } } = await getPermissionList({
            ...searchParams.value,
            page: pageInfo.currentPage,
            pageSize: pageInfo.pageSize,
        });

        permissionList.value = list;
        totals.value = total;
    } catch (error) {
        console.log(error);
        ElMessage.error('获取权限列表失败');
    }finally{
        loading.value = false;
    }
}
const { totals, pageInfo, handleSizeChange, handleCurrentChange, resetPagination } = usePagination(getPermissionListData);
const handleReset = () => {
    searchParams.value = {
        name: '',
        department: '0',
    };
    resetPagination();
    getPermissionListData();
}
onMounted(() => {
    getPermissionListData();
})
</script>