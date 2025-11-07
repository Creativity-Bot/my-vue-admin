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
        <StepForm :steps="steps" :form1="form1" :form2="form2" :form3="form3" @submit="handleSubmit">
            <template #step-1>
                <el-form :model="formData.basicInfo" :rules="basicRules" ref="form1">
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="formData.basicInfo.name" />
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="formData.basicInfo.email" />
                    </el-form-item>
                    <el-form-item label="电话：" prop="tel">
                        <el-input v-model="formData.basicInfo.tel" />
                    </el-form-item>
                    <el-form-item label="工号：" prop="no">
                        <el-input v-model="formData.basicInfo.no" />
                    </el-form-item>
                    <el-form-item label="是否加急：">
                        <el-switch v-model="formData.basicInfo.urgent"></el-switch>
                    </el-form-item>
                    <el-form-item label="其他选项：">
                        <el-checkbox-group v-model="formData.basicInfo.other">
                            <el-checkbox value="1">更换设备</el-checkbox>
                            <el-checkbox value="2">仅维修</el-checkbox>
                            <el-checkbox value="3">需拍照片</el-checkbox>
                            <el-checkbox value="4">需报备</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="其他备注信息：">
                        <el-input v-model="formData.basicInfo.remarks" type="textarea" />
                    </el-form-item>
                </el-form>
            </template>
            <template #step-2>
                <el-form :model="formData.reviewInfo" :rules="reviewRules" ref="form2">
                    <el-form-item label="审批部门" prop="a">
                        <el-select v-model="formData.reviewInfo.a" placeholder="请选择审批部门">
                            <el-option label="部门1" value="1" />
                            <el-option label="部门2" value="2" />
                            <el-option label="部门3" value="3" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="抄送部门" prop="b">
                        <el-select v-model="formData.reviewInfo.b" placeholder="请选择抄送部门">
                            <el-option label="部门1" value="1" />
                            <el-option label="部门2" value="2" />
                            <el-option label="部门3" value="3" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
            <template #step-3>
                <el-form :model="formData.reviewerInfo" :rules="reviewerRules" ref="form3">
                    <el-form-item label="负责人" prop="person">
                        <el-input v-model="formData.reviewerInfo.person" placeholder="请输入负责人"/>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="tel">
                        <el-input v-model="formData.reviewerInfo.tel" placeholder="请输入联系电话"/>
                    </el-form-item>
                </el-form>
            </template>
        </StepForm>
        <el-result icon="warning" title="设备编号" sub-title="该任务已被催促两次，请尽快处理">
            <template #extra>
                <el-button type="primary" @click="drawerVisible = false">我已知晓</el-button>
            </template>
        </el-result>
    </el-drawer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getAlarmList } from '@/api/alarm';
import { getFieldLabel } from './lang';
import { ElMessage } from 'element-plus';
import StepForm from '@/components/stepform/StepForm.vue';

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
const steps = [
    { title: '基本信息' },
    { title: '审批信息' },
    { title: '负责人信息' },
]

const form1 = ref(null);
const formData = ref({
    basicInfo: {
        name: "",
        email: "",
        tel: "",
        no: "",
        urgent: true,
        other: [],
        remarks: ""
    },
    reviewInfo: {
        a: "",
        b: ""
    },
    reviewerInfo: {
        person: "",
        tel: ""
    }
})

const basicRules = {
    name: [
        { required: true, message: "请输入姓名", trigger: "blur" }
    ],
    email: [
        { required: true, message: "请输入邮箱", trigger: "blur" }
    ],
    tel: [
        { required: true, message: "请输入电话", trigger: "blur" }
    ],
    no: [
        { required: true, message: "请输入工号", trigger: "blur" }
    ]
}

const form2 = ref(null);
const reviewRules = {
    a: [
        { required: true, message: "请选择审批部门", trigger: "blur" }
    ],
    b: [
        { required: true, message: "请选择抄送部门", trigger: "blur" }
    ]
}
const form3 = ref(null);
const reviewerRules = {
    person: [
        { required: true, message: "请输入负责人", trigger: "blur" }
    ],
    tel: [
        { required: true, message: "请输入联系电话", trigger: "blur" }
    ]
}

const handleSubmit = () => {
    console.log(formData.value);
    ElMessage({
        message: '指派成功',
        type: 'success',
    });
    drawerVisible.value = false;
}
</script>