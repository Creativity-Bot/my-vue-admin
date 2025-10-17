<template>
    <div>
        <el-card>
            <el-select style="width: 300px" placeholder="请选择" v-model="stationId" filterable>
                <el-option v-for="item in currentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-card>
        <el-card class="mt">
            <el-radio-group size="large" v-model="selectedStatus" @change="handleStatusChange">
                <el-radio-button :label="`全部${countAllStatus}`" :value="0" />
                <el-radio-button :label="`空闲中${countNumByStatus(1)}`" :value="1" />
                <el-radio-button :label="`充电中${countNumByStatus(2)}`" :value="2" />
                <el-radio-button :label="`连接中${countNumByStatus(3)}`" :value="3" />
                <el-radio-button :label="`排队中${countNumByStatus(4)}`" :value="4" />
                <el-radio-button :label="`已预约${countNumByStatus(5)}`" :value="5" />
                <el-radio-button :label="`故障/离线${countNumByStatus(6)}`" :value="6" />
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in listData" :key="item.id">
                    <div class="block">
                        <div class="block-left">
                            <p>{{ displayStatus(item.status) }}</p>
                            <img :src="item.status == 1 ? free : (item.status == 6 ? outline : ing)"
                                style="width: 100px;"></img>
                            <p v-if="item.status == 2">{{ item.percent }}</p>
                            <p v-else>0%</p>
                        </div>
                        <div class="block-right">
                            <h3>{{ item.id }}</h3>
                            <hr class="mb">
                            </hr>
                            <p>电压：{{ item.voltage }}</p>
                            <p>电流: {{ item.current }}</p>
                            <p>功率: {{ item.power }}</p>
                            <p>温度: {{ item.tem }}</p>
                        </div>
                    </div>
                    <div class="btn">
                        <div class="divider"></div>
                        <div>
                            <p class="fl ml" style="font-size: 12px; color: #999;">暂无预警</p>
                            <div class="fr" style="text-align: right;">
                                <el-button size="small">维保记录</el-button>
                                <el-popover placement="right" :width="400">
                                    <template #reference>
                                        <el-button type="primary" size="small" class="mr">使用记录</el-button>
                                    </template>
                                    <template #default>
                                        <h3 class="mb">使用记录</h3>
                                        <template v-if="item.record && item.record.length > 0">
                                            <el-timeline style="max-width: 600px">
                                                <el-timeline-item :timestamp="time_item.time"
                                                    v-for="time_item in item.record" :key="time_item.time"
                                                    :hollow="true" type="primary">
                                                    {{ time_item.msg }}
                                                </el-timeline-item>
                                            </el-timeline>
                                        </template>
                                        <template v-else>
                                            <p class="mb">暂无使用记录</p>
                                        </template>
                                    </template>

                                </el-popover>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script setup>
import outline from '@/assets/outline.png';
import free from '@/assets/free.png';
import ing from '@/assets/ing.png';
import { currentListApi } from '@/api/chargingStation';
import { onMounted, ref, computed, watch } from 'vue';

const currentList = ref([]);
const listData = ref([]);
const listDataCopy = ref([]);
const stationId = ref('');
const selectedStatus = ref(0);

const getCurrentList = async () => {
    try {
        const { data } = await currentListApi();
        currentList.value = data;
        stationId.value = data[0].id;
        listData.value = data[0].list;
        listDataCopy.value = data[0].list;
    } catch (error) {
        console.log(error);
    }
}

const handleStatusChange = () => {
    if (selectedStatus.value == 0) {
        listData.value = listDataCopy.value;
        return;
    }
    listData.value = listDataCopy.value.filter(item => item.status == selectedStatus.value);
}

const countNumByStatus = (status) => {
    return listDataCopy.value.filter(item => item.status == status).length;
}

const displayStatus = function (status) {
    switch (status) {
        case 1:
            return '空闲中';
        case 2:
            return '充电中';
        case 3:
            return '连接中';
        case 4:
            return '排队中';
        case 5:
            return '已预约';
        case 6:
            return '故障/离线';
    }
}

const countAllStatus = computed(() =>
    countNumByStatus(1) + countNumByStatus(2) + countNumByStatus(3) + countNumByStatus(4) + countNumByStatus(5) + countNumByStatus(6)
)

watch(stationId, (newVal) => {
    const result = currentList.value.find(item => item.id == newVal);
    listData.value = result.list;
    listDataCopy.value = result.list;
    selectedStatus.value = 0;
})

onMounted(() => {
    getCurrentList();

})
</script>
<style lang="less" scoped>
.block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: rgb(247, 251, 254);
    padding: 20px;
    border-radius: 10px 10px 0 0;
    margin-top: 20px;

    .block-left {
        p {
            width: 76px;
            text-align: center;
            margin-bottom: 10px;
            color: rgb(61, 187, 146);
        }
    }

    .block-right {
        color: #999;
        margin-left: 30px;
        line-height: 26px;
        margin-top: -10px;
    }
}

.btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #f7fbfe;

    .divider {
        background-color: #f4f4f4;
        height: 2px;
        width: 95%;
        margin: auto;
    }
}
</style>