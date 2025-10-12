import { defineStore } from 'pinia';
import { ref, toRaw } from 'vue';
export const useStationStore = defineStore('station', () => {
    const originalRowData = {
        name: '',
        id: '',
        city: '',
        fast: '',
        slow: '',
        status: 1,
        now: '',
        fault: '',
        person: '',
        tel: '',
    }
    const rowData = ref(originalRowData);

    const setRowData = (data) => {
        // use ... to copy the data
        rowData.value = {...data};
    }

    const resetRowData = () => {
        rowData.value = {...originalRowData};
    }

    return { rowData, setRowData, resetRowData };
})