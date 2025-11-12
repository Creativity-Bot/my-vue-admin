<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card>
                <el-descriptions direction="vertical" border style="margin-top: 20px">
                    <el-descriptions-item :rowspan="2" :width="140" label="照片" align="center">
                        <el-image style="width: 100px; height: 100px"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    </el-descriptions-item>
                    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                    <el-descriptions-item label="电话">18100000000</el-descriptions-item>
                    <el-descriptions-item label="地点">Suzhou</el-descriptions-item>
                    <el-descriptions-item label="备注">
                        <el-tag size="small">School</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="地址">
                        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="mt">
                <el-calendar v-model="value" />
            </el-card>
            <el-card class="mt">
                <el-row>
                    <el-col :span="16">
                        <stepform :steps="steps" :form1="form1" :form2="form2" @submit="handleSubmit">
                            <template #step-1>
                                <el-form :model="form.basicInfo" ref="form1">
                                    <el-form-item label="姓名">
                                        <el-input v-model="form.basicInfo.name" />
                                    </el-form-item>
                                    <el-form-item label="电话">
                                        <el-input v-model="form.basicInfo.tel" />
                                    </el-form-item>
                                    <el-form-item label="邮箱">
                                        <el-input v-model="form.basicInfo.email" />
                                    </el-form-item>
                                </el-form>
                            </template>
                            <template #step-2>
                                <el-form :model="form.positionInfo" ref="form2">
                                    <el-form-item label="在职信息">
                                        <el-input v-model="form.positionInfo.position" />
                                    </el-form-item>
                                </el-form>
                            </template>
                        </stepform>
                    </el-col>
                    <el-col :span="8">
                        <div class="progress-box mt">
                            <span class="mb">完成度</span>
                            <el-progress type="circle" :percentage="75" />
                        </div>
                    </el-col>
                </el-row>

            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card>
                <el-badge :value="12" class="item">
                    <el-button>待办事项</el-button>
                </el-badge>
                <el-badge :value="3" class="item">
                    <el-button>已办事项</el-button>
                </el-badge>
                <el-badge :value="1" class="item" type="primary">
                    <el-button>部门公告</el-button>
                </el-badge>
                <el-badge :value="2" class="item" type="warning">
                    <el-button>系统公告</el-button>
                </el-badge>
                <el-badge :value="1" class="item" color="green">
                    <el-button>其他</el-button>
                </el-badge>
            </el-card>
            <el-card class="mt">
                <el-collapse>
                    <el-collapse-item title="账号注销通知！" name="1">
                        <div  class="mt">
                            <h3>员工离职，账号需要注销，请及时处理！</h3>
                            <el-button type="primary" size="small" class="mr" v-access-check="'admin'">去处理</el-button>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="权限变更通知！" name="2">
                            <div>
                               <h3>王丽丽因部门调动账号权限需调整！</h3>
                               <el-button type="primary" size="small" class="mr" v-access-check="'user'">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="财务放款通知！" name="3">
                            <div>
                               <h3>北京充电站充电桩维修放款！</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="人员调动通知！" name="4">
                            <div>
                               <h3>李继维由行政部转为维修部，需要办理！</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="出差费用报销审批" name="5">
                            <div>
                               <h3>运营部7人出差，报销费用8700元需审批</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="财务放款通知！" name="6">
                            <div>
                               <h3>北京充电站充电桩维修放款！</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="人员调动通知！" name="7">
                            <div>
                               <h3>李继维由行政部转为维修部，需要办理！</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="出差费用报销审批" name="8">
                            <div>
                               <h3>运营部7人出差，报销费用8700元需审批</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="账号注销通知！" name="9">
                            <div>
                               <h3>员工离职，账号需要注销，请及时处理</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="权限变更通知！" name="10">
                            <div>
                               <h3>王丽丽因部门调动账号权限需调整！</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                        <el-collapse-item title="财务放款通知！" name="11">
                            <div>
                               <h3>北京充电站充电桩维修放款！</h3>
                               <el-button type="primary" size="small" class="mr">去处理</el-button>
                            </div>
                            
                        </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref } from 'vue';
import stepform from '@/components/stepform/StepForm.vue';
const value = ref(new Date());
const steps = ref([
    { title: '基本信息' },
    { title: '在职信息' },
]);
const form1 = ref(null);
const form2 = ref(null);
const form = ref({
    basicInfo: {
        name: '',
        tel: '',
        email: '',
    },
    positionInfo: {
        position: '',
    },


});
const handleSubmit = () => {
    console.log(form.value);
}
</script>
<style lang="less" scoped>
.progress-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
}
.el-badge{
    margin-right: 10px;
}
.el-collapse-item{
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>