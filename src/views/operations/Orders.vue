<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="请输入订单号" v-model="orderId"/>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="请选择订单状态" v-model="orderStatus">
                    <el-option label="全部" value="1" />
                    <el-option label="进行中" value="2" />
                    <el-option label="已完成" value="3" />
                    <el-option label="异常" value="4" />
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="设备编号" v-model="deviceId"/>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="resetSearch">重置</el-button>
            </el-col>
            <el-col :span="6" class="mt">
                <el-input placeholder="请输入站点名称" v-model="stationName"/>
            </el-col>
            <el-col :span="6" class="mt">
                <el-date-picker v-model="date" type="daterange" range-separator="/" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" @change="handleDateChange"/>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="danger" :disabled="selectedRows.length === 0" @click="batchDelete">批量删除</el-button>
        <el-button icon="Download" type="primary" :disabled="selectedRows.length === 0" @click="">批量导出到Excel</el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="listData" style="width: 100%" v-loading="isLoading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="orderId" label="订单号"/>
            <el-table-column prop="date" label="订单日期"/>
            <el-table-column prop="startTime" label="开始时间"/>
            <el-table-column prop="endTime" label="结束时间"/>
            <el-table-column prop="deviceId" label="设备编号"/>
            <el-table-column prop="money" label="金额">
                <template #default="scope">
                    <span>¥{{ scope.row.money }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="payMethod" label="支付方式" />
            <el-table-column prop="status" label="订单状态">
                <template #default="scope">
                    <el-tag :type="getStatusType(scope.row.status)">
                        {{ getStatusText(scope.row.status) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary">查看</el-button>
                    <el-button size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="mt fr mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize" :total="totals" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" />
    </el-card>
</template>
<script setup>
import { useHttp } from '@/hooks/useHttp';
import { ref, toRefs, reactive} from 'vue';
import { batchDeleteApi } from '@/api/operations';
import { ElMessage } from 'element-plus';
const date = ref();
const searchParams = reactive({
    orderId: '',
    orderStatus: "1",
    deviceId: '',
    stationName: '',
    startTime: '',
    endTime: ''
});
const { orderId, orderStatus, deviceId, stationName, startTime, endTime } = toRefs(searchParams);

const handleDateChange = (value) => {
    startTime.value = value[0] ? value[0] : '';
    endTime.value = value[1] ? value[1] : '';
}

// 获取订单状态文本
const getStatusText = (status) => {
    const statusMap = {
        1: '待支付',
        2: '进行中',
        3: '已完成',
        4: '异常'
    };
    return statusMap[status] || '未知';
}

// 获取订单状态标签类型
const getStatusType = (status) => {
    const typeMap = {
        1: 'warning',
        2: 'primary',
        3: 'success',
        4: 'danger'
    };
    return typeMap[status] || 'info';
}

const search = () => {
    resetPagination();
    loadData();
}

const { listData, isLoading, totals, pageInfo, loadData, handleSizeChange, handleCurrentChange, resetPagination } = useHttp('/orderList', searchParams);

const resetSearch = () => {
    Object.assign(searchParams, {
        orderId: '',
        orderStatus: "1",
        deviceId: '',
        stationName: '',
        startTime: '',
        endTime: ''
    });
    resetPagination();
    loadData();
}

const selectedRows = ref([]);
const handleSelectionChange = (selection) => {
    selectedRows.value = selection;
}

const batchDelete = async () => {
    try{
        let res = await batchDeleteApi(selectedRows.value.map(item => item.orderId));
        ElMessage({
            message: res.data,
            type: 'success',
        });
        resetSearch();
    }catch(error){
        ElMessage({
            message: error.message,
            type: 'error',
        });
    }
}

</script>
<style lang="less" scoped>
</style>