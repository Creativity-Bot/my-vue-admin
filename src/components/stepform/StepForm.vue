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
defineProps({
    steps: {
        type: Array,
        required: true,
        default: () => [],
    },
    nextHandler: {
        type: Function,
        required: true,
        default: () => {},
    }
})
const active = ref(0);

const next = () => {
    active.value++;
}


</script>
<style lang="less" scoped></style>