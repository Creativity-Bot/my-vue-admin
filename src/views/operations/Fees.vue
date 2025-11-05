<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card>
                <el-input placeholder="请输入关键词" v-model="keyword" style="width: 80%;">
                    <template #append>
                        <el-button icon="Search"/>
                    </template>
                </el-input>
                <el-tree ref="treeRef" :data="data" :props="defaultProps" class="mt" style="max-width: 600px;" :filter-node-method="filterNode" @node-click="handleNodeClick" />
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h3>{{title ? title + ':' : ''}}计费模版</h3>
                    </div>  
                </template>
                <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
                    <el-form-item label="模版名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入模版名称" :disabled="!title" style="width: 40%;"/>
                    </el-form-item>
                    <el-form-item :label="'收费时段' + (index + 1)" v-for="(item, index) in form.date" :key="index">
                        <el-row :gutter="20" style="width: 60%;">
                            <el-col :span="8">
                                <el-form-item label="开始时间" :prop="`date.${index}.startTime`" :rules="[{ required: true, message: '请选择开始时间', trigger: 'blur' }]">
                                    <el-time-picker v-model="item.startTime" placeholder="请选择开始时间" style="width: 100%;" value-format="HH:mm:ss" :disabled="!title"></el-time-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <span style="margin-left: 5px;">-</span>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="结束时间" :prop="`date.${index}.endTime`" :rules="[{ required: true, message: '请选择结束时间', trigger: 'blur' }]">
                                    <el-time-picker v-model="item.endTime" placeholder="请选择结束时间" style="width: 100%;" value-format="HH:mm:ss" :disabled="!title"></el-time-picker>
                                </el-form-item>     
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="单价" :prop="`date.${index}.unitPrice`" :rules="[{ required: true, message: '请输入单价', trigger: 'blur' }]">
                                    <el-input v-model="item.unitPrice" placeholder="请输入单价" style="width: 100%;" :disabled="!title"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-button class="mb" type="primary" @click="addTime" :disabled="!title">新增收费时段</el-button>
                    <el-form-item label="服务费" prop="serviceFee">
                        <el-input v-model="form.serviceFee" placeholder="请输入服务费" style="width: 40%;" :disabled="!title"/>
                    </el-form-item>
                    <el-form-item label="停车费" prop="parkingFee">
                        <el-input v-model="form.parkingFee" placeholder="请输入停车费" style="width: 40%;" :disabled="!title"/>
                    </el-form-item>
                    <el-form-item label="备注" prop="remarks">
                        <el-input v-model="form.remarks" type="textarea" :rows="3" placeholder="请输入备注" :disabled="!title"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit" :disabled="!title">提交</el-button>
                        <el-button @click="resetForm" :disabled="!title">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { cityListApi } from '@/api/operations';
const keyword = ref('');

const data = ref([]);
const defaultProps = {
    children: 'children',
    label: 'label'
}
onMounted(async () => {
    try {
        const { data : list } = await cityListApi();
        data.value = list;
    } catch (error) {
        console.log(error);
    }
})

const treeRef = ref();
const filterNode = (value, data) => {
    if (!value) return true;
    return data.label.includes(value);
}

watch(keyword, (newVal) => {
    treeRef.value.filter(newVal);
})

const title = ref('');
const form = ref({
    name: '',
    serviceFee: 0,
    parkingFee: 0,
    remarks: '',
    date: [
        {startTime: '', endTime: '', unitPrice: null},
    ],
});
const rules = reactive({
    name: [
        { required: true, message: '请输入模版名称', trigger: 'blur' },
    ],
    serviceFee: [
        { required: true, message: '请输入服务费', trigger: 'blur' },
    ],
    parkingFee: [
        { required: true, message: '请输入停车费', trigger: 'blur' },
    ],
    remarks: [
        { required: true, message: '请输入备注', trigger: 'blur' },
    ],
});

// 表单验证
const formRef = ref();

const addTime = () => {
    form.value.date.push({startTime: '', endTime: '', unitPrice: null});
}

const handleSubmit = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            try {
                console.log(form.value);
            } catch (error) {
                console.log(error);
            }
        }
    })
}

const handleNodeClick = (data) =>{
    if(!data.children){
        title.value = data.label;
        resetForm();
    }
}

const resetForm = () => {
    form.value = {
        name: '',
        serviceFee: 0,
        parkingFee: 0,
        remarks: '',
        date: [
            {startTime: '', endTime: '', unitPrice: null},
        ],
    }
}

</script>