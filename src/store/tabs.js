import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTabsStore = defineStore('tabs', () => {
    const tabs = ref([]);
    const addTab = (name, url, icon) => {
        if(!tabs.value.some(t => t.url == url)){
            tabs.value.push({name, url, icon});
        }
    };

    const currentTab = ref(null)
    const setCurrentTab = (name, url) => {
        currentTab.value = {name, url};
    }

    const removeTab = (name) => {
        if(currentTab.value.name === name){
            let index = tabs.value.findIndex(t => t.name === name);
            if(index == 0){
                return
            }
            let newCurrentTab = tabs.value[index - 1];
            currentTab.value = { name: newCurrentTab.name, url: newCurrentTab.url };
        }
        tabs.value = tabs.value.filter(t => t.name !== name);
    }
    
    return {
        tabs,
        addTab,
        currentTab,
        setCurrentTab,
        removeTab
    };
});