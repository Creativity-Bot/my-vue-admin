<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <MapContainer></MapContainer>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="desc">
                <div>1.累计充电站数量：<el-text type="primary">34个</el-text></div>
                <div>2.单省份最多充电桩：<el-text type="primary">北京(4个)</el-text></div>
                <div>3.充电站遍及省份：<el-text type="primary">14个</el-text></div>
                <div>4.暂无充电站省份：<el-text type="primary">22个</el-text></div>
                <div>5.累计充电站：<el-text type="primary">北京(4个)</el-text></div>
                <div>6.单日营收最高：<el-text type="primary">北京西单充电站</el-text></div>
                <div>7.单日营收最低：<el-text type="primary">南宁青秀山充电站</el-text></div>
                <div>8.故障率最高：<el-text type="primary">兰州黄河桥充电站</el-text></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div>
                        <h3>新增电站地图</h3>
                    </div>
                </template>
                <el-form :model="form" label-width="85px" style="max-width: 600px;" :rules="rules" ref="formRef">
                    <el-form-item label="站点名称" prop="name">
                        <el-input placeholder="请输入站点名称" v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="站点地址" prop="region">
                        <el-input placeholder="请输入站点地址" v-model="form.region" />
                    </el-form-item>
                    <el-form-item label="经度" prop="location1">
                        <el-input placeholder="请输入经度" v-model="form.location1" />
                    </el-form-item>
                    <el-form-item label="维度" prop="location2">
                        <el-input placeholder="请输入维度" v-model="form.location2" />
                    </el-form-item>
                    <el-form-item label="立即使用" prop="now">
                        <el-switch v-model="form.now" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remarks">
                        <el-input placeholder="请输入备注" type="textarea" v-model="form.remarks" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleConfirm">创建</el-button>
                        <el-button @click="handleClear">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import MapContainer from '@/components/map/MapContainer.vue';
import { ElMessage } from 'element-plus';
import { reactive, ref, toRaw } from 'vue';
import { addMap } from '@/api/map';
const formRef = ref(null);
const form = reactive({
    name: '',
    region: '',
    location1: '',
    location2: '',
    now: false,
    remarks: '',
})
const rules = reactive({
    name: [{ required: true, message: '请输入站点名称', trigger: 'blur' }],
    region: [{ required: true, message: '请输入站点地址', trigger: 'blur' }],
    location1: [{ required: true, message: '请输入经度', trigger: 'blur' }],
    location2: [{ required: true, message: '请输入维度', trigger: 'blur' }],
    now: [{ required: true, message: '请选择是否立即使用', trigger: 'blur' }],
    remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
})

const handleConfirm = () => {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            try {
                let res = await addMap(JSON.stringify(toRaw(form)));
                console.log(res);
                ElMessage({
                    message: res.data,
                    type: 'success',
                });
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

const handleClear = () => {
    Object.assign(form, {
        name: '',
        region: '',
        location1: '',
        location2: '',
        now: false,
        remarks: '',
    });
}

</script>
<style lang="less" scoped>
.desc {
    line-height: 30px;
}
</style>