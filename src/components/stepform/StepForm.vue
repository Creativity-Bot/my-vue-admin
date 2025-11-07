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
            <el-button type="primary" @click="next">{{ active < steps.length - 1 ? '下一步' : '提交' }}</el-button>
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

const emit = defineEmits(['submit']);

const next = () => {
    const forms = [props.form1, props.form2, props.form3]; // this needs to put in next function to avoid form non accessable
    forms[active.value]?.validate((valid)=>{
        if(valid){
            if(active.value < props.steps.length - 1){
                active.value++;
            }else{
                emit('submit');
            }
        }
    });
}
</script>
<style lang="less" scoped></style>