<template>
    <div>
        <el-card>
            <div>
                <span class="title">文章类型：</span>
                <el-tag :type="selected[0] == -1 ? 'primary' : 'info'" @click="handleTagClick(0, -1)" class="mr">全部</el-tag>
                <el-tag :type="selected[0] == index ? 'primary' : 'info'" v-for="(item, index) in documentList.type" :key="item" class="mr" @click="handleTagClick(0, index)">{{ item }}</el-tag>
            </div>
            <div class="mt">
                <span class="title">重要程度：</span>
                <el-tag :type="selected[1] == -1 ? 'primary' : 'info'" @click="handleTagClick(1, -1)" class="mr">全部</el-tag>
                <el-tag :type="selected[1] == index ? 'primary' : 'info'" v-for="(item, index) in documentList.important" :key="item" class="mr" @click="handleTagClick(1, index)">{{ item }}</el-tag>
            </div>
            <div class="mt">
                <span class="title">发布渠道：</span>
                <el-tag :type="selected[2] == -1 ? 'primary' : 'info'" @click="handleTagClick(2, -1)" class="mr">全部</el-tag>
                <el-tag :type="selected[2] == index ? 'primary' : 'info'" v-for="(item, index) in documentList.publish" :key="item" class="mr" @click="handleTagClick(2, index)">{{ item }}</el-tag>
            </div>
            <el-divider />
            <div class="mt">
                <span class="title">已选：</span>
                <template v-for="(array, index) in selectedList" :key="index">
                    <el-tag type="success" closable v-for="item in array" :key="item" disable-transitions @close="handleClose(index)">{{ item }}</el-tag>
                </template>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { getDocumentList } from '@/api/document';
import { onMounted, ref, reactive } from 'vue';

const documentList = ref({
    type: [],
    important: [],
    publish: []
});

const selected = reactive([-1,-1,-1]);

const handleTagClick = (index, value) => {
    selected[index] = value;
    selectedList.value[index] = [];
    if(value != -1){
        if(index == 0){
            selectedList.value[index].push(documentList.value.type[value])
        }
        else if(index == 1){
            selectedList.value[index].push(documentList.value.important[value])
        }
        else if(index == 2){
            selectedList.value[index].push(documentList.value.publish[value])
        }
    }
}

const selectedList = ref([
    [],[],[] // type, important, publish
]);

onMounted(async () => {
    try {
        const { data } = await getDocumentList();
        documentList.value = data;
    } catch (error) {
        console.log(error);
    }
})

const handleClose = (index) => {
    selected[index] = -1;
    selectedList.value[index] = [];
}


</script>
<style lang="less" scoped>
.title {
    display: inline-block;
    width: 80px;
    font-size: 15px;
}
.el-tag{
    cursor: pointer;
}
</style>