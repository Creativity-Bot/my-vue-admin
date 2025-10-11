import { post } from '@/utils/http';
const ChargingApiType = {
    CHARGING_STATION: '/stationList',
}

function getListApi(data){
    return post(ChargingApiType.CHARGING_STATION, data);
}

export { getListApi };