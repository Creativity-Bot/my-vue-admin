import {post} from '@/utils/http';
import {ref,onMounted,unref,reactive} from 'vue';
export function useHttp(url, params) {
    const listData = ref([]);
    const isLoading = ref(false);
    const totals = ref(0);
    const pageInfo = reactive({
        page: 1,
        pageSize: 10,
    })
    const loadData = async () => {
        try{
            isLoading.value = true;
            const {data: {list, total}} = await post(url, {...pageInfo, ...unref(params)});
            listData.value = list;
            totals.value = total;
        }catch(error){
            console.log(error);
        }finally{
            isLoading.value = false;
        }
    }

    const handleSizeChange=(size)=>{
        pageInfo.pageSize=size;
        loadData();
    }
    const handleCurrentChange=(page)=>{
        pageInfo.page=page;
        loadData();
    }
    const resetPagination=()=>{
        pageInfo.page=1;
        pageInfo.pageSize=10;
    }
    
    onMounted(()=>{
        loadData()
    });
    return {
        listData,
        isLoading,
        totals,
        pageInfo,
        loadData,
        handleSizeChange,
        handleCurrentChange,
        resetPagination,
    }
}