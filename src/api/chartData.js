import { get } from '@/utils/http';

const ChartType = {
    CHART_DATA: '/chartData',
    PIE_CHART_DATA: '/pieChartData',
    CHART_RADAR_DATA: '/chartRadarData',
}
function pieChartData(){
    return get(ChartType.PIE_CHART_DATA);
}
function getChartData(){
    return get(ChartType.CHART_DATA);
}
function chartRadarData(){
    return get(ChartType.CHART_RADAR_DATA);
}
export { getChartData, pieChartData, chartRadarData };