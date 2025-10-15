import { post, get } from '@/utils/http';
const ChargingApiType = {
    CHARGING_STATION: '/stationList',
    CHARGING_STATION_EDIT: '/station/edit',
    CHARGING_STATION_DELETE: '/station/delete',
    REVENUE_CHART: '/revenueChart',
}

function getListApi(data){
    return post(ChargingApiType.CHARGING_STATION, data);
}

function editApi(data){
    return post(ChargingApiType.CHARGING_STATION_EDIT, data);
}

function deleteApi(id){
    return post(ChargingApiType.CHARGING_STATION_DELETE, {id});
}

function revenueChartApi(){
    return get(ChargingApiType.REVENUE_CHART);
}

export { getListApi, editApi, deleteApi, revenueChartApi };