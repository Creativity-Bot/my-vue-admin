<template>
    <el-dialog v-model="isVisible" title="权限设置" width="600" @open="handleOpen">
        <el-card>
            <template #header class="card-header">
                <span>页面权限</span>
            </template>
            <el-tree ref="treeRef" style="max-width: 600px" :data="treeData" show-checkbox node-key="url" />
        </el-card>
        <el-card class="mt">
            <template #header class="card-header">
                <span>按钮权限</span>
            </template>
            <el-checkbox-group v-model="btnAuthority">
                <el-checkbox label="all" value="all">全部</el-checkbox>
                <el-checkbox label="add" value="add">新增</el-checkbox>
                <el-checkbox label="edit" value="edit">编辑</el-checkbox>
                <el-checkbox label="delete" value="delete">删除</el-checkbox>
            </el-checkbox-group>
        </el-card>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isVisible = false">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import mapMenuToTree from '@/utils/mapMenuToTree';
import { ref } from 'vue';
import { setAuthApi } from '@/api/system';
const isVisible = defineModel('visible', {
    type: Boolean,
    required: true
});
const props = defineProps({
    selectedList: {
        type: Array,
        required: true
    },
    selectedBtnAuthority: {
        type: Array,
        required: true
    },
    selectedAccount: {
        type: String,
        required: true
    }
});
const emit = defineEmits(['confirm']);
const treeRef = ref();
const authStore = useAuthStore();
const { menu } = storeToRefs(authStore); // menu is the whole menu list
const treeData = ref(mapMenuToTree(menu.value));

const btnAuthority = ref([]);
const handleOpen = () => {
    treeRef.value.setCheckedKeys(props.selectedList);;
    // Note: Both btnAuthority.value and props.selectedBtnAuthority now reference the same array.
    // - Manual mutations (e.g., btnAuthority.value.push('all')) will affect both because they share the same reference.
    // - UI interactions (el-checkbox-group) reassign the entire array (btnAuthority.value = [new array]),
    //   which breaks the reference connection, so props.selectedBtnAuthority remains unchanged.
    btnAuthority.value = props.selectedBtnAuthority;
}

const handleConfirm = async () => {
    try{
        const res = await setAuthApi({
            btnList: btnAuthority.value,
            pageList: treeRef.value.getCheckedKeys(true),
            account: props.selectedAccount,
        });
        isVisible.value = false;
        emit('confirm', res);
    }catch(error){
        console.log(error);
    }
}

</script>