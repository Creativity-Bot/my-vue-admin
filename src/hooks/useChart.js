import * as echarts from 'echarts';
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue';
export function useChart(chartRef, getChartOption) {
    const chartInstance = ref(null);
    const initChart = async () => {
        if(chartRef.value){
            chartInstance.value = markRaw(echarts.init(chartRef.value)); // markRaw to avoid reactive conflict between vue and echarts, 
                                                                        // there is alternative way to do this by not defineing chartInstance as ref, treat it as a const variable
            const option = await getChartOption();
            chartInstance.value.setOption(option);
        }
        
    }
    const resizeChart = () => {
        chartInstance?.value.resize();  
    }
    onMounted(() => {
        initChart();
        window.addEventListener('resize', resizeChart);
    })
    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeChart);
        if(chartInstance.value){
            chartInstance.value.dispose(); // release memory
        }
    })
}   