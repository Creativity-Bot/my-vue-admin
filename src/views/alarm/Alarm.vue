<template>
    <el-card>
        <el-radio-group v-model="radio" size="large" class="mt" @change="handleRadioChange">
            <el-radio-button label="严重报警" value="1" />
            <el-radio-button label="紧急报警" value="2" />
            <el-radio-button label="重要报警" value="3" />
            <el-radio-button label="一般报警" value="4" />
        </el-radio-group>
    </el-card>
    <el-card v-for="item in alarmList" :key="item.equNo" class="mt">
        <el-alert :title="`${item.address}充电桩异常`" type="warning" show-icon />
        <el-descriptions :column="4" border direction="vertical" class="mt">
            <el-descriptions-item v-for="(value, key) in item" :key="key" :label="getFieldLabel(key)">
                <el-tag v-if="key === 'level'" :type="value == 1 ? 'danger' : (value == 2 ? 'warning' : 'info')"
                    size="large">
                    {{ value == 1 ? '严重' : (value == 2 ? '紧急' : '一般') }}
                </el-tag>
                <el-text type="danger" v-else-if="key == 'status'">
                    {{ value == 1 ? '待指派' : (value == 2 ? '处理中' : '处理异常') }}
                </el-text>
                <span v-else>{{ value }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="操作">
                <el-button :type="item.status == 2 ? 'warning' : 'primary'" size="large" @click="drawerVisible = true">
                    {{ item.status == 1 ? '指派' : (item.status == 2 ? '催办' : '查看') }}
                </el-button>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
    <el-drawer v-model="drawerVisible" title="报警任务指派" size="30%" direction="rtl">

    </el-drawer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getAlarmList } from '@/api/alarm';
import { getFieldLabel } from './lang';
const radio = ref('1');
const alarmList = ref([]);
onMounted(async () => {
    try {
        const { data } = await getAlarmList();
        alarmList.value = data;
    } catch (error) {
        console.log(error);
    }
})
const handleRadioChange = () => {
    // search alarm list by level
    console.log(radio.value);
}
const drawerVisible = ref(false);
</script>