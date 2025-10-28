<template>
    <el-tabs
    v-model="currentTab.name"
    type="card"
    class="demo-tabs"
    editable
    @tab-remove="handleRemove"
    @tab-click="handleClick"
  >
    <el-tab-pane v-for="tab in tabs" :key="tab.url" :label="tab.name" :name="tab.name">
        <template #label>
            <span class="custom-tabs-label">
                <el-icon><component :is="tab.icon"/></el-icon>
                <span>&nbsp;{{ tab.name }}</span>
            </span>
        </template>
    </el-tab-pane>
  </el-tabs>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="route.path" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <component :is="Component" :key="route.path" v-if="!$route.meta.keepAlive"/>
  </router-view>

</template>

<script setup>
import { useTabsStore } from '@/store/tabs';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { menu } = storeToRefs(authStore);
const tabsStore = useTabsStore();

const { tabs, currentTab } = storeToRefs(tabsStore);
const { setCurrentTab, removeTab } = tabsStore;

const searchCurrentTab = (url, tabs) => {
    for(let tab of tabs){
        if(tab.url === url){
            return tab;
        }
        if(tab.children){
            const result = searchCurrentTab(url, tab.children);
            if(result){
                return result;
            }
        }
    }
    return null;
}

let foundTab = searchCurrentTab(route.path, menu.value);
if(foundTab){
    tabsStore.setCurrentTab(foundTab.name, foundTab.url);
    tabsStore.addTab(foundTab.name, foundTab.url, foundTab.icon);
}


const handleClick = (tab) => {
    setCurrentTab(tabs.value[tab.index].name, tabs.value[tab.index].url);
    router.push(tabs.value[tab.index].url);
}
const handleRemove = (name) => {
    removeTab(name);
    router.push(currentTab.value.url);
}


</script>

<style lang="less" scoped>
.demo-tabs{
    :deep(.is-active){
        background-color: rgb(34, 134, 255) !important;
        color: #fff !important;
    }
}
</style>