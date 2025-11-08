<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入会员卡号" v-model="searchParams.no" />
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入会员姓名" v-model="searchParams.name" />
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入会员电话" v-model="searchParams.tel" />
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="getMembershipListData">查询</el-button>
                    <el-button @click="resetSearch">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" v-loading="isLoading">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column label="会员卡号" prop="memberCardNumber"></el-table-column>
                <el-table-column label="卡类型" prop="cardType"></el-table-column>
                <el-table-column label="开卡日期" prop="issueDate"></el-table-column>
                <el-table-column label="持有人姓名" prop="holderName"></el-table-column>
                <el-table-column label="持有人电话" prop="holderPhone"></el-table-column>
                <el-table-column label="卡余额" prop="cardBalance"></el-table-column>
                <el-table-column label="消费记录" prop="transactionRecords">
                    <template #default="scope">
                        <el-popover title="消费记录" content="Left Top prompts info" :width="200" placement="top-start">
                            <template #reference>
                                <el-button>消费记录</el-button>
                            </template>
                            <el-timeline style="max-width: 600px">
                                <el-timeline-item v-for="(item, index) in scope.row.transactionRecords" :key="index" color="#0bbd87" :timestamp="item.transactionDate">
                                    <p>{{ item.transactionType }}</p>
                                    <p>{{ item.transactionAmount }}</p>
                                </el-timeline-item>
                            </el-timeline>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="有效期至" prop="validUntil"></el-table-column>
            </el-table>
            <el-pagination class="mt fr mb" v-model:current-page="pageInfo.currentPage"
                v-model:page-size="pageInfo.pageSize" :page-sizes="[10, 20, 30, 40]" :total="totals"
                layout="total, sizes, prev, pager, next" @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background />
        </el-card>
    </div>
</template>
<script setup>
import { getMembershipList } from '@/api/membership';
import { usePagination } from '@/hooks/usePagination';
import { ref, onMounted } from 'vue';
const searchParams = ref({
    no: '',
    tel: '',
    name: '',
});
const isLoading = ref(false);
const tableData = ref([]);
const getMembershipListData = async () => {
    try {
        isLoading.value = true;
        const { data: { list, total } } = await getMembershipList({
            ...searchParams.value,
            page: pageInfo.currentPage,
            pageSize: pageInfo.pageSize,
        });
        tableData.value = list;
        totals.value = total;
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}
const resetSearch = () => {
    searchParams.value = {
        no: '',
        tel: '',
        name: '',
    };
    resetPagination();
    getMembershipListData();
}
const { pageInfo, handleSizeChange, handleCurrentChange, totals, resetPagination } = usePagination(getMembershipListData);

onMounted(() => {
    getMembershipListData();
})
</script>
<style scoped></style>