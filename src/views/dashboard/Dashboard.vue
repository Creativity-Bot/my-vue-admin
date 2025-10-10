<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card>
        <div class="title">
          <h3>今日设备运行状态</h3>
          <p class="ml">更新时间：2025-01-01 12:00:00</p>
          <el-icon color="#86909c" style="margin-left: 5px;">
            <Refresh />
          </el-icon>
        </div>
        <div class="equipment">
          <div class="item">
            <h4 class="mb mt">充电桩使用表</h4>
            <img :src="flash" />
            <h1 class="mt mb">72 / 95</h1>
            <div class="statistic-card">
                <el-statistic :value="9">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                        异常设备
                        <el-tooltip
                            effect="dark"
                            content="有异常设备需要维修"
                            placement="top"
                        >
                            <el-icon style="margin-left: 4px" :size="12">
                            <Warning/>
                            </el-icon>
                        </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>比昨天增加</span>
                        <span class="green">
                            24%
                        <el-icon color="green">
                            <CaretTop />
                        </el-icon>
                        </span>
                    </div>
                </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mb mt">充电柜使用率</h4>
            <img :src="flash2" />
            <h1 class="mt mb">655 / 1233</h1>
            <div class="statistic-card">
                <el-statistic :value="22">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                        异常设备
                        <el-tooltip
                            effect="dark"
                            content="有异常设备需要维修"
                            placement="top"
                        >
                            <el-icon style="margin-left: 4px" :size="12">
                            <Warning/>
                            </el-icon>
                        </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>比昨天增加</span>
                        <span class="green">
                            24%
                        <el-icon color="green">
                            <CaretTop />
                        </el-icon>
                        </span>
                    </div>
                </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mb mt">充电站使用表</h4>
            <img :src="flash3" />
            <h1 class="mt mb">2263 / 3398</h1>
            <div class="statistic-card">
                <el-statistic :value="47">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                        异常设备
                        <el-tooltip
                            effect="dark"
                            content="有异常设备需要维修"
                            placement="top"
                        >
                            <el-icon style="margin-left: 4px" :size="12">
                            <Warning/>
                            </el-icon>
                        </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>比昨天增加</span>
                        <span class="green">
                            14%
                        <el-icon color="green">
                            <CaretTop />
                        </el-icon>
                        </span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
            <div class="card-header">
                <h1>常用功能</h1>
            </div>
        </template>
        <div class="quick mt mb">
            <el-row>
                <el-col :span="4">
                    <img :src="repair" />
                    <p>维修记录</p>
                </el-col>
                <el-col :span="4">
                    <img :src="progress" />
                    <p>维修进度</p>
                </el-col>
                <el-col :span="4">
                    <img :src="remain" />
                    <p>剩余库存</p>
                </el-col>
                <el-col :span="4">
                    <img :src="total" />
                    <p>总库存</p>
                </el-col>
                <el-col :span="4">
                    <img :src="money" />
                    <p>营收统计</p>
                </el-col>
                <el-col :span="4">
                    <img :src="daily" />
                    <p>每日统计</p>
                </el-col>
            </el-row>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
            <div class="card-header">
                <h1>能源统计</h1>
            </div>
        </template>
        <el-row>
            <el-col :span="8">
                <div ref="chartRef2" style="width: 100%; height: 400px;">
                </div>
            </el-col>
            <el-col :span="16">
                <div ref="chartRef" style="width: 100%; height: 400px;">
                </div>
            </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
            <template #header>
                <div class="card-header">
                    <h1>设备总览</h1>
                </div>
            </template>
            <div ref="chartRef3" style="width: 100%; height: 240px;"></div>
        </el-card>
        <el-card class="mt">
            <template #header>
                <div class="card-header">
                    <h1>营收统计表</h1>
                </div>
            </template>
            <ul class="revenue-list">
                <li class="revenue-item">
                    <span class="item" style="background-color: rgb(103, 194, 58); color: #fff;">1</span>
                    <span class="item-name">广州</span>
                    <span class="sales">10,000</span>
                    <span style="margin-left: 50px;">
                        10%
                        <el-icon color="green">
                            <CaretTop />
                        </el-icon>
                    </span>
                </li>
                <li class="revenue-item">
                    <span class="item" style="background-color: rgb(64, 158, 255); color: #fff;">2</span>
                    <span class="item-name">深圳</span>
                    <span class="sales">12,000</span>
                    <span style="margin-left: 50px;">
                        12%
                        <el-icon color="green">
                            <CaretBottom />
                        </el-icon>
                    </span>
                </li>
            </ul>
        </el-card>
        <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>故障报警</h1>
                    </div>
                </template>
                <el-timeline style="max-width: 600px">
                    <el-timeline-item timestamp="2018/4/12" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>矿业北路通讯中断</h4>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top" :hollow="true" type="warning">
                        <el-card>
                            <h4>黄河南路超出服务区域</h4>               
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top" :hollow="true" type="danger">
                        <el-card>
                            <h4>6号机组异常断电</h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import flash from '@/assets/flash.png';
