<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>今日营收</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="100000"></h1>
                        <div class="percentage">
                            -21%
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>本月总收入 (万元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="2924"></h1>
                        <div class="percentage">-21%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>会员卡储值金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="239824"></h1>
                        <div class="percentage">-16%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>服务费总金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="16824"></h1>
                        <div class="percentage">-7%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>停车费总金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="9687"></h1>
                        <div class="percentage">-4%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="title-icon">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>电费总金额 (元)</h4>
                    </div>
                    <div class="total mt">
                        <h1 v-thousand-sep="223674"></h1>
                        <div class="percentage">-19%</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-card class="mt">
            <div ref="chartRef" style="width: 100%; height: 300px;"></div>
        </el-card>
        <el-card class="mt">
            <el-input v-model="searchName" placeholder="请输入站点名称" class="mb" style="width: 300px;">
                <template #append>
                    <el-button icon="Search" @click="getRevenueListData">查询</el-button>
                </template>
            </el-input>
            <el-table :data="tableData" v-loading="loading">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column label="充电站名称" prop="name"></el-table-column>
                <el-table-column label="充电站ID" prop="id"></el-table-column>
                <el-table-column label="所属城市" prop="city"></el-table-column>
                <el-table-column label="充电桩总量(个)" prop="count"></el-table-column>
                <el-table-column label="单日总收入(元)" prop="day" sortable>
                    <template #default="scope">
                        <span>{{ scope.row.day }}</span>
                        <el-tag :type="scope.row.percent > 0 ? 'danger' : 'success'" class="ml">
                            {{ scope.row.percent > 0 ? "+" + scope.row.percent + "%" : scope.row.percent + "%" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="月度总收入(万元)" prop="month">
                    <template #default="scope">
                        <span>{{ scope.row.month }}</span>
                        <el-tag :type="scope.row.mpercent > 0 ? 'danger' : 'success'" class="ml">
                            {{ scope.row.mpercent > 0 ? "+" + scope.row.mpercent + "%" : scope.row.mpercent + "%" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="电费营收(元)" prop="electricity"></el-table-column>
                <el-table-column label="停车费营收(元)" prop="parkingFee"></el-table-column>
                <el-table-column label="服务费营收(元)" prop="serviceFee"></el-table-column>
                <el-table-column label="会员储值金(元)" prop="member"></el-table-column>
            </el-table>
            <el-pagination class="mt fr mb" v-model:current-page="pageInfo.currentPage"
            v-model:page-size="pageInfo.pageSize" background :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper" :total="totals" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { revenueChartApi } from '@/api/chargingStation';
import { useChart } from '@/hooks/useChart';
import { revenueListApi } from '@/api/chargingStation';
import { usePagination } from '@/hooks/usePagination';
const chartRef = ref(null);

const getRevenueChartData = async () => {
    const chartOptions = reactive({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
        },
        yAxis: [
            {
                type: 'value',
                name: '销售',
                position: 'left'
            },
            {
                type: 'value',
                name: '访问量',
                position: 'right'
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                data: [],
                yAxisIndex: 0,
                itemStyle: {
                    color: '#409eff'
                }
            },
            {
                name: '',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                itemStyle: {
                    color: '#409eff'
                },
                smooth: true
            }
        ]
    });
    try {
        const res = await revenueChartApi();
        chartOptions.legend.data = res.data.list.map(item => item.name);
        for (let i = 0; i < res.data.list.length; i++) {
            chartOptions.series[i].data = res.data.list[i].data;
            chartOptions.series[i].name = res.data.list[i].name;
        }
        return chartOptions;
    } catch (error) {
        console.log(error);
    }
}

useChart(chartRef, getRevenueChartData);

const tableData = ref([]);
const loading = ref(false);
const searchName = ref('');
const getRevenueListData = async () => {
    loading.value = true;
    let { data: { list, total: totalValue } } = await revenueListApi({page:pageInfo.currentPage, pageSize:pageInfo.pageSize, name:searchName.value});
    list = list.map(item => {
        return {
            ...item,
            day: item.electricity + item.parkingFee + item.serviceFee + item.member,
        }
    });
    tableData.value = list;
    setTotals(totalValue);
    loading.value = false;
}
const {totals,pageInfo,handleSizeChange,handleCurrentChange,setTotals} = usePagination(getRevenueListData);

onMounted(() => {
    getRevenueListData();
})


</script>
<style scoped>
.title {
    display: flex;
    align-items: center;

    .title-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgb(235, 236, 245);
        text-align: center;
        line-height: 30px;
    }

    h4 {
        margin-left: 20px;
        color: #666;
    }
}

.total {
    display: flex;
    align-items: center;

    h1 {
        font-size: 30px;
        margin-right: 20px;
    }

    .percentage {
        display: inline-block;
        padding: 3px 5px;
        height: 20px;
        font-size: 12px;
        background-color: rgb(235, 247, 239);
        border-radius: 2px;
        color: green;
        line-height: 20px;
    }
}
</style>