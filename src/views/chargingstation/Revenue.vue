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
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { revenueChartApi } from '@/api/chargingStation';
import { useChart } from '@/hooks/useChart';
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