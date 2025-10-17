import { get, post } from '@/utils/http';

const MapType = {
    MAP_LIST: '/mapList',
    ADD_MAP: '/addMap',
}

function getMapList(){
    return post(MapType.MAP_LIST);
}

function addMap(data){
    return post(MapType.ADD_MAP, data);
}

export { getMapList, addMap };