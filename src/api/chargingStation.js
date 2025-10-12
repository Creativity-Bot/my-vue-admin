import { post } from '@/utils/http';
const ChargingApiType = {
    CHARGING_STATION: '/stationList',
    CHARGING_STATION_EDIT: '/station/edit',
    CHARGING_STATION_DELETE: '/station/delete',
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

export { getListApi, editApi, deleteApi };