<template>
    <div class="mt" style="max-width: 600px;">
        <el-steps :active="active" finish-status="success" align-center class="mb">
            <el-step v-for="(step, index) in steps" :key="index" :title="step.title" />
        </el-steps>
        <slot name="step-1" v-if="active === 0"></slot>
        <slot name="step-2" v-if="active === 1"></slot>
        <slot name="step-3" v-if="active === 2"></slot>
        <div>
            <el-button v-if="active > 0" @click="active--">上一步</el-button>
            <el-button type="primary" v-if="active < steps.length - 1" @click="next">{{ '下一步' }}</el-button>
            <el-button type="primary" v-if="active === steps.length - 1">{{ '提交' }}</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
    steps: {
        type: Array,
        required: true,
        default: () => [],
    },
    form1:{
        type: Object,
        required: false,
        default: null,
    },
    form2:{
        type: Object,
        required: false,
        default: null,
    },
    form3:{
        type: Object,
        required: false,
        default: null,
    },
})
const active = ref(0);

const next = () => {
    if(active.value === 0){
        props.form1?.validate((valid)=>{
            if(valid){
                active.value++;
            }
        });
    }   
    if(active.value === 1){
        props.form2?.validate((valid)=>{
            if(valid){
                active.value++;
            }
        });
    }
    if(active.value === 2){
        props.form3?.validate((valid)=>{
            if(valid){
                console.log('submit');
            }
        });
    }
}

</script>
<style lang="less" scoped></style>