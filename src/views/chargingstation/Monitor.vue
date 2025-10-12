<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input style="max-width: 600px" placeholder="请输入站点名称或编号" class="input-with-select"
                    v-model.trim="searchCondition.input">
                    <template #append>
                        <el-select v-model="searchCondition.select" placeholder="请选择" style="width: 115px">
                            <el-option label="按名称查询" value="name" />
                            <el-option label="按编号查询" value="id" />
                        </el-select>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="searchCondition.status" placeholder="充电站状态">
                    <el-option label="全部" :value="1" />
                    <el-option label="使用中" :value="2" />
                    <el-option label="空闲中" :value="3" />
                    <el-option label="维护中" :value="4" />
                    <el-option label="待维修" :value="5" />
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="getList">查询</el-button>
                <el-button @click="reset">重置</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-row>
            <el-col :span="6">
                <el-statistic title="累计充电量(度)" :value="268900" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计充电次数(次)" :value="1389"></el-statistic>
            </el-col>
            <el-col :span="6">
                <el-statistic title="服务区域(个)" :value="88" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计效益(元)" :value="5622178">
                </el-statistic>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="primary" @click="add">
            <el-icon style="margin-right: 5px;">
                <Plus />
            </el-icon>
            新增充电站
        </el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="list" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="name" label="充电站名称" />
            <el-table-column prop="id" label="站点编号" />
            <el-table-column prop="city" label="所在城市" />
            <el-table-column prop="fast" label="快充桩数量" />
            <el-table-column prop="slow" label="慢充桩数量" />
            <el-table-column prop="status" label="状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 2" type="warning">使用中</el-tag>
                    <el-tag v-else-if="scope.row.status === 3" type="success">空闲中</el-tag>
                    <el-tag v-else-if="scope.row.status === 4" type="danger">维护中</el-tag>
                    <el-tag v-else-if="scope.row.status === 5" type="primary">待维修</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="now" label="当前使用" />
            <el-table-column prop="fault" label="故障数量" />
            <el-table-column prop="person" label="负责人" />
            <el-table-column prop="tel" label="联系电话" />
            <el-table-column width="200" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定删除吗？" @confirm="deleteFn(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="mt fr mb" v-model:current-page="searchCondition.currentPage"
            v-model:page-size="searchCondition.pageSize" background :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
    <ChargingStationDialogue v-model:visible="showDialog" :disabled="disabled" @reload="getList" />
</template>
<script setup>
import { reactive, onMounted, ref } from 'vue';
import { getListApi, deleteApi } from '@/api/chargingStation';
import ChargingStationDialogue from './components/chargingStationDialogue.vue';
import { useStationStore } from '@/store/station.js';
import { ElMessage } from 'element-plus';

const list = ref([]);
const total = ref(0);
const searchCondition = reactive({
    input: '',
    select: 'name',
    status: 1,
    currentPage: 1,
    pageSize: 10,
});
const loading = ref();
const getList = async () => {
    loading.value = true;
    const { data: { list: listData, total: totalValue } } = await getListApi({
        page: searchCondition.currentPage,
        pageSize: searchCondition.pageSize,
        status: searchCondition.status,
        [searchCondition.select]: searchCondition.input
    });
    loading.value = false;
    list.value = listData;
    total.value = totalValue;
}

const handleSizeChange = (size) => {
    searchCondition.pageSize = size;
    getList();
}
const handleCurrentChange = (page) => {
    searchCondition.currentPage = page;
    getList();
}

const reset = () => {
    Object.assign(searchCondition, {
        input: '',
        select: 'name',
        status: 1,
        currentPage: 1,
        pageSize: 10
    });
    getList();
}
onMounted(() => {
    getList();
});

const stationStore = useStationStore();
const { setRowData, resetRowData } = stationStore;
const showDialog = ref(false);
const disabled = ref(false);
const edit = (row) => {
    showDialog.value = true;
    setRowData(row);
}

const add = () => {
    showDialog.value = true;
    disabled.value = false;
    resetRowData();
}

const deleteFn = async (id) => {
    try {
        let res = await deleteApi(id);
        ElMessage({
            message: res.data,
            type: 'success',
        });
        getList();

    } catch (error) {
        ElMessage({
            message: error.message,
            type: 'error',
        });
    }
}
</script>

<style scoped lang="less"></style>