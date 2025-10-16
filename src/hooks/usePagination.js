import { reactive,ref } from "vue";
export function usePagination(loadData,initalPageSize=10){
    const totals=ref(0)
    const pageInfo=reactive({
        currentPage:1,
        pageSize:initalPageSize
    })

    const handleSizeChange=(size)=>{
        pageInfo.pageSize=size;
        loadData()
    }
    const handleCurrentChange=(page)=>{
        pageInfo.currentPage=page;
        loadData()
    }
    const resetPagination=()=>{
        pageInfo.currentPage=1;
        pageInfo.pageSize=initalPageSize
    }
    const setTotals=(all)=>{
        totals.value=all;
    }
    return {totals,pageInfo,handleSizeChange,handleCurrentChange,resetPagination,setTotals};
}