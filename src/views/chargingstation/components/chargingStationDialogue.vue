<template>
    <el-dialog v-model="dialogVisible" title="新增充电站" @close="handleClose" destroy-on-close>
        <el-form label-width="120px" :model="rowData" :rules="rules" ref="formRef">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="充电站名称" prop="name">
                        <el-input v-model="rowData.name" />
                    </el-form-item>
                    <el-form-item label="充电站id" prop="id">
                        <el-input v-model="rowData.id" :disabled="disabled" />
                    </el-form-item>
                    <el-form-item label="所属城市" prop="city">
                        <el-input v-model="rowData.city" />
                    </el-form-item>
                    <el-form-item label="站点负责人" prop="person">
                        <el-input v-model="rowData.person" />
                    </el-form-item>
                    <el-form-item label="负责人电话" prop="tel">
                        <el-input v-model="rowData.tel" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="快充桩数量" prop="fast">
                        <el-input v-model="rowData.fast" />
                    </el-form-item>
                    <el-form-item label="慢充桩数量" prop="slow">
                        <el-input v-model="rowData.slow" />
                    </el-form-item>
                    <el-form-item label="充电站状态" prop="status">
                        <el-select v-model="rowData.status" :disabled="disabled">
                            <el-option label="全部" :value="1" />
                            <el-option label="使用中" :value="2" />
                            <el-option label="空闲中" :value="3" />
                            <el-option label="维护中" :value="4" />
                            <el-option label="待维修" :value="5" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="正在充电" prop="now">
                        <el-input v-model="rowData.now" :disabled="disabled" />
                    </el-form-item>
                    <el-form-item label="故障数" prop="fault">
                        <el-input v-model="rowData.fault" :disabled="disabled" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useStationStore } from '@/store/station.js';
import { storeToRefs } from 'pinia';
import { editApi } from '@/api/chargingStation';
import { ElMessage } from 'element-plus';

const stationStore = useStationStore();
const { rowData } = storeToRefs(stationStore);
const emit = defineEmits(['reload']);
defineProps({
    disabled: {
        type: Boolean,
        default: false,
    }
})
// Define the model for dialog visibility
const dialogVisible = defineModel('visible', {
    type: Boolean,
    required: true,
})

const rules = reactive({
    name: [
        { required: true, message: "站点名称不能为空", trigger: "blur" }
    ],
    id: [
        { required: true, message: '站点id不能为空', trigger: 'blur' },
    ],
    city: [
        { required: true, message: '所属城市不能为空', trigger: 'blur' },
    ],
    person: [
        { required: true, message: '站点负责人不能为空', trigger: 'blur' },
    ],
    tel: [
        { required: true, message: '负责人电话不能为空', trigger: 'blur' },
    ],
    fast: [
        { required: true, message: '快充数不能为空', trigger: 'blur' },
    ],
    slow: [
        { required: true, message: '慢充数不能为空', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '充电站状态不能为空', trigger: 'blur' },
    ],
    now: [
        { required: true, message: '正在充电数不能为空', trigger: 'blur' },
    ],
    fault: [
        { required: true, message: '故障数量不能为空', trigger: 'blur' },
    ]
})
const handleClose = () => {
    dialogVisible.value = false;
}
const formRef = ref(null);
const handleConfirm = () => {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            try {
                let res = await editApi(rowData.value);
                ElMessage({
                    message: res.data,
                    type: 'success',
                });
                handleClose();
                emit('reload');
            }
            catch (error) {
                ElMessage({
                    message: error.message,
                    type: 'error',
                });
            }
        }
    })
}
</script>
<style lang="less" scoped></style>