import flash2 from '@/assets/flash2.png';
import flash3 from '@/assets/flash3.png';
import repair from '@/assets/repair.png';
import progress from '@/assets/progress.png';
import remain from '@/assets/remain.png';
import total from '@/assets/total.png';
import money from '@/assets/money.png';
import daily from '@/assets/daily.png';
import { useChart } from '@/hooks/useChart';
import { reactive, ref } from 'vue';
import { getChartData, pieChartData, chartRadarData } from '@/api/chartData';
const chartRef = ref(null);
const chartRef2 = ref(null);
const chartRef3 = ref(null);
const option = reactive({
    title: {
        text: '电量统计',
        left: 'left top'
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: [],
        textStyle: {
            color: '#333'
        }
    },
    xAxis: {
        type: 'category',
        data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
        boundaryGap: false
    },
    yAxis: {
        type: 'value',
        name: 'KW',
        axisLabel: {
            formatter: '{value} KW'
        }
    },
    series: [
        {
            name: '',
            type: 'line',
            data: [],
            itemStyle: {
                color: 'purple',
                shadowColor: 'rgba(0, 0, 255, 0.5)',
                shadowBlur: 10
            },
            lineStyle: {
                width: 4
            },
            smooth: true
        },
        {
            name: '',
            type: 'line',
            data: [],
            itemStyle: {
                color: 'lightgreen',
                shadowColor: 'rgba(0, 255, 0, 0.5)',
                shadowBlur: 10
            },
            lineStyle: {
                width: 4
            },
            smooth: true
        },
        {
            name: '',
            type: 'line',
            data: [],
            itemStyle: {
                color: 'skyblue',
                shadowColor: 'rgba(173, 216, 230, 0.5)',
                shadowBlur: 10
            },
            lineStyle: {
                width: 4
            },
            smooth: true
        }
    ]
});

const getChartOption = async () => {
    const res = await getChartData();
    option.legend.data = res.data.list.map(item => item.name);
    for(let i = 0; i < res.data.list.length; i++){
        option.series[i].data = res.data.list[i].data;
        option.series[i].name = res.data.list[i].name;
    }
    return option;
}
useChart(chartRef, getChartOption); 

const getBarChartOption = async () => {
    const options = reactive({
    legend: {
        top: 'bottom',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} %'
    },
    series: [
        {
            name: '营收占比',
            type: 'pie',
            radius: ['50%', '70%'], // 内外半径形成环形
            center: ['50%', '50%'],
            roseType: 'area',
            color: ['#4B6EBD', '#3DBB92', '#53C1D6'], // 颜色
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '15',
                    fontWeight: 'bold'
                }
            },
            data: []
        }
    ],
    graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
            text: '营收占比',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fontSize: 25,
            fill: '#333'
        }
    }
    });
    const res = await pieChartData();
    options.series[0].data = res.data.list;
    return options;
};
useChart(chartRef2, getBarChartOption);

const getRadarChartOption = async () => {
    const options = reactive({
        radar: {
        // shape: 'circle',
        indicator: [
            { name: '闲置数', max: 65 },
            { name: '使用数', max: 160 },
            { name: '故障数', max: 300 },
            { name: '维修数', max: 380 },
            { name: '更换数', max: 520 },
            { name: '报废数', max: 250 }
        ]
    },
    series: [
        {
            name: '设备总览',
            type: 'radar',
            data: [
                {
                    value: [],
                    name: '设备总览'
                },
            ]
        }
    ]
    });
    const res = await chartRadarData();
    options.series[0].data[0].value = res.data.list;
    return options;
};
useChart(chartRef3, getRadarChartOption);


</script>
<style scoped lang="less">
.title {
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  p {
    color: #86909c;
  }
}
.equipment {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    h1{
        font-size: 36px;
    }
    :deep(.el-statistic__content) {
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
.quick {
    margin-top: 30px;
    text-align: center;
    p{
        margin-top: 10px;
        color: #333;
    }
}

.revenue-list{
    .revenue-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        .item {
            display: inline-block; // 内联块级元素 make height and width work
            font-weight: bold;
            color: #666;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
        }
        .item-name {
            flex-grow: 1;
            padding: 0 10px;
        }
        .sales {
            color: #666;
        }
    }
    .revenue-item:nth-child(even) {
        background-color: rgb(253, 246, 236);
    }
}
</style